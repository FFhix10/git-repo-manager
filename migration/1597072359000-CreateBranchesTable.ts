import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateBranchesTable1597070395621 implements MigrationInterface {
  private readonly table: string = 'branches';
  private readonly accountTable: string = 'account';
  private readonly companyTable: string = 'company';
  private readonly vcsServicesTable: string = 'vsc-services';

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
            name: 'type',
            type: 'enum',
            isNullable: false,
            default: "'base'",
            enum: ['base', 'compare']
          }),
          new TableColumn({
            name: 'isCustom',
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
            name: 'vscServiceId',
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
