import Observable from '../utils/observable';
import { getData, postData, deleteData, putData } from '../utils/dataFetch';

class BoardModel extends Observable {
  constructor(url) {
    super();
    this.url = url;
    this.columnData = [];
    this.todoData = [];
  }

  async updateBoardAuth() {}

  async updateBoard() {}

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

export default BoardModel;
