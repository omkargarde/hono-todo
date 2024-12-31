import { Hono } from "hono";
import { logger } from "hono/logger";
import todoApp from "./api/todo-v1";

const app = new Hono();

app.use(logger());

app.route("/api/v1", todoApp);

export default app;
