const postData = async (url = '', data = {}) => {
  const options = {
    method: 'POST',
    cache: 'no-cache',
    mode: 'same-origin',
    credentials: 'include',
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // },
    body: data,
  };
  const response = await fetch(url, options)
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    });
  return response;
};

const deleteData = async (url = '') => {
  const options = {
    method: 'DELETE',
    cache: 'no-cache',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, options).then((res) => res);
  return response;
};

const getData = async (url) => {
  const options = {
    method: 'GET',
    cache: 'no-cache',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, options)
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    });
  return response;
};

const putData = async (url = '', data = {}) => {
  const options = {
    method: 'PUT',
    cache: 'no-cache',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options).then((res) => res.json());
  return response;
};

export { postData, deleteData, getData, putData };
