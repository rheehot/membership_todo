import observer from '../utils/observer';

class todoModel extends observer {
  constructor() {
    this.columns = [];
    this.todos = [];
  }
}

export default todoModel;
