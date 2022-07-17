import { IMailTemplateProvider } from 'shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

export class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail content';
    }
}
