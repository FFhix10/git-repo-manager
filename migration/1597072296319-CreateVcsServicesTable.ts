import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateVcsServicesTable1597065659472 implements MigrationInterface {
  private readonly table: string = 'vsc-services';

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
            isNullable: false,
            isUnique: true
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
