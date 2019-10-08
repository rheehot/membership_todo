// app.js
import { Model, ListView, TodoController } from './todo.js';

const initialDataUrl = 'http://localhost:8080/data/initData.json';
const todoModel = new TodoModel(initialDataUrl);
const listView = new ListView();

const todoController = new TodoController(
  todoModel,
  todoModelListFold,
  inputView,
  listView,
  listFoldView,
);
