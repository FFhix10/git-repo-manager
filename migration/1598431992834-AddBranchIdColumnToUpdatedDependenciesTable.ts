import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddBranchIdColumnToUpdatedDependenciesTable1598431992834 implements MigrationInterface {
  private readonly table: string = 'updatedDependencies';
  private readonly branchesTable: string = 'branches';
  private readonly fkName: string = `${this.table}-${this.branchesTable}`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(this.table, [
      new TableColumn({
          name: 'branchId',
          type: 'int',
          isNullable: false
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'bigint',
        isNullable: false
      })
    ]);

    await queryRunner.createForeignKey(this.table, new TableForeignKey({
      name: this.fkName,
      columnNames: ['branchId'],
      referencedTableName: this.branchesTable,
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.table, this.fkName);
    await queryRunner.dropColumn(this.table, 'branchId');
  }
}
