import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateAvailableDependenciesTable1597247800854 implements MigrationInterface {
  private readonly table: string = 'availableDependencies';
  private readonly companyTable: string = 'company';
  private readonly accountTable: string = 'account';
  private readonly vcsServicesTable: string = 'vcsServices';

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
            name: 'minVersion',
            type: 'char',
            length: '20',
            isNullable: true
          }),
          new TableColumn({
            name: 'isPrivate',
            type: 'boolean',
            default: false,
            isNullable: false
          }),
          new TableColumn({
            name: 'addedBy',
            type: 'int',
            isNullable: true
          }),
          new TableColumn({
            name: 'companyId',
            type: 'int',
            isNullable: false
          }),
          new TableColumn({
            name: 'vcsServiceId',
            type: 'int',
            isNullable: false
          })
        ],
        foreignKeys: [
          new TableForeignKey({
            name: `${this.table}-${this.accountTable}`,
            columnNames: ['addedBy'],
            referencedTableName: this.accountTable,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }),
          new TableForeignKey({
            name: `${this.table}-${this.companyTable}`,
            columnNames: ['companyId'],
            referencedTableName: this.companyTable,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }),
          new TableForeignKey({
            name: `${this.table}-${this.vcsServicesTable}`,
            columnNames: ['vcsServiceId'],
            referencedTableName: this.vcsServicesTable,
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
