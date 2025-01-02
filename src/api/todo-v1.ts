import { Hono } from "hono";
import { createTodo } from "../controllers/create-todo";

const todoApp = new Hono().basePath("/todos");

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// https:everythingcs.dev/blog/cloudflare-d1-workers-rest-api-crud-operation/

const todosArr: Todo[] = [
  {
    id: 1,
    text: "something to do",
    completed: false,
  },
  {
    id: 2,
    text: "something to do",
    completed: false,
  },
  {
    id: 3,
    text: "something to do",
    completed: true,
  },
];

todoApp.get("/", (c) => {
  return c.json(todosArr);
});

todoApp.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  return c.json(todosArr.filter((todo) => todo.id === id));
});

todoApp.post("/:text", createTodo);

todoApp.put("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const text = c.req.query("text");
  const completed = c.req.query("completed");

  const idx = todosArr.findIndex((todo) => todo.id === id);
  if (idx === -1) return c.json({ error: "Todo not found" }, 404);

  const todo = todosArr[idx];
  if (text !== undefined) {
    todo.text = text;
  }
  if (completed !== undefined) {
    todo.completed = !todo.completed;
  }

  return c.json(todosArr[idx]);
});

todoApp.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const idx = todosArr.findIndex((todo) => todo.id === id);

  if (idx === -1) return c.json({ error: "Todo not found" }, 404);
  todosArr.splice(idx, 1);
  return c.json(null);
});

export default todoApp;
