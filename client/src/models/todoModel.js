import Observable from "../utils/observable";
import { getData, postData, deleteData, putData } from "../utils/dataFetch";

class TodoModel extends Observable {
  constructor(url) {
    super();
    this.url = url;
  }

  /**
   * 아이템 시퀀스로 조회
   * Todo 카드 클릭 시 이미지와 컨텐츠 가져오기 위해 사용
   *
   * @param {number} seq
   * @return {object} todo item
   */
  async getTodo(seq) {
    const result = await getData(this.url, seq);
    return result;
  }

  /**
   * 아이템 생성
   * 생성된 아이템 반환
   * add이벤트 알림
   *
   * @param {object} todo item
   * @return {object} todo item
   */
  async addTodo(todo) {
    const result = await postData(this.url, todo);
    this.notify("add", result);
    return result;
  }

  /**
   * 아이템 시퀀스로 업데이트
   * update이벤트 알림
   *
   * @param {number, object, array} seq, todo item, todos
   * @return {object} todo item
   */
  async updateTodo(seq, todo, todoArr) {
    const result = { todo, from: col.order, to: null };
    const result = await putData(this.url, seq, todo);
    this.notify("update", result);
    return result;
  }

  /**
   * 카드 이동으로 인한 업데이트
   * 해당 컬럼과 이동한 컬럼의 모든 아이템 업데이트
   * move 이벤트 알림
   *
   * @param {number, object} seq, todo item
   * @return {object} todo item
   */
  async moveTodo(seq, todo) {
    const result = await putData(this.url, seq, todo);
    this.notify("move", result);
    return result;
  }

  /**
   * 아이템 시퀀스로 삭제
   * delete이벤트 알림
   *
   * @param {number, object} seq, todo item
   * @return {object} status
   */
  async deleteTodo(seq, todo) {
    const result = await deleteData(this.url, seq);
    this.notify("delete", todo);
    return result;
  }
}

export default TodoModel;
