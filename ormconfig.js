require('dotenv/config');

const dir = process.env.NODE_ENV === 'dev' ? 'src' : 'dist';
const file = process.env.NODE_ENV === 'dev' ? 'ts' : 'js';

module.exports = {
    type: "postgres",
    host: process.env.POSTGRESQL_HOST,
    port: Number(process.env.POSTGRESQL_PORT),
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    entities: [
        `./${dir}/modules/**/infra/typeorm/entities/*.${file}`
    ],
    migrations: [
        `./${dir}/shared/infra/typeorm/migrations/*.${file}`
    ],
    cli: {
        "migrationsDir": `./${dir}/shared/infra/typeorm/migrations/`
    }
}
