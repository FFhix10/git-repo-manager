import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddEmailColumnToAccountTable1597668936259 implements MigrationInterface {
  private readonly table: string = 'account';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.table,
      new TableColumn({
        name: 'email',
        type: 'varchar',
        length: '255',
        isNullable: false,
        isUnique: true
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.table, 'email');
  }
}
