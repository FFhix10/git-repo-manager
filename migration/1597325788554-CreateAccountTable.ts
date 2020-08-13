import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateAccountTable1597325788554 implements MigrationInterface {
  private readonly table: string = 'account';
  private readonly companyTable: string = 'company';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          }),
          new TableColumn({
            name: 'uuid',
            type: 'varchar',
            length: '36',
            isGenerated: true,
            generationStrategy: 'uuid'
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false
          }),
          new TableColumn({
            name: 'username',
            type: 'varchar',
            length: '255',
            isNullable: false
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true
          }),
          new TableColumn({
            name: 'role',
            type: 'enum',
            isNullable: false,
            default: "'member'",
            enum: [ 'member', 'owner' ]
          }),
          new TableColumn({
            name: 'companyId',
            type: 'int',
            isNullable: false
          })
        ],
        foreignKeys: [
          new TableForeignKey({
            name: `${this.table}-${this.companyTable}`,
            columnNames: ['companyId'],
            referencedTableName: this.companyTable,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          })
        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
