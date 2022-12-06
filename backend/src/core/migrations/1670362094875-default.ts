import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1670362094875 implements MigrationInterface {
  name = 'default1670362094875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "financ"."users" ("id_user" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP NOT NULL, "created_by_user_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "pk_id_user" PRIMARY KEY ("id_user"))`
    );
    await queryRunner.query(
      `CREATE TABLE "financ"."categories" ("id_category" SERIAL NOT NULL, "alias" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL, "created_by_user_id" integer, CONSTRAINT "pk_id_category" PRIMARY KEY ("id_category"))`
    );
    await queryRunner.query(
      `CREATE TABLE "financ"."expenses" ("id_expense" SERIAL NOT NULL, "fullname" text NOT NULL, "description" text NOT NULL, "weekly" boolean NOT NULL, "monthly" boolean NOT NULL, "yearly" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL, "category_id" integer, "created_by_user_id" integer, CONSTRAINT "pk_id_expense" PRIMARY KEY ("id_expense"))`
    );
    await queryRunner.query(
      `CREATE TABLE "financ"."statements" ("id_statement" SERIAL NOT NULL, "target_value" integer NOT NULL, "target_date" TIMESTAMP NOT NULL, "end_value" integer NOT NULL, "end_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL, "expense_id" integer, "created_by_user_id" integer, CONSTRAINT "pk_id_statement" PRIMARY KEY ("id_statement"))`
    );
    await queryRunner.query(
      `ALTER TABLE "financ"."users" ADD CONSTRAINT "fk_user_created_by" FOREIGN KEY ("created_by_user_id") REFERENCES "financ"."users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "financ"."categories" ADD CONSTRAINT "fk_user_created_by" FOREIGN KEY ("created_by_user_id") REFERENCES "financ"."users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "financ"."expenses" ADD CONSTRAINT "fk_expense_category" FOREIGN KEY ("category_id") REFERENCES "financ"."categories"("id_category") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "financ"."expenses" ADD CONSTRAINT "fk_expense_created_by" FOREIGN KEY ("created_by_user_id") REFERENCES "financ"."users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "financ"."statements" ADD CONSTRAINT "fk_statement_expense" FOREIGN KEY ("expense_id") REFERENCES "financ"."expenses"("id_expense") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "financ"."statements" ADD CONSTRAINT "fk_statement_created_by" FOREIGN KEY ("created_by_user_id") REFERENCES "financ"."users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "financ"."statements" DROP CONSTRAINT "fk_statement_created_by"`);
    await queryRunner.query(`ALTER TABLE "financ"."statements" DROP CONSTRAINT "fk_statement_expense"`);
    await queryRunner.query(`ALTER TABLE "financ"."expenses" DROP CONSTRAINT "fk_expense_created_by"`);
    await queryRunner.query(`ALTER TABLE "financ"."expenses" DROP CONSTRAINT "fk_expense_category"`);
    await queryRunner.query(`ALTER TABLE "financ"."categories" DROP CONSTRAINT "fk_user_created_by"`);
    await queryRunner.query(`ALTER TABLE "financ"."users" DROP CONSTRAINT "fk_user_created_by"`);
    await queryRunner.query(`DROP TABLE "financ"."statements"`);
    await queryRunner.query(`DROP TABLE "financ"."expenses"`);
    await queryRunner.query(`DROP TABLE "financ"."categories"`);
    await queryRunner.query(`DROP TABLE "financ"."users"`);
  }
}
