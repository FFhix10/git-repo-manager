import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateRepositoriesTable1597325841640 implements MigrationInterface {
  private readonly table: string = 'repositories';
  private readonly accountTable: string = 'account';

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
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false
          }),
          new TableColumn({
            name: 'isPrivate',
            type: 'boolean',
            isNullable: false,
            default: false
          }),
          new TableColumn({
            name: 'isCompanyRepository',
            type: 'boolean',
            isNullable: false,
            default: true
          }),
          new TableColumn({
            name: 'isChecksSuccess',
            type: 'boolean',
            isNullable: false,
            default: true
          }),
          new TableColumn({
            name: 'accountId',
            type: 'int',
            isNullable: false
          })
        ],
        foreignKeys: [
          new TableForeignKey({
            name: `${this.table}-${this.accountTable}`,
            columnNames: ['accountId'],
            referencedTableName: this.accountTable,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
