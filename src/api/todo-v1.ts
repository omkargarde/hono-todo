import { Hono } from "hono";
import { createTodo } from "../controllers/create-todo";
import { deleteTodo } from "../controllers/delete-todo";
import { getTodos } from "../controllers/get-all-todos";
import { getTodosById } from "../controllers/get-todos-by-id";
import { toggleTodo } from "../controllers/toggle-todo";
import { updateTodo } from "../controllers/update-todo";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
}

const todoApp = new Hono<{ Bindings: Todo }>().basePath("/todos");

// https:everythingcs.dev/blog/cloudflare-d1-workers-rest-api-crud-operation/

todoApp.get("/", getTodos);

todoApp.get("/:id", getTodosById);

todoApp.post("/:text", createTodo);

todoApp.patch("/:id", toggleTodo);

todoApp.delete("/:id", deleteTodo);

todoApp.put("/:id/:text", updateTodo);
// todoApp.put("/:id", (c) => {
//   const id = Number(c.req.param("id"));
//   const text = c.req.query("text");
//   const completed = c.req.query("completed");

//   const idx = todosArr.findIndex((todo) => todo.id === id);
//   if (idx === -1) return c.json({ error: "Todo not found" }, 404);

//   const todo = todosArr[idx];
//   if (text !== undefined) {
//     todo.text = text;
//   }
//   if (completed !== undefined) {
//     todo.completed = !todo.completed;
//   }

//   return c.json(todosArr[idx]);
// });

export default todoApp;
