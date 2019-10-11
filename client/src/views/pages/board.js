import Sortable from 'sortablejs';
import { ColumnModel, TodoModel } from '../../models';
import { Card, Column, SideBar, Header } from '../components';
import { selector as $ } from '../../utils';

const columnModel = new ColumnModel('http://localhost:3000/api/column/');
const todoModel = new TodoModel('http://localhost:3000/api/item/');

class Board {
  constructor(user, title, model) {
    this.title = title;
    this.model = model;
    this.user = user;
  }

  async renderView() {
    await this.model.getInitialData();
    await this.createBoard();
    await this.createColumns();
    await this.createTodos();
    await this.addColumnView();
    await this.sortableCard();
  }

  sortableCard() {
    const cardList = $('ul.cards', { type: 'all' });
    cardList.forEach((ul) => {
      Sortable.create(ul, {
        group: 'shared',
        animation: 200,
        emptyInsertThreshold: 100,
        fallbackTolerance: 3,
      });
    });
  }

  async createColumns() {
    const { columnData } = this.model;
    columnData.sort((a, b) => a.colOrder - b.colOrder);
    columnData.forEach((col) => {
      const column = new Column(col, columnModel);
      column.init();
    });
  }

  async createTodos() {
    const { todoData } = this.model;
    todoData.sort((a, b) => a.colOrder - b.colOrder);
    todoData.forEach((todo) => {
      const todoCard = new Card(todo, todoModel);
      todoCard.init();
    });
  }

  async createBoard() {
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

    $('#page_container').innerHTML = await boardTmpl;
    $('.board-title').innerHTML = this.title;
  }

  addColumnView() {
    const colTmpl = /* html */ `
    <section class="col expect">
      <div class="colbox">
        <p>+ Add column</p>
      </div>
    </section>
      `;

    const container = $('.columns');
    container.insertAdjacentHTML('beforeend', colTmpl);
  }
}

export default Board;
