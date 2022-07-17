import { injectable, inject } from 'tsyringe';
import path from 'path';
import { AppError } from 'shared/errors/AppError';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepository';
import { IMailProvider } from 'shared/container/providers/MailProvider/models/IMailProvider';
import { IUsersTokensRepository } from 'modules/users/repositories/IUsersTokensRepository';

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

        if (!user) {
            throw new AppError('User does not exists');
        }

        const { refreshToken } =
            await this.usersTokensRepository.createTokenForPasswordRecovery(
                user.id,
            );

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgotPassword.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Snap Points] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.WEB_URL}/reset-password?token=${refreshToken}`,
                },
            },
        });
    }
}
