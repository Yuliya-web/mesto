export const popup = document.querySelector('.popup'); //попап редактирования профиля
const profile = document.querySelector('.profile');
export const editButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования профиля
export const container = popup.querySelector('.popup__container'); 
export const name = container.querySelector('#Name'); //имя в форме
export const about = container.querySelector('#About'); //работа в форме
export const nameProfile = profile.querySelector('.profile__title'); //имя на страничке
export const aboutProfile = profile.querySelector('.profile__subtitle'); //работа на страничке
export const submProfButton = container.querySelector('.popup__save-button')// кнопка сабмита попапа профиля
export const profileAvatar = profile.querySelector('.profile__avatar'); //аватар на страничке
export const popupAvatar = document.querySelector('.avatar-popup'); //попап обновления аватара
export const submProfAva = popupAvatar.querySelector('.popup__save-button')//сабмит попапа аватара
export const linkAva = popupAvatar.querySelector('#linkAva');//ссылка аватара в форме

export const popupAdd = document.querySelector('.add-popup');//попап добавления элемента
export const addButton = profile.querySelector('.profile__add-button'); //кнопка +
export const addContainer = popupAdd.querySelector('.popup__container');//контейнер в попапе добавления
export const namePic = addContainer.querySelector('#namePic');//название картинки в форме
export const linkPic = addContainer.querySelector('#link');//ссылка на картинку в форме
export const submAddCard = popupAdd.querySelector('.popup__save-button')//сабмит попапа добавления карточки


export const popupPic = document.querySelector('.pic-popup'); //попап увеличенной картинки
export const closePicBtn = popupPic.querySelector('.pic-popup__close-button'); //объявили кнопку закрытия картинки
export const popupOp = document.querySelector('.popup_opened');//открытый попап 

export const elementsContainer = document.querySelector('.elements'); //  Контейнер под карточки
export const likeCounter = document.querySelector('.element__like-counter'); // Счетчик лайков
export const deleteCardBtn = document.querySelector('.element__delete-card');

export const escapeKey = 27;

export const selectorObject = { //  Селектор для классов полей формы, кнопок и валидации
  inputSelector: '.popup__name-field', 
  submitButtonSelector: '.popup__save-button', 
  inactiveButtonClass: 'popup__save-button_inactive',   
  inputErrorClass: 'popup__name-field_error', 
  errorClass: 'popup__name-field-error_active'
}








