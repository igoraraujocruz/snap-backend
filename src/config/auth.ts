export default {
    jwt: {
        secret: process.env.APP_SECRET || 'test',
        expiresIn: '30d',
        refreshTokenSecret: process.env.APP_REFRESHTOKENSECRET || 'test',
        expiresInRefreshToken: '30d',
    },
};
