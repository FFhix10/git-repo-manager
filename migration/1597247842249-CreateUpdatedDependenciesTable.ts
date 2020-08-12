import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateUpdatedDependenciesTable1597247842249 implements MigrationInterface {
  private readonly table: string = 'updatedDependencies';
  private readonly branchesTable: string = 'branches';
  private readonly repositoriesTable: string = 'repositories';

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
            type: 'char',
            length: '255',
            isNullable: false
          }),
          new TableColumn({
            name: 'value',
            type: 'char',
            length: '255',
            isNullable: true
          }),
          new TableColumn({
            name: 'repositoryId',
            type: 'int',
            isNullable: false
          }),
          new TableColumn({
            name: 'branchId',
            type: 'int',
            isNullable: false
          }),
        ],
        foreignKeys: [
          new TableForeignKey({
            name: `${this.table}-${this.repositoriesTable}`,
            columnNames: ['repositoryId'],
            referencedTableName: this.repositoriesTable,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }),
          new TableForeignKey({
            name: `${this.table}-${this.branchesTable}`,
            columnNames: ['branchId'],
            referencedTableName: this.branchesTable,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }),
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
