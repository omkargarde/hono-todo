import { Hono } from "hono";
import { logger } from "hono/logger";

const todoApp = new Hono();

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

todoApp
  .get("/todos", (c) => {
    return c.json(todos);
  })
  .get("/todos/:id", (c) => {
    const id = Number(c.req.param("id"));
    return c.json(todos.filter((todo) => todo.id === id));
  });

//  TODO: create todo

//  TODO: delete todo
//  TODO: update todo

todoApp.get("/", (c) => {
  return c.text("test");
});

export default todoApp;
