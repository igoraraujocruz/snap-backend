interface IMailConfig {
    driver: 'ethereal' | 'ses';

    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: process.env.EMAIL_CONFIG_AWS,
            name: process.env.NAME_TITLE_EMAIL,
        },
    },
} as IMailConfig;
