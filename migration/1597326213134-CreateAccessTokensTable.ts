import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateAccessTokensTable1597326213134 implements MigrationInterface {
  private readonly table: string = 'accessTokens';
  private readonly accountTable: string = 'account';
  private readonly companyTable: string = 'company';
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
            name: 'token',
            type: 'varchar',
            length: '255',
            isNullable: false
          }),
          new TableColumn({
            name: 'isCompanyAccessToken',
            type: 'boolean',
            isNullable: false,
            default: true
          }),
          new TableColumn({
            name: 'accountId',
            type: 'int',
            isNullable: true
          }),
          new TableColumn({
            name: 'companyId',
            type: 'int',
            isNullable: true
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
            columnNames: ['accountId'],
            referencedTableName: this.accountTable,
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }),
          new TableForeignKey({
            name: `${this.table}-${this.companyTable}`,
            columnNames: ['companyId'],
            referencedTableName: this.companyTable,
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }),
          new TableForeignKey({
            name: `${this.table}-${this.vcsServicesTable}`,
            columnNames: ['vcsServiceId'],
            referencedTableName: this.vcsServicesTable,
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
