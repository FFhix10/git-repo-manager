import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLogoUrlToCompany1599737545302 implements MigrationInterface {
  private readonly table: string = 'company';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(this.table, new TableColumn({
      name: 'logoUrl',
      type: 'varchar',
      length: '255',
      isNullable: true
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.table, 'logoUrl');
  }
}
