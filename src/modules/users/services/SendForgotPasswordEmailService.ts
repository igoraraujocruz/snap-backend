import { injectable, inject } from 'tsyringe';
import path from 'path';
import { AppError } from 'shared/errors/AppError';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepository';
import { IMailProvider } from 'shared/container/providers/MailProvider/models/IMailProvider';
import { IUsersTokensRepository } from 'modules/users/repositories/IUsersTokensRepository';
import { v4 as uuid } from 'uuid';

interface IRequest {
    email: string;
}

@injectable()
export class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
    ) {}

    async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'emails',
            'forgotPassword.hbs',
        );

        if (!user) {
            throw new AppError('User does not exists');
        }

        const token = uuid();

        const date = new Date();

        date.setHours(date.getHours() + 2);

        const expiresDate = date;

        await this.usersTokensRepository.create({
            refreshToken: token,
            userId: user.id,
            expiresDate,
        });

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Snap] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.WEB_URL}/reset-password?token=${token}`,
                },
            },
        });
    }
}
