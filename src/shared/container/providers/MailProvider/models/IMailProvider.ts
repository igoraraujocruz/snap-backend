import { ISendMailDTO } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

export interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}
