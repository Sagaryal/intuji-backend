import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleToGenTable1740891971764 implements MigrationInterface {
    name = 'AddTitleToGenTable1740891971764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "generated_teams" ADD "title" character varying NOT NULL DEFAULT 'Untitled Team'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "generated_teams" DROP COLUMN "title"`);
    }

}
