import { TaskService } from "../service/task.service";
import { Body, Get, JsonController, Param, Post, Put, Req, Res } from "routing-controllers";
import { TaskRequest } from "../dto/task.request.dto";
import { Service } from "typedi";
@JsonController("/api/task")
@Service()
export class TaskController {

	constructor(private taskService: TaskService) {

	}

	@Get()
	async getAllTasks(@Req() _request: any, @Res() res: any) {
		const tasks = await this.taskService.getAllTasks();
		return res.status(200).json(tasks);
	}

	@Get("/:id")
	async getTaskDetail(@Param('id') id: number, @Res() res: any) {
		const task = await this.taskService.getTaskDetail(id);
		return res.status(200).json(task);
	}

	@Post()
	async addTask(@Body() task: TaskRequest, @Res() res: any) {
		const response = await this.taskService.insert(task);
		return res.status(200).json(response);
	}

	@Put()
	async updateTask(@Body() task: TaskRequest, @Res() res: any) {
		const response = await this.taskService.update(task);
		return res.status(200).json(response);
	}
}