import { MigrationInterface, QueryRunner } from 'typeorm';

const values = [
  {
    id: 1,
    name: 'github'
  },
  {
    id: 2,
    name: 'gitlab'
  }
];

export class FillVscServicesTable1597325920678 implements MigrationInterface {
  private readonly table: string = 'vcsServices';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder()
      .insert()
      .into(this.table, ['id', 'name'])
      .values(values)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
