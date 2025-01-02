import { Context } from "hono";

export const deleteTodo = async (c: Context) => {
  const id = Number(c.req.param("id"));

  if (!id) {
    return c.json({ error: "todo id is required" }, 400);
  }

  try {
    const { success } = await c.env.DB.prepare(
      "DELETE FROM todos where id = (?)"
    )
      .bind(id)
      .run();
    if (!success) {
      return c.json("Error while deleting new todo", 500);
    }
    return c.json("Deleted todo successfully", 201);
  } catch (error) {
    return c.json("Error while deleting new todo", 500);
  }
};
