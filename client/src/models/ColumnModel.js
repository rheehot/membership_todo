import Observable from '../utils/observable';
import { getData, postData, deleteData, putData } from '../utils/dataFetch';

class BoardModel extends Observable {
  constructor(url) {
    super();
    this.url = url;
    this.columnData = [];
    this.todoData = [];
  }

  async addColumn(col) {
    this.columnData = [...this.columnData, col];
    this.notify('column', this.columnData);
  }

  async updateColumn(col) {
    this.columnData.forEach((el) => {
      if (el.seq === col.seq) {
        const propArr = Object.keys(el);
        propArr.forEach((prop) => {
          el[prop] = col[prop];
        });
      }
    });
    this.notify('column', this.todoData);
  }

  deleteColumn(col) {
    this.todoData = this.todoData.filter((el) => el !== col);
    this.notify('column', this.todoData);
  }
}

export default BoardModel;
