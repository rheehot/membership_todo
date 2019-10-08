const parseURL = () => {
  const url = window.location.pathname.toLowerCase() || '/';
  const r = url.split('/');
  const request = r[1];
  return request;
};

export default parseURL;
