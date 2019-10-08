import triggerEvent from './emitEvent';

const routePage = async (url) => {
  await window.history.pushState(null, null, url);
  await triggerEvent(window, 'routing');
};

export default routePage;
