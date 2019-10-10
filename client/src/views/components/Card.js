import { selector as $ } from '../../utils';

class Card {
  constructor(todo, model) {
    this.itemSeq = todo.itemSeq;
    this.colSeq = todo.colSeq;
    this.content = todo.itemContent;
    this.itemOrder = todo.itemOrder;
    this.writer = todo.itemWriter;
    this.model = model;
  }

  renderView() {
    const cardTmpl = /* html */ `
      <li class="card" id="card${this.itemSeq}" data-order="${this.itemOrder}">
        <i class="far fa-list-alt icon"></i>
        <div class="card-wrapper">
          <div class="card-content">${this.content}</div>
          <div class="card-writer">
            Added by <span>${this.writer}</span>
          </div>
        </div>
        <i class="fas fa-times icon"></i>
      </li>
      `;

    const cards = $(`#col${this.colSeq} ul.cards`);
    cards.insertAdjacentHTML('afterbegin', cardTmpl);
  }

  //   addDragEvent() {
  //     $();
  //   }

  //   addClickEvent() {
  //     $('.card', { type: 'all' });
  //   }

  init() {
    this.renderView();
    // this.attatchEvent();
  }
}
export default Card;
