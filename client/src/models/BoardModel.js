import Observable from '../utils/observable';
import { getData, postData, deleteData, putData } from '../utils/dataFetch';

class BoardModel extends Observable {
  constructor(url) {
    super();
    this.url = url;
    this.columnData = [];
    this.todoData = [];
  }

  // async updateBoardAuth() {

  // }

  // async updateBoardTitle() {

  // }

  async getInitialData() {
    const initialData = await getData(this.url);
    initialData.forEach((data, idx, arr) => {
      const { colSeq, colTitle, colOrder, itemSeq, itemWriter, itemContent, itemOrder } = data;

      if (itemSeq) {
        this.todoData.push({ colSeq, itemSeq, itemWriter, itemContent, itemOrder });
      }

      if (idx === 0 || colSeq !== arr[idx - 1].colSeq) {
        this.columnData.push({ colSeq, colTitle, colOrder });
      }
    });
  }
}

export default BoardModel;
