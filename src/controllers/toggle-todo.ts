import { Context } from "hono";

export const toggleTodo = async (c: Context) => {
  const id = Number(c.req.param("id"));
  try {
    const { success } = await c.env.DB.prepare(
      `UPDATE todos SET completed = NOT completed WHERE id = ?`
    )
      .bind(id)
      .run();
    if (!success) {
      return c.json({ error: "Update failed" }, 500);
    }
    return c.json("Updated todo successfully", 201);
  } catch (error) {
    console.error(error); // Add this for debugging
    return c.json({ error: "Update failed" }, 500);
  }
};
