import { Service } from "typedi";
import {MigrationInterface, QueryRunner} from "typeorm";
@Service()
export class UserSeedData1607806074628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO user (id, name, email, type) VALUES ('1', 'developer 1', 'developer1@gmail.com', 'dev')`);
        await queryRunner.query(`INSERT INTO user (id, name, email, type) VALUES ('2', 'developer 2', 'developer2@gmail.com', 'dev')`);
        await queryRunner.query(`INSERT INTO user (id, name, email, type) VALUES ('3', 'developer 3', 'developer3@gmail.com', 'dev')`);
        await queryRunner.query(`INSERT INTO user (id, name, email, type) VALUES ('4', 'qa 1', 'qa1@gmail.com', 'qa');`);
        await queryRunner.query(`INSERT INTO user (id, name, email, type) VALUES ('5', 'qa 2', 'qa2@gmail.com', 'qa');`);
        await queryRunner.query(`INSERT INTO user (id, name, email, type) VALUES ('6', 'qa 3', 'qa3@gmail.com', 'qa');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE user`);        
    }

}
