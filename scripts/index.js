import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popup = document.querySelector('.popup'); //попап редактирования профиля
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const container = popup.querySelector('.popup__container'); 
const closeButton = container.querySelector('.popup__close-button');//кнопка закрытия попапа профиля
const name = container.querySelector('#Name'); //имя в форме
const about = container.querySelector('#About'); //работа в форме
const nameProfile = profile.querySelector('.profile__title'); //имя на страничке
const aboutProfile = profile.querySelector('.profile__subtitle'); //работа на страничке

const popupAdd = document.querySelector('.add-popup');//попап добавления элемента
const addButton = profile.querySelector('.profile__add-button'); //кнопка +
const addContainer = popupAdd.querySelector('.popup__container');//контейнер в попапе добавления
const createButton = popupAdd.querySelector('.popup__save-button'); //кнопка сохранения в попапе
const closeButtonPic = addContainer.querySelector('.add-popup__close-button'); //закрытие попапа формы добавления
const namePic = addContainer.querySelector('#namePic');//название картинки в форме
const linkPic = addContainer.querySelector('#link');//ссылка на картинку в форме

export const popupPic = document.querySelector('.pic-popup'); //попап увеличенной картинки
const closePicBtn = popupPic.querySelector('.pic-popup__close-button'); //объявили кнопку закрытия картинки

const elementsContainer = document.querySelector('.elements') //  Контейнер под карточки

const selectorObject = { //  Селектор для классов полей формы, кнопок и валидации
  inputSelector: '.popup__name-field', 
  submitButtonSelector: '.popup__save-button', 
  inactiveButtonClass: 'popup__save-button_inactive',   
  inputErrorClass: 'popup__name-field_error', 
  errorClass: 'popup__name-field-error_active'
}

const initialCards = [        //массив
  {   
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validProfile = new FormValidator(selectorObject, popup); //  экземпляр класса формы редактирования профиля
const validAdd = new FormValidator(selectorObject, popupAdd); //  экземпляр класса формы добавления карточки
validProfile.enableValidation();
validAdd.enableValidation();

/*const formList = Array.from(document.querySelectorAll('.popup__container')); 
formList.forEach((container) => { 
  const validForm = new FormValidator(selectorObject, container);  
  validForm.enableValidation();
}); */

 //открытие-закрытие попапов

 export function openPopup(pop){ //функция открытия попапов
  pop.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);//обработчик кнопки закрытия нажатием на Esc
}

editButton.addEventListener('click', () => { //обработчик кнопки редактирования профиля
  openPopup(popup); 
  name.value = nameProfile.textContent; 
  about.value = aboutProfile.textContent;  
}); 

addButton.addEventListener('click', () => { //обработчик кнопки добавления + карточки
  openPopup(popupAdd); 
  namePic.value = '';
  linkPic.value = ''; 
  createButton.classList.add('popup__save-button_inactive');
  createButton.disabled = true;
}); 

function keyHandler(evt){ //закрытие на Esc
  if (evt.keyCode === 27){  
    const popupOpened = document.querySelector('.popup_opened')//открытый попап  
    closePopup(popupOpened);
  }  
} 

function closePopup(pop){ //функция закрытия попапов; 
  pop.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);//удалили обработчик кнопки закрытия нажатием на Esc
}

closeButton.addEventListener('click', () => { closePopup(popup)}); //обработчик кнопки закрытия редактирования
closeButtonPic.addEventListener('click', () => { closePopup(popupAdd)});//обработчик кнопки закрытия формы добавления

function closeFormByOverlay(evt){  //функция закрытия по нажатию на оверлэй
  if (evt.target === document.querySelector('.popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
} 

popup.addEventListener('click', closeFormByOverlay);//обработчик кнопки закрытия по нажатию на оверлэй 
popupAdd.addEventListener('click', closeFormByOverlay);//обработчик кнопки закрытия по нажатию на оверлэй 


//добавление данных и перенос их на страницу

function formSubmitHandler(evt){ //для подтягивания в профиль забитых значений из формы (имя и работа)
  evt.preventDefault();
  nameProfile.textContent = name.value;
  aboutProfile.textContent = about.value;
  closePopup(popup);
}
container.addEventListener('submit', formSubmitHandler); //перенос данных формы по клику Submit (имя и работа) и закрытие


//  Проходим по массиву для создания карточек

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '#element');
  // Создаём карточку и возвращаем наружу
  const newCardElement = card.generateCard();  
  // Добавляем в DOM
  elementsContainer.prepend(newCardElement);
  //document.querySelector('.element__image').addEventListener('click', evt => {openPopupPic(evt.target.parentElement)});
});


//  Добавление новой карточки через форму

function formSubmitPic(item){ //функция добавления нового элемента
  // Создадим экземпляр карточки
  const addCard = new Card(item, '#element');
  // Создаём карточку и возвращаем наружу
  const addCardElement = addCard.generateCard();
  // Добавляем в DOM  
  elementsContainer.prepend(addCardElement);
  closePopup(popupAdd);
  //document.querySelector('.element__image').addEventListener('click', evt => {openPopupPic(evt.target.parentElement)});
}
addContainer.addEventListener('submit', formSubmitPic);// задействуем форму добавления элемента по клику


closePicBtn.addEventListener('click', () => {closePopup(popupPic)});//задействуем кнопку закрытия картинки по клику на кнопку закрытия

popupPic.addEventListener('click', closeFormByOverlay);//обработчик кнопки закрытия картинки по нажатию на оверлэй 



