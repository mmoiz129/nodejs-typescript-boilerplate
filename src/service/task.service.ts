import { getConnection } from "typeorm";
import {Task} from "../entity/Task";
import {ResponseDto} from "../dto/response.dto";
import {State} from "../enum/state";
import {StateService} from "./state.service";
import { TaskHistoryService } from "./taskhistory.service";
import {UserService} from "./user.service";
import { TaskRequest } from "../dto/task.request.dto";
import { Service } from "typedi";

@Service()
export class TaskService {

	constructor(
		private stateService: StateService, 
		private taskHistoryService: TaskHistoryService,
		private userService: UserService) {}

	async getAllTasks() {
		const response = new ResponseDto();
		const userRepo = getConnection().getRepository(Task);
		return response.makeSuccessResponse(await userRepo.find());
	}
		
	async insert(task: TaskRequest)  {
		const response = new ResponseDto();
		const taskRepo = getConnection().getRepository(Task);
		const user = await this.userService.getUserById(task.created_by);
		//validation for user
		if (!user) {
			return response.makeFailureResponse("No user found for this Id");
		}

		if (task.status != State.TODO) {
			return response.makeFailureResponse("Task should be created with todo status");
		}

		const taskObj = new Task();
		taskObj.title = task.title;
		taskObj.created_by = user;
		taskObj.description = task.description;
		taskObj.status = task.status;
		taskObj.created_at = new Date();
		response.makeSuccessResponse(await taskRepo.save(taskObj));
		
		return response;
	};

	async update(updatedTask: TaskRequest) {
		const response = new ResponseDto();
		const taskRepo = getConnection().getRepository(Task);
		const taskObj = await taskRepo.findOne({select: ["id", "title", "description", "status", "assigned_to"], where: {"id": updatedTask.id}});
		const userAssignedTo = await this.userService.getUserById(updatedTask.assigned_to);
		const updated_by = await this.userService.getUserById(updatedTask.updated_by);
	
		//validation
		if (!taskObj) {
			return response.makeFailureResponse("No task for this id");
		}
	
		if (!userAssignedTo || !updated_by) {
			return response.makeFailureResponse("No user found for the id");
		}
	
		const oldState: State = State[taskObj.status as keyof typeof State];
		const newState: State = State[updatedTask.status as keyof typeof State];
	
		if (updatedTask.status) {
			const isValid = this.stateService.isValidState(oldState, newState);
			if (!isValid) {
				return response.makeFailureResponse("Can not move task to " + newState + " state");
			}
		}
	
		//insert task history
		const updates = this.taskHistoryService.checkDifferenceAndInsert(taskObj, updatedTask);
		
		await this.taskHistoryService.saveTaskHistory(updates);
	
		const data: any = {
			id: updatedTask.id,
			title: (updatedTask.title ? updatedTask.title : taskObj.title),
			description: (updatedTask.description ? updatedTask.description : taskObj.description),
			status: (updatedTask.status ? updatedTask.status : taskObj.status),
			assigned_to: (updatedTask.assigned_to ? updatedTask.assigned_to : taskObj.assigned_to),
			updated_at: new Date(),
			updated_by: updatedTask.updated_by
		};
	
		await taskRepo.update(updatedTask.id, data);
	
		return response.makeSuccessResponse(updatedTask);
	};

	async getTaskDetail(id: number) {
		const response = new ResponseDto();
		const taskRepo = getConnection().getRepository(Task);
		const task = await taskRepo.findOne(id, {relations: ["task_history"] });
		return response.makeSuccessResponse(task);
	}

}