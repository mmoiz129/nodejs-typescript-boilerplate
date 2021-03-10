import { Service } from "typedi";
import {MigrationInterface, QueryRunner} from "typeorm";
@Service()
export class TaskAddUpdatedByAndUpdatedAt1607954014231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE task 
        ADD COLUMN updated_at DATETIME NULL AFTER assigned_to,
        ADD COLUMN updated_by INT NULL AFTER updated_at;`);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
    }

    
}
