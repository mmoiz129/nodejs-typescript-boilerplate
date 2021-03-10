import { Task } from "../entity/Task";
import { TaskHistory } from "../entity/TaskHistory";
import { Service } from "typedi";
import { TaskHistoryRepository } from "../repositories/task.history.repository";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class TaskHistoryService {

	constructor(@InjectRepository() private taskHistoryRepo: TaskHistoryRepository) {}

	checkDifferenceAndInsert(oldTask: Task, newTask: any): TaskHistory[] {

		const updates: TaskHistory[] = [];
		const currentDate = new Date();
	
		for (let [key, value] of Object.entries(oldTask)) {
			
			if (newTask[key] && value != newTask[key]) {
				const taskHistory = new TaskHistory();
				taskHistory.task_id = newTask.id;
				taskHistory.updated_by = newTask.updated_by;
				taskHistory.previous_value = String(oldTask[key as keyof Task]);
				taskHistory.new_value = newTask[key];
				taskHistory.attribute = key;
				taskHistory.update_at = currentDate;
				updates.push(taskHistory);
			}
		}
	
		//save task history
		return updates;
	}
	
	async saveTaskHistory(updates: TaskHistory[]) {
		return await this.taskHistoryRepo.save(updates)
	}

}





