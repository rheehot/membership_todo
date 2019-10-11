class Observable {
  constructor() {
    this.handlers = {};
  }

  subscribe(eventName, handler) {
    if (this.handlers[eventName] === undefined) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  unsubscribe(eventName, handler) {
    const handlerArr = this.handlers[eventName];

    if (handlerArr === undefined) return;

    this.handlers[eventName] = [...handlerArr].filter((el) => el !== handler);
  }

  notify(eventName, data) {
    const handlerArr = this.handlers[eventName];
    if (handlerArr === undefined) return;
    for (const handler of handlerArr) {
      handler(data);
    }
  }
}

export default Observable;
