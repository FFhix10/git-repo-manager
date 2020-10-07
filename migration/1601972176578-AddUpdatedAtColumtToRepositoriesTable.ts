import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUpdatedAtColumtToRepositoriesTable1601972176578 implements MigrationInterface {
  private readonly table: string = 'repositories';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(this.table, new TableColumn({
      name: 'updatedAt',
      type: 'bigint',
      isNullable: false,
      default: Date.now()
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.table, 'updatedAt');
  }
}
