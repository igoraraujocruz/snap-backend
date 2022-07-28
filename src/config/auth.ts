export default {
    jwt: {
        secret: process.env.APP_SECRET || 'test',
        expiresIn: '5s',
        refreshTokenSecret: process.env.APP_REFRESHTOKENSECRET || 'test',
        expiresInRefreshToken: '10s',
    },
};
