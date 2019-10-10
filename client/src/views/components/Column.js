import { selector as $ } from '../../utils';
import Card from './Card';
import { TodoModel } from '../../models';

const todoModel = new TodoModel('http://localhost:3000/api/item/');


class Column {
  constructor(col, model) {
    this.colSeq = col.colSeq;
    this.title = col.colTitle;
    this.colOrder = col.colOrder;
    this.model = model;
  }

  renderView() {
    const colTmpl = /* html */ `
        <section class="col" id="col${this.colSeq}" data-order="${this.colOrder}">
            <div class="colbox">
            <div class="col-head">
            <div class="col-title">
                <div class="col-num">0</div>
                <div class="col-titletxt">${this.title}</div>
            </div>
            <div class="col-btn">
                <div class="col-add"><i class="fas fa-plus"></i></div>
                <div class="col-set"><i class="fas fa-ellipsis-h"></i></div>
            </div>
            </div>
            <div class="card-add-input">
              <textarea maxlength="500" placeholder="note..."></textarea>
              <diV class="card-add-btn disable">
                <button class="create">
                  add
                </button>
                <button class="cancle">
                  cancle
                </button>
              </diV>
            </div>
            <div class="cardlist">
            <ul class="cards">
            </ul>
            </div>
        </div>
        </section>
      `;

    const container = $('.columns');
    container.insertAdjacentHTML('beforeend', colTmpl);
  }

  openInputHandler(e, addInput) {
    addInput.classList.toggle('visible');
  }

  activeBtnHandler(e, inputBtn, addItembtn) {
    if (e.target.value === '') {
      inputBtn.classList.add('disable');
      addItembtn.disabled = true;
    } else {
      inputBtn.classList.remove('disable');
      addItembtn.disabled = false;
    }
  }

  cancleCardHandler(e, addInput, inputArea, inputBtn, addItembtn) {
    inputArea.value = '';
    addInput.classList.toggle('visible');
    inputBtn.classList.add('disable');
    addItembtn.disabled = true;
  }

  async addCardHandler(e, inputArea) {
    const formData = new FormData();

    formData.append('colSeq', this.colSeq);
    formData.append('userId', 'user');
    formData.append('content', inputArea.value);
    formData.append('itemOrder', 2);

    const [result] = await todoModel.addTodo(formData);
    const newtodo = {
      itemSeq: result.seq,
      itemContent: result.content,
      itemOrder: result.itemOrder,
      itemWriter: result.userId,
      colSeq: result.colSeq,
    };

    const newCard = new Card(newtodo, todoModel);
    newCard.init();
  }

  attatchEvent() {
    const {
      addCardbtn, addInput, inputArea, inputBtn, cancleItembtn, addItembtn,
    } = this.selectDom();

    addCardbtn.addEventListener('click', (e) => {
      this.openInputHandler(e, addInput);
    });

    inputArea.addEventListener('input', (e) => {
      this.activeBtnHandler(e, inputBtn, addItembtn);
    });

    cancleItembtn.addEventListener('click', (e) => {
      this.cancleCardHandler(e, addInput, inputArea, inputBtn, addItembtn);
    });

    addItembtn.addEventListener('click', async (e) => {
      await this.addCardHandler(e, inputArea);
    });
  }

  selectDom() {
    const addCardbtn = $(`#col${this.colSeq} .col-add`);
    const addInput = $(`#col${this.colSeq} .card-add-input`);
    const inputArea = $(`#col${this.colSeq} textarea`);
    const inputBtn = $(`#col${this.colSeq} .card-add-btn`);
    const cancleItembtn = $(`#col${this.colSeq} .card-add-btn .cancle`);
    const addItembtn = $(`#col${this.colSeq} .card-add-btn .create`);


    return { addCardbtn, addInput, inputArea, inputBtn, cancleItembtn, addItembtn };
  }

  init() {
    this.renderView();
    this.attatchEvent();
  }
}
export default Column;
