import { selector as $ } from '../../utils';

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

  init() {
    this.renderView();
    // this.attatchEvent();
  }
}
export default Column;
