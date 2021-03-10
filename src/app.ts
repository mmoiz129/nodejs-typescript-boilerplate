import 'reflect-metadata';
import { createExpressServer, useContainer  } from 'routing-controllers';
import "express-async-errors";
import {createConnection} from "typeorm";
import { TaskController } from "./controller/task.controller";
import { Container } from 'typedi';
import { Container as TypeOrmContainer } from 'typeorm-typedi-extensions';

useContainer(Container);
useContainer(TypeOrmContainer);

const app = createExpressServer({
	cors: true,
	classTransformer: true,
	controllers: [TaskController],
});
  

createConnection();

// process.on("uncaughtException", (ex) => {
// 	winstonLogger.error(ex.message, ex);
// });
export { app };
