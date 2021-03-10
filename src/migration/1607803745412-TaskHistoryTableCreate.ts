import { Service } from "typedi";
import {MigrationInterface, QueryRunner} from "typeorm";
@Service()
export class TaskHistoryTableCreate1607803745412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE task_history (
            id INT NOT NULL AUTO_INCREMENT,
            task_id INT NULL,
            updated_by INT NULL,
            update_at DATETIME NULL,
            previous_value TEXT NULL,
            new_value TEXT NULL,
            attribute VARCHAR(45) NULL,
            PRIMARY KEY (id),
            INDEX task_id_foreign_key_idx (task_id ASC),
            INDEX update_by_foreign_key_idx (updated_by ASC),
            CONSTRAINT update_by_foreign_key
              FOREIGN KEY (updated_by)
              REFERENCES user (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION,
            CONSTRAINT task_id_foreign_key
              FOREIGN KEY (task_id)
              REFERENCES task (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION);`);        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table task_history`);        
    }

}


  