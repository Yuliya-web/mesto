import { name, about, linkAva } from '../utils/constants.js';

export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  getCardsServer() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }


  editProf() {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name.value,
        about: about.value
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  addNewCard() {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: document.querySelector('#namePic').value ,
        link: document.querySelector('#link').value
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  delMyCard(item) {
    return fetch(`${this._url}cards/`+item._id, {
      method: 'DELETE',
      headers: this._headers,
      }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  putLike(item) {
    return fetch(`${this._url}cards/likes/`+item._id, {
      method: 'PUT',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  delLike(item) {
    return fetch(`${this._url}cards/likes/`+item._id, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  editAvatar() {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar : linkAva.value
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

}