import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Table } from 'typeorm';

export class AddAccoutnCompanyTable1599653857888 implements MigrationInterface {
  private readonly table: string = 'accountCompany';
  private readonly accountTable: string = 'account';
  private readonly companyTable: string = 'company';
  private readonly firstFk: string = `${this.accountTable}-${this.table}`;
  private readonly secondFk: string = `${this.companyTable}-${this.table}`;
  private readonly accountCompanyIdFkName: string = 'account-company';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.accountTable, this.accountCompanyIdFkName);
    await queryRunner.dropColumn(this.accountTable, 'companyId');

    await queryRunner.createTable(new Table({
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
          name: 'accountId',
          type: 'int',
          isNullable: false
        }),
        new TableColumn({
          name: 'companyId',
          type: 'int',
          isNullable: false
        })
      ],
      foreignKeys: [
        new TableForeignKey({
          name: this.firstFk,
          columnNames: ['accountId'],
          referencedTableName: this.accountTable,
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }),
        new TableForeignKey({
          name: this.secondFk,
          columnNames: ['companyId'],
          referencedTableName: this.companyTable,
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        })
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.table, this.secondFk);
    await queryRunner.dropForeignKey(this.table, this.firstFk);
    await queryRunner.dropTable(this.table);
  }
}
