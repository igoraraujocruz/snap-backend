import { IParseMailTemplateDTO } from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDTO): Promise<string>;
}
