import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UsersPermissionsTable1664495459008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "users_permissions",
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
              },
              { name: "permissionId", type: "uuid" },
              { name: "userId", type: "uuid" },
            ],
            foreignKeys: [
              {
                columnNames: ["permissionId"],
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                name: "fk_roles_user",
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
              },
              {
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                name: "fk_users_permissions",
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
              },
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_permissions");
      }

}
