class Observable {
  constructor() {
    this.handlers = {};
  }

  subscribe(observer) {
    const { eventName, handler } = observer;

    if (this.handlers[eventName] === undefined) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  unsubscribe(observer) {
    const { eventName, handler } = observer;
    const handlerArr = this.handlers[eventName];

    if (handlerArr === undefined) return;

    this.handlers[eventName] = [...handlerArr].filter((el) => el !== handler);
  }

  notify(eventName, data) {
    const handlerArr = this.handlers[eventName];
    if (handlerArr === undefined) return;

    handlerArr.forEach((handler) => handler(data));
  }
}

export default Observable;
