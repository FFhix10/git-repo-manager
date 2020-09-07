import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class SetRepositoryIdInBranchesTableAsNullable1597843378929 implements MigrationInterface {
  private readonly table: string = 'branches';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      this.table,
      'repositoryId',
      new TableColumn({
        name: 'repositoryId',
        type: 'int',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
