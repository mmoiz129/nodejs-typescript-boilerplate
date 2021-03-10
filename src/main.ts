import { app } from "./app";
import http from "http";
import { Request, Response } from "express";
import winstonLogger from "./startup/logger";
const server = http.createServer(app);


app.get("/", (_req: Request, res: Response) => {
    res.json({ "greet": "hello" });
});
const PORT =  5000;
server.listen(PORT);
server.on("listening", () => {
	winstonLogger.info(`${process.env.NODE_ENV || "dev"} server up listening on PORT ${PORT}`);

});


