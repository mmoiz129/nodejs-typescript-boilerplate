import { Task } from "../entity/Task";
import { TaskHistory } from "../entity/TaskHistory";
import { getConnection } from "typeorm";
import { Service } from "typedi";

@Service()
export class TaskHistoryService {

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
		const taskHistoryRepo = getConnection().getRepository(TaskHistory);
		return await taskHistoryRepo.save(updates)
	}

}





