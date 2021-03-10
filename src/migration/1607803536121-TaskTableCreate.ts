import {MigrationInterface, QueryRunner} from "typeorm";

export class TaskTableCreate1607803536121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE task (
            id INT NOT NULL AUTO_INCREMENT,
            title VARCHAR(100) NULL,
            description TEXT NULL,
            status VARCHAR(45) NULL,
            created_by INT NULL,
            created_at DATETIME NULL,
            assigned_to INT NULL,
            PRIMARY KEY (id),
            INDEX assigned_to_foreign_key_idx (assigned_to ASC),
            INDEX created_by_foreign_key_idx (created_by ASC),
            CONSTRAINT assigned_to_foreign_key
              FOREIGN KEY (assigned_to)
              REFERENCES user (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION,
            CONSTRAINT created_by_foreign_key
              FOREIGN KEY (created_by)
              REFERENCES user (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          `);        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table Task`);
    }

}
