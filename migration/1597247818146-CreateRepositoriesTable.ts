import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';


export class CreateRepositoriesTable1597247818146 implements MigrationInterface {
  private readonly table: string = 'repositories';
  private readonly branchesTable: string = 'branches';
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
          }),
          new TableColumn({
            name: 'baseBranchId',
            type: 'int',
            isNullable: true
          }),
          new TableColumn({
            name: 'compareBranchId',
            type: 'int',
            isNullable: true
          }),
        ],
        foreignKeys: [
          new TableForeignKey({
            name: `${this.table}-${this.accountTable}`,
            columnNames: ['accountId'],
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
          }),
          new TableForeignKey({
            name: `${this.table}-${this.branchesTable}-base`,
            columnNames: ['baseBranchId'],
            referencedTableName: this.branchesTable,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }),
          new TableForeignKey({
            name: `${this.table}-${this.branchesTable}-compare`,
            columnNames: ['compareBranchId'],
            referencedTableName: this.branchesTable,
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
