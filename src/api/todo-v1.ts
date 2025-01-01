import { Hono } from "hono";
import { logger } from "hono/logger";

const todoApp = new Hono().basePath("/todos");

todoApp.use(logger());

const todos = [
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
  return c.json(todos);
});

todoApp.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  return c.json(todos.filter((todo) => todo.id === id));
});

todoApp.post("/:text", (c) => {
  const { text } = c.req.param();

  const id = Math.max(...todos.map((todo) => todo.id), 0) + 1;
  const newTodo = {
    id: id,
    text: text,
    completed: false,
  };
  todos.push(newTodo);

  return c.json(newTodo, 201);
});

todoApp.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const idx = todos.findIndex((todo) => todo.id === id);

  if (idx === -1) return c.json({ error: "Todo not found" }, 404);
  todos.splice(idx, 1);
  return c.json(null);
});

todoApp.put("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const text = c.req.query("text");
  const completed = c.req.query("completed");

  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx === -1) return c.json({ error: "Todo not found" }, 404);

  const todo = todos[idx];
  if (text !== undefined) {
    todo.text = text;
  }
  if (completed !== undefined) {
    todo.completed = !todo.completed;
  }

  return c.json(todos[idx]);
});

//  TODO: update todo
export default todoApp;
