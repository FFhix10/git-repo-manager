import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsRequiredOptionToAvailableDependenciesTable1598594726216 implements MigrationInterface {
  private readonly table: string = 'availableDependencies';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(this.table, new TableColumn({
      name: 'isRequired',
      type: 'boolean',
      isNullable: false,
      default: false,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.table, 'isRequired');
  }
}
