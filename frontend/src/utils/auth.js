// аутентификациz пользователя

// const BASE_URL = 'https://auth.nomoreparties.co';
const BASE_URL = 'https://domain.mesto.students.nomoredomains.rocks/api';

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
};

export const register = (email, password) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => getResponse(res));
};

export const login = (email, password) => {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => getResponse(res));
};

export const tokenCheck = (token) => {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((res) => getResponse(res));
};