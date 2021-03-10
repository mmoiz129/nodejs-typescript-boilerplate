import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTableCreate1607802285344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE user (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(45) NULL,
            email VARCHAR(45) NULL,
            type VARCHAR(45) NULL,
            PRIMARY KEY (id))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table user`);
    }

}
