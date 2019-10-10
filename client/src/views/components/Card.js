import { selector as $ } from '../../utils';

class Card {
  constructor(todo, model) {
    this.itemSeq = todo.itemSeq;
    this.colSeq = todo.colSeq;
    this.itemContent = todo.itemContent;
    this.itemOrder = todo.itemOrder;
    this.itemWriter = todo.itemWriter;
    this.model = model;
  }

  getTmpl(todo) {
    const tmpl = /* html */ `
      <li class="card" id="card${todo.itemSeq}" data-order="${todo.itemOrder}">
        <i class="far fa-list-alt icon"></i>
        <div class="card-wrapper">
          <div class="card-content">${todo.itemContent}</div>
          <div class="card-writer">
            Added by <span>${todo.itemWriter}</span>
          </div>
        </div>
        <i class="fas fa-times icon delete-btn"></i>
      </li>
      `;
    return tmpl;
  }

  insertCard(todo) {
    const cardTmpl = this.getTmpl(todo);
    const cards = $(`#col${this.colSeq} ul.cards`);
    cards.insertAdjacentHTML('afterbegin', cardTmpl);
  }

  deleteCard() {
    const { itemSeq, colSeq, itemContent } = this;
    const item = $(`#card${this.itemSeq}`);
    const deleteBtn = $(`#card${this.itemSeq} .delete-btn`);

    deleteBtn.addEventListener('click', (e) => {
      const popup = confirm('정말 삭제하시겠습니까?');
      if (popup) {
        this.model.deleteTodo(itemSeq, { itemSeq, colSeq, itemContent });
        item.parentNode.removeChild(item);
      }
    });
  }

  init() {
    this.insertCard(this);
    this.deleteCard();
  }
}
export default Card;
