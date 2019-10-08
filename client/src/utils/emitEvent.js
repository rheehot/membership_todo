const emitEvent = (el, type) => {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, false, true);
  el.dispatchEvent(e);
};

export default emitEvent;
