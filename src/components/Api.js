export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }

  getCardsServer() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._getResponseData(res));
  }


  editProf({ name, about }) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(res => this._getResponseData(res));
  }

  addNewCard({ name, link}) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(res => this._getResponseData(res));
  }

  delMyCard(item) {
    return fetch(`${this._url}cards/`+item._id, {
      method: 'DELETE',
      headers: this._headers,
      }).then(res => this._getResponseData(res));
   }
 

  putLike(item) {
    return fetch(`${this._url}cards/likes/`+item._id, {
      method: 'PUT',
      headers: this._headers
    }).then(res => this._getResponseData(res));
  }

  delLike(item) {
    return fetch(`${this._url}cards/likes/`+item._id, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._getResponseData(res));
  }

  editAvatar({ avatar }) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    }).then(res => this._getResponseData(res));
  }

}