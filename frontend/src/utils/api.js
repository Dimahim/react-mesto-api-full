   // Класс Апи 
  class Api {
  constructor ({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // От сервера всегда проверяется на корректность
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение данных пользователя
  getUserInfo() {
    const token = (localStorage.getItem('jwt'));
    console.log(token)
    return fetch(`${this._baseUrl}users/me`, {
      headers:{ 
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    }).then(this._getResponse);
  }

  // Получение данных карточек
  getCardsInfo() {
    const token = (localStorage.getItem('jwt'));
    return fetch(`${this._baseUrl}cards`, { 
      headers:{ 
        ...this._headers,
        Authorization: `Bearer ${token}`,
      }
    }).then(this._getResponse);
  }
  
   // Добавление карточек
  postNewCard(newCard) {
    // const token = (localStorage.getItem('jwt'));
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers:{ 
        ...this._headers,
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      }),
      
    })
    .then(this._getResponse);
  }

  // Редактирование профиля
  patchUserProfil(userInfo) {
    return fetch(`${this._baseUrl}users/me`, { 
      method: 'PATCH',
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      }),
      headers: this._headers
    })
    .then(this._getResponse);
  }

  // Смена аватара
  patchAvatarUser( avatarLink ) {
    return fetch(`${this._baseUrl}users/me/avatar`, { 
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatarLink.avatar
      }),
      headers: this._headers,
      
    }).then(this._getResponse);
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse);
  }

  // Поставить лайк
  putCardLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getResponse);
  }

  // Удалить лайк:
  deleteCardLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse);
  }

// Лайк удалить или поставить
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`,
      {
        method: (isLiked ? "PUT" : "DELETE"),
        headers: this._headers
      })
      .then(this._getResponse);
  }


}

//Создаем экземпляр класса 

const api = new Api({
  baseUrl: 'https://domain.mesto.students.nomoredomains.rocks/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //  authorization: '7a991412818d228471fa20fcae5b3e6b56d9de347377806a4f0253577b80e1b4',
  }
});

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28/',
//   headers: {
//     authorization: 'b44b3d92-4c6d-4868-9fa0-516a17273e75',
//     'Content-Type': 'application/json'
//   }
// });

export default api;