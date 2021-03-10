import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import "express-async-errors";
import {createConnection} from "typeorm";
import { TaskController } from "./controller/task.controller";
import { useContainer as rcUseContainer } from 'routing-controllers';
import { useContainer as typeOrmUseContainer } from 'typeorm';
import { Container } from 'typedi';

rcUseContainer(Container);
typeOrmUseContainer(Container);

createConnection();

const app = createExpressServer({
	cors: true,
	classTransformer: true,
	controllers: [TaskController],
});
  



// process.on("uncaughtException", (ex) => {
// 	winstonLogger.error(ex.message, ex);
// });
export { app };
