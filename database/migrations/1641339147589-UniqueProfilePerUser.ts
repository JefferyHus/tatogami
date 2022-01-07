import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class UniqueProfilePerUser1641339147589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'Profiles',
      new TableUnique({
        columnNames: ['userId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('Profiles', 'userId');
  }
}
