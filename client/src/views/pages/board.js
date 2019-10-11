import Sortable from 'sortablejs';
import { ColumnModel, TodoModel } from '../../models';
import { itemAPI, columnAPI } from '../../config/api';
import { Card, Column, SideBar, Header } from '../components';
import { selector as $ } from '../../utils';

const columnModel = new ColumnModel(columnAPI);
const todoModel = new TodoModel(itemAPI);

class Board {
  constructor(user, title, model) {
    this.user = user;
    this.title = title;
    this.boardModel = model;
    this.columnModel = columnModel;
    this.todoModel = todoModel;
  }

  async renderView() {
    await this.boardModel.getInitialData();
    await this.createBoard();
    await this.createColumns();
    await this.createTodos();
    await this.addColumnView();
    await this.sortableCard();

    this.todoModel.subscribe('card-update', this.updateItemLen);
  }

  updateItemLen(todo) {
    const items = $(`#col${todo.colSeq} ul.cards li`, { type: 'all' });
    if (items) {
      const num = $(`#col${todo.colSeq} .col-num`);
      num.innerHTML = items.length;
    }
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
    const { columnData } = this.boardModel;
    columnData.sort((a, b) => a.colOrder - b.colOrder);
    columnData.forEach((col) => {
      const column = new Column(col, this.columnModel, this.todoModel);
      column.init();
    });
  }

  async createTodos() {
    const { todoData } = this.boardModel;
    todoData.sort((a, b) => a.colOrder - b.colOrder);
    todoData.forEach((todo) => {
      const todoCard = new Card(todo, this.todoModel);
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
