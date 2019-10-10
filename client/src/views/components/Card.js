import { selector as $ } from '../../utils';

class Card {
  constructor(todo, model) {
    this.seq = todo.seq;
    this.colSeq = todo.colSeq;
    this.content = todo.content;
    this.order = todo.order;
    this.writer = todo.writer;
    this.model = model;
  }

  rederView() {
    const cardTmpl = /* html */ `
      <li class="card" id="card${this.seq}" data-order="${this.order}">
        <div class="card-content">${this.content}</div>
        <div class="card-writer">${this.writer}</div>
      </li>
      `;

    const cards = $(`#col${this.colSeq} .cards`);
    cards.insertAdjacentHTML('beforeend', cardTmpl);
  }

  addDragEvent() {
    $();
  }

  addClickEvent() {
    $('.card', { type: 'all' });
  }

  init() {
    this.renderView();
    this.attatchEvent();
  }
}
export default Card;
