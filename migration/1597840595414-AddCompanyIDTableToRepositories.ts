import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddCompanyIDTableToRepositories1597840595414 implements MigrationInterface {
  private readonly table: string = 'repositories';
  private readonly companyTable: string = 'company';
  private readonly fkName: string = `${this.table}-${this.companyTable}`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(this.table, new TableColumn({
      name: 'companyId',
      type: 'int',
      isNullable: false
    }));

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        name: this.fkName,
        columnNames: ['companyId'],
        referencedTableName: this.companyTable,
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.table, this.fkName);
    await queryRunner.dropColumn(this.table, 'companyId');
  }
}
