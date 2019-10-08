import Observable from '../utils/observable';
import { getData, postData, deleteData, putData } from '../utils/dataFetch';

class TodoModel extends Observable {
  constructor(url) {
    super();
    this.url = url;
    this.columnData = [];
    this.todoData = [];
  }

  addTodo(todo) {
    this.todoData = [...this.todoData, todo];
    this.notify('todo', this.todoData);
  }

  updateTodo(todo) {
    this.todoData.forEach((el) => {
      if (el.seq === todo.seq) {
        const propertyArr = Object.keys(el);
        propertyArr.forEach((property) => {
          el[property] = todo[property];
        });
      }
    });
    this.notify('todo', this.todoData);
  }

  deleteTodo(todo) {
    this.todoData = this.todoData.filter((el) => el !== todo);
    this.notify('todo', this.todoData);
  }

  addColumn(col) {
    this.columnData = [...this.columnData, col];
    this.notify('column', this.columnData);
  }

  updateColumn(col) {
    this.columnData.forEach((el) => {
      if (el.seq === col.seq) {
        const propertyArr = Object.keys(el);
        propertyArr.forEach((property) => {
          el[property] = col[property];
        });
      }
    });
    this.notify('column', this.todoData);
  }

  deleteColumn(col) {
    this.todoData = this.todoData.filter((el) => el !== col);
    this.notify('column', this.todoData);
  }

  async getInitialData() {
    const initialData = await getData(this.url);

    initialData.reduce((acc, cur) => {
      const { itemSeq, userID, content, itemOrder } = acc;
      this.todoData.push({ itemSeq, userID, content, itemOrder });

      if (acc.colSeq !== cur.colSeq) {
        const { colSeq, colTitle, colOrder } = acc;
        this.columnData.push({ colSeq, colTitle, colOrder });
      }
      return cur;
    });
  }
}

export default TodoModel;
