import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670366302669 implements MigrationInterface {
    name = 'default1670366302669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "financ"."users" DROP COLUMN "created_by_user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "financ"."users" ADD "created_by_user_id" integer`);
    }

}
