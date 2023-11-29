import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701272843139 implements MigrationInterface {
    name = 'Default1701272843139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "financ"."account" ("id_account" SERIAL NOT NULL, "name" text NOT NULL, "balance" numeric(10,2), "created_at" TIMESTAMP NOT NULL, "created_by_user_id" integer, CONSTRAINT "pk_id_account" PRIMARY KEY ("id_account"))`);
        await queryRunner.query(`ALTER TABLE "financ"."statements" ADD "account_id" integer`);
        await queryRunner.query(`ALTER TABLE "financ"."statements" ADD CONSTRAINT "fk_statement_account" FOREIGN KEY ("account_id") REFERENCES "financ"."account"("id_account") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "financ"."account" ADD CONSTRAINT "fk_user_created_by_account" FOREIGN KEY ("created_by_user_id") REFERENCES "financ"."users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "financ"."account" DROP CONSTRAINT "fk_user_created_by_account"`);
        await queryRunner.query(`ALTER TABLE "financ"."statements" DROP CONSTRAINT "fk_statement_account"`);
        await queryRunner.query(`ALTER TABLE "financ"."statements" DROP COLUMN "account_id"`);
        await queryRunner.query(`DROP TABLE "financ"."account"`);
    }

}
