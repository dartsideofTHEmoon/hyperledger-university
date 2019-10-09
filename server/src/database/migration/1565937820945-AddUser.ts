import { MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm"

export class AddUser1565937820823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const schema = new Table({
            name: "users",
            columns: [
                new TableColumn({
                    name: "id",
                    type: "text",
                    isPrimary: true
                }),
                new TableColumn({
                    name: "email",
                    type: "text",
                    isNullable:false,
                    isUnique: true
                }),
                new TableColumn({
                    name: "password",
                    type: "text",
                    isNullable:true
                })
            ]
        })
        await queryRunner.createTable(schema)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("users");
    }

}
