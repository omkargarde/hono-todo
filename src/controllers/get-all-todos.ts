import { Context } from "hono";

export const getTodos = async (c: Context) => {
  try {
    const { results: todos } = await c.env.DB.prepare(
      "SELECT * FROM todos ORDER BY created_at desc"
    ).all();
    return c.json(todos);
  } catch (error) {
    return c.json("Error while fetching todos", 500);
  }
};
