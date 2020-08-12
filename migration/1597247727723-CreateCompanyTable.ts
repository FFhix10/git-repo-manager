import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateCompanyTable1597247727723 implements MigrationInterface {
  private readonly table: string = 'company';

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
            name: 'uuid',
            type: 'char',
            length: '36',
            isNullable: false
          }),
          new TableColumn({
            name: 'companyName',
            type: 'char',
            length: '255',
            isNullable: false
          }),
          new TableColumn({
            name: 'email',
            type: 'char',
            length: '255',
            isNullable: false,
            isUnique: true
          }),
          new TableColumn({
            name: 'isGitHubUsed',
            type: 'boolean',
            isNullable: false,
            default: false
          }),
          new TableColumn({
            name: 'isGitLabUsed',
            type: 'boolean',
            isNullable: false,
            default: false
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
