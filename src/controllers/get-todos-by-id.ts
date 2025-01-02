import { Context } from "hono";

export const getTodosById = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    const { results: todos } = await c.env.DB.prepare(
      "SELECT * FROM todos WHERE id = (?)"
    )
      .bind(id)
      .run();
    return c.json(todos);
  } catch (error) {
    return c.json("Error while fetching todos", 500);
  }
};
