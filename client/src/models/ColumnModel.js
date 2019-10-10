import Observable from '../utils/observable';
import { getData, postData, deleteData, putData } from '../utils/dataFetch';

class ColumnModel extends Observable {
  constructor(url) {
    super();
    this.url = url;
  }

  /**
   * 컬럼 생성
   * 생성된 컬럼 반환
   * add이벤트 알림
   *
   * @param {object} column
   * @return {object} column
   */
  async addCol(col) {
    const result = await postData(this.url, col);
    this.notify('col-add', result);
    return result;
  }

  /**
   * 컬럼 시퀀스로 업데이트
   * update이벤트 알림
   *
   * @param {number, object} seq, column
   * @return {object} column
   */
  async updateCol(seq, col) {
    const result = await putData(this.url, seq, col);
    this.notify('col-update', result);
    return result;
  }

  /**
   * 컬럼 이동으로 인한 업데이트
   * 모든 컬럼 순서 업데이트
   * move 이벤트 알림
   *
   * @param {number, object, arraqy} seq, column, columns
   * @return {object} column
   */
  async moveCol(seq, col, colArr) {
    const result = { col, from: col.order, to: null };

    await colArr.forEach(async (column) => {
      await putData(this.url, seq, column);
    });
    this.notify('col-move', result);
  }

  /**
   * 컬럼 시퀀스로 삭제
   * delete이벤트 알림
   *
   * @param {number, object} seq, column
   * @return {object} status
   */
  async deleteTodo(seq, col) {
    const result = await deleteData(this.url, seq);
    this.notify('col-delete', col);
    return result;
  }
}

export default ColumnModel;
