import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateTeamTable1740846976750 implements MigrationInterface {
    name = 'GenerateTeamTable1740846976750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "generated_teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "unique_id" character varying NOT NULL, CONSTRAINT "UQ_7fc3b5e3b0796b0e6ab29122c8e" UNIQUE ("unique_id"), CONSTRAINT "PK_332616934f57bf39d692c271aec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_player_combinations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "generated_team_id" uuid, "team_id" uuid, "player_id" uuid, CONSTRAINT "PK_168dfc63134b4bba8c72a2abe17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team_player_combinations" ADD CONSTRAINT "FK_ff73d364ecd1e110ab219b62174" FOREIGN KEY ("generated_team_id") REFERENCES "generated_teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_player_combinations" ADD CONSTRAINT "FK_d696660cdae54b7c52ee8bf6928" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_player_combinations" ADD CONSTRAINT "FK_ba837fd33be4a4720b398a8c59f" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_player_combinations" DROP CONSTRAINT "FK_ba837fd33be4a4720b398a8c59f"`);
        await queryRunner.query(`ALTER TABLE "team_player_combinations" DROP CONSTRAINT "FK_d696660cdae54b7c52ee8bf6928"`);
        await queryRunner.query(`ALTER TABLE "team_player_combinations" DROP CONSTRAINT "FK_ff73d364ecd1e110ab219b62174"`);
        await queryRunner.query(`DROP TABLE "team_player_combinations"`);
        await queryRunner.query(`DROP TABLE "generated_teams"`);
    }

}
