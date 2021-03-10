import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {Task} from "./Task";
@Entity({name : "task_history"})
export class TaskHistory {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int', {nullable:true, name: "task_id"})
    task_id!: number;

    @Column('int', {nullable:true, name: "updated_by"})
    updated_by!: number;

    @Column('datetime', {nullable:true, name: "update_at"})
    update_at!: Date;

    @Column('text', {nullable:true, name: "previous_value"})
    previous_value!: string;
    
    @Column('text', {nullable:true, name: "new_value"})
    new_value!: string;   
    
    @Column('text', {nullable:true})
    attribute!: string;

    @ManyToOne(() => Task, task => task.task_history)
    @JoinColumn({ name: "task_id" })
    task!: Task;


}
