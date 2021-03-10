import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', {nullable:true})
    name!: string;

    @Column('text', {nullable:true})
    email!: string;

    @Column('text', {nullable:true})
    type!: string;


}
