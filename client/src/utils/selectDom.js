import extend from './extend';

const selector = (target, options) => {
  target = target || 'body';
  options = extend(
    {
      type: 'single',
      child: false,
    },
    options || {},
  );

  const container = options.type === 'all'
    ? document.querySelectorAll(target)
    : document.querySelector(target);
  return container;
};
export default selector;
