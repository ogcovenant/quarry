import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMemoryEntity1782347413111 implements MigrationInterface {
  name = 'CreateMemoryEntity1782347413111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);
    await queryRunner.query(
      `ALTER TABLE "memory" ADD "embeddings" vector(1536) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "memory" ADD "metadata" jsonb NOT NULL DEFAULT '{}'::jsonb`,
    );
    await queryRunner.query(`ALTER TABLE "memory" ADD "source_id" integer`);
    await queryRunner.query(`ALTER TABLE "memory" ADD "note_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "memory" ADD "user_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "memory" ADD CONSTRAINT "FK_49efd31cca7c75f493b9be455cc" FOREIGN KEY ("source_id") REFERENCES "source"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memory" ADD CONSTRAINT "FK_e72b85331c11c544704befd5a08" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memory" ADD CONSTRAINT "FK_4fcc7f1d5fc0fa98e88dd4567e9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "memory" DROP CONSTRAINT "FK_4fcc7f1d5fc0fa98e88dd4567e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "memory" DROP CONSTRAINT "FK_e72b85331c11c544704befd5a08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "memory" DROP CONSTRAINT "FK_49efd31cca7c75f493b9be455cc"`,
    );
    await queryRunner.query(`ALTER TABLE "memory" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "memory" DROP COLUMN "note_id"`);
    await queryRunner.query(`ALTER TABLE "memory" DROP COLUMN "source_id"`);
    await queryRunner.query(`ALTER TABLE "memory" DROP COLUMN "metadata"`);
    await queryRunner.query(`ALTER TABLE "memory" DROP COLUMN "embeddings"`);
  }
}
