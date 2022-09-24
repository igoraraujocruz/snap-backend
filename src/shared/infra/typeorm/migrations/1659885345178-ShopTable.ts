import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class ShopTable1659885345178 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'shop',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'typeOfPayment',
                        type: 'varchar',
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                    },
                    {
                        name: 'clientId',
                        type: 'uuid',
                    },
                    {
                        name: 'productId',
                        type: 'uuid',
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
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
        await queryRunner.createForeignKey(
            'shop',
            new TableForeignKey({
                name: 'shopClientForeignKey',
                columnNames: ['clientId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'clients',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
        await queryRunner.createForeignKey(
            'shop',
            new TableForeignKey({
                name: 'shopProductForeignKey',
                columnNames: ['productId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
        await queryRunner.createForeignKey(
            'shop',
            new TableForeignKey({
                name: 'shopUserForeignKey',
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('shop', 'shopUserForeignKey');
        await queryRunner.dropForeignKey('shop', 'shopProductForeignKey');
        await queryRunner.dropForeignKey('shop', 'shopClientForeignKey');
        await queryRunner.dropTable('shop');
    }
}
