import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateUpdatedDependenciesTable1597326183540 implements MigrationInterface {
  private readonly table: string = 'updatedDependencies';
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
            type: 'varchar',
            length: '255',
            isNullable: false
          }),
          new TableColumn({
            name: 'value',
            type: 'text',
            isNullable: true
          }),
          new TableColumn({
            name: 'repositoryId',
            type: 'int',
            isNullable: false
          })
        ],
        foreignKeys: [
          new TableForeignKey({
            name: `${this.table}-${this.repositoriesTable}`,
            columnNames: ['repositoryId'],
            referencedTableName: this.repositoriesTable,
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
