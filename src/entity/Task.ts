import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, OneToMany} from "typeorm";
import { User } from "./User";
import { TaskHistory } from "./TaskHistory";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', {nullable:true})
    title!: string;

    @Column('text', {nullable:true})
    description!: string;

    @Column('text', {nullable:true})
    status!: string;

    @OneToOne(() => User)
    @JoinColumn({ name: "created_by" })
    @Column('int', {nullable:true})
    created_by!: User;   

    @OneToOne(() => User)
    @JoinColumn({ name: "updated_by" })
    @Column('int', {nullable:true})
    updated_by!: User;   
    

    @Column('datetime', {nullable:true})
    created_at!: Date;

    @Column('datetime', {nullable:true})
    updated_at!: Date;

    @OneToOne(() => User)
    @JoinColumn({ name: "assigned_to" })
    @Column('int', {nullable:true})
    assigned_to!: User;    

    @OneToMany(() => TaskHistory, taskHistory => taskHistory.task)
    task_history!: TaskHistory[]

}
