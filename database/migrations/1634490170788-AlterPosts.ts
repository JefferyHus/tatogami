import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterPosts1634490170788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Posts', [
      new TableColumn({
        name: 'reading_time',
        type: 'character varying',
        length: '50',
        isNullable: true,
      }),
      new TableColumn({
        name: 'tags',
        type: 'character varying',
        isArray: true,
        isNullable: true,
      }),
    ]);
  }

  public async down(): Promise<void> {
    return undefined;
  }
}
