import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ClientsTable1647268717022 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clients',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'points',
                        type: 'int',
                        generationStrategy: 'increment',
                        default: 0
                    },
                    {
                        name: 'birthday',
                        type: 'timestamp',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'mobilePhone',
                        type: 'varchar',
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients');
    }
}
