import { TodoModel } from '../../models';
import { Card, Column, SideBar, Header } from '../components';
import { selector as $ } from '../../utils';

class Board {
  constructor(title, model) {
    this.title = title;
    this.model = model;
    this.columns = [];
    this.todos = [];
  }

  async renderView() {
    await this.createBoard();
    await this.createColumns();
    await this.createTodos();

    await this.columns.forEach((col) => {
      col.init();
    });
    await this.todos.forEach((todo) => {
      todo.init();
    });
  }

  createColumns() {
    const { columnData } = this.model;
    columnData.forEach((col) => {
      this.columns.push(new Column(col, this.model));
    });
  }

  createTodos() {
    const { todoData } = this.model;
    todoData.forEach((todo) => {
      this.todos.push(new Card(todo));
    });
  }

  createBoard() {
    const boardTmpl = /* html */ `
    <div class="wrapper">
    <header>TODO</header>
    <div class="board">
      <div class="board-title">
      </div>
    </div>
    <nav>view activity</nav>
    <article class="columns">
    </article>
    <aside class="sidebar"></aside>
  </div>`;

    $('body').innerHtml = boardTmpl;
    $('.board-title').innerHtml = this.title;
  }
}

export default Board;
