import Observable from '../utils/observable';
import { getData } from '../utils/dataFetch';

class TodoModel extends Observable {
  constructor(url) {
    super();
    this.url = url;
    this.columnData = [];
    this.todoData = [];
  }

  addTodo(todo) {
    this.todos = [...this.todos, todo];
    this.notify(this.todos);
  }

  addColumn(col) {
    this.col;
  }

  async getInitialData() {
    const initialData = await getData(this.url);

    initialData.reduce((acc, cur, idx) => {
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
