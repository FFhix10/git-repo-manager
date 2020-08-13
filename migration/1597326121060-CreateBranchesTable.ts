import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateBranchesTable1597326121060 implements MigrationInterface {
  private readonly table: string = 'branches';
  private readonly accountTable: string = 'account';
  private readonly companyTable: string = 'company';
  private readonly repositoriesTable: string = 'repositories';
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
            type: 'varchar',
            length: '255',
            isNullable: false
          }),
          new TableColumn({
            name: 'type',
            type: 'enum',
            isNullable: false,
            default: "'base'",
            enum: ['base', 'compare']
          }),
          new TableColumn({
            name: 'isPrivate',
            type: 'boolean',
            isNullable: false,
            default: false
          }),
          new TableColumn({
            name: 'aliases',
            type: 'text',
            isNullable: true
          }),
          new TableColumn({
            name: 'addedById',
            type: 'int',
            isNullable: true
          }),
          new TableColumn({
            name: 'companyId',
            type: 'int',
            isNullable: false
          }),
          new TableColumn({
            name: 'repositoryId',
            type: 'int',
            isNullable: false
          }),
          new TableColumn({
            name: 'vscServiceId',
            type: 'int',
            isNullable: false
          })
        ],
        foreignKeys: [
          new TableForeignKey({
            name: `${this.table}-${this.accountTable}`,
            columnNames: ['addedById'],
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
            name: `${this.table}-${this.repositoriesTable}`,
            columnNames: ['repositoryId'],
            referencedTableName: this.repositoriesTable,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }),
          new TableForeignKey({
            name: `${this.table}-${this.vcsServicesTable}`,
            columnNames: ['vscServiceId'],
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
