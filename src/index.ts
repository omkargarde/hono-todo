import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import todoApp from "./api/todo-v1";

const app = new Hono();

app.use(logger());

// Global error middleware
app.use("*", async (c, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      // Handle Hono's built-in HTTP exceptions
      return c.json(
        {
          message: error.message,
          status: error.status,
        },
        error.status
      );
    }

    // Handle unexpected errors
    console.error(error);
    return c.json(
      {
        message: "Internal Server Error",
        status: 500,
      },
      500
    );
  }
});

app.route("/api/v1", todoApp);

export default app;
