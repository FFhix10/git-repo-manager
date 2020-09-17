import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

const values = [
  {
    name: 'paginationItemsPerPage',
    value: '15'
  },
  {
    name: 'paginationMaxPageNumbersCapacity',
    value: '5'
  }
];

export class addSettingsTable1600334609167 implements MigrationInterface {
  private readonly table: string = 'settings';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
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
          type: 'varchar',
          length: '255',
          isNullable: false
        })
      ]
    }));

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(this.table, ['name', 'value'])
      .values(values)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
