import { Context } from "hono";

export const createTodo = async (c: Context) => {
  const { text } = c.req.param();

  if (!text) {
    return c.json({ error: "todo text is required" }, 400);
  }

  try {
    const { success } = await c.env.DB.prepare(
      "INSERT INTO todos (text) values (?)"
    )
      .bind(text)
      .run();
    if (!success) {
      return c.json("Error while adding new todo", 500);
    }
    return c.json("Added todo successfully", 201);
  } catch (error) {
    return c.json("Error while adding new todo", 500);
  }
};
