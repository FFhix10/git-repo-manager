import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddNewColumnsToCompanyTable1597411934197 implements MigrationInterface {
  private readonly table: string = 'company';
  private readonly vcsServicesTable: string = 'vcsServices';
  private readonly fkName: string = `${this.table}-${this.vcsServicesTable}`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(this.table, [
      new TableColumn({
        name: 'vcsId',
        type: 'bigint',
        isUnique: true,
        isNullable: false
      }),
      new TableColumn({
        name: 'vcsServiceId',
        type: 'int',
        isNullable: false
      })
    ]);

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        name: this.fkName,
        columnNames: ['vcsServiceId'],
        referencedTableName: this.vcsServicesTable,
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.table, this.fkName);
    await queryRunner.dropColumn(this.table, 'vcsId');
    await queryRunner.dropColumn(this.table, 'vcsServiceId');
  }
}
