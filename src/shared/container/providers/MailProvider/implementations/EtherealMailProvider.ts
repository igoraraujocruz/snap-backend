import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import { ISendMailDTO } from 'shared/container/providers/MailProvider/dtos/ISendMailDTO';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

import { IMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from.name,
                address: from.email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

        /* eslint-disable no-console */
        console.log(`Message sent: ${message.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
    }
}
