export default {
    jwt: {
        secret: process.env.APP_SECRET || 'test',
        expiresIn: '15m',
        refreshTokenSecret: process.env.APP_REFRESHTOKENSECRET || 'test',
        expiresInRefreshToken: '1d',
    },
};
