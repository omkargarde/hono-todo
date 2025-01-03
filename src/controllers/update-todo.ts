import { Context } from "hono";

export const updateTodo = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const text = c.req.param("text");
  try {
    if (text === undefined || text === "") {
      return c.json({ error: "Text cannot be empty" }, 500);
    }

    const { success } = await c.env.DB.prepare(
      "UPDATE todos SET text = ? WHERE id = ?"
    )
      .bind(text, id)
      .run();

    if (!success) {
      return c.json("Update failed", 500);
    }
    return c.json("Updated todo text successfully", 201);
  } catch (error) {
    return c.json("Update failed", 500);
  }
};
