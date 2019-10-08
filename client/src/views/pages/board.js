// app.js
import { TodoModel } from '../models';
import { Card, Column, SideBar, Header } from '../components';

const initialDataUrl = 'http://localhost:8080/data/initData.json';
const todoModel = new TodoModel(initialDataUrl);

class Board {
  constructor(model) {
    this.model = model;
  }
}

export default Board;
