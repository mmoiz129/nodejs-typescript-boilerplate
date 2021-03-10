import { EntityRepository, Repository } from 'typeorm';

import { Task } from '../entity/Task';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}