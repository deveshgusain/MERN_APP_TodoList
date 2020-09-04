import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";
import path from "path";
import { addNewTask, updateTask } from "./taskFunctions";
import { addComment } from "./commentFunctions";

let port = process.env.PORT || 7777;
let app = express();

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.listen(port, console.log("Server is listning at port ", port));

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

app.post("/task/new", async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});

app.post("/task/update", async (req, res) => {
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});

app.post("/comment/new", async (req, res) => {
  let comment = req.body.comment;
  await addComment(comment);
  res.status(200).send();
});
