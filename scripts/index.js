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
const closeButtonPic = addContainer.querySelector('.add-popup__close-button'); //закрытие попапа формы добавления

//const elementContainer = document.querySelector('.elements'); //грид картинок
const popupPic = document.querySelector('.pic-popup'); //попап увеличенной картинки

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

 //открытие-закрытие попапов
 
function openPopup(pop){ //функция открытия попапов
  pop.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);//обработчик кнопки закрытия нажатием на Esc
    // Создадим экземпляр валидированной формы
  const ValidCard = new FormValidator();
    // Создаём форму и возвращаем наружу
  ValidCard.enableValidation();
}

editButton.addEventListener('click', () => { //обработчик кнопки редактирования
  openPopup(popup); 
  name.value = nameProfile.textContent; 
  about.value = aboutProfile.textContent;
}); 

addButton.addEventListener('click', () => { //обработчик кнопки добавления +
  openPopup(popupAdd); 
  namePic.value = '';
  linkPic.value = '';
  const createButton = popupAdd.querySelector('.popup__save-button');
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


//  Проходим по массиву

initialCards.forEach((item) => {
  const card = new Card(item.link, item.name);

  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  cardElement.querySelector('.element__image').src = item.link;
  cardElement.querySelector('.element__title').textContent = item.name;
  
  // Добавляем в DOM
  document.querySelector('.elements').prepend(cardElement);
  document.querySelector('.element__like').addEventListener('click', likeBtn);
  document.querySelector('.element__image').addEventListener('click', evt => {openPopupPic(evt.target.parentElement)});
});


//  Лайк
const likeButton = document.querySelector('.element__like');// объявляем кнопку Лайк 
function likeBtn(evt){  
  evt.target.classList.toggle('element__like_active');
}



//  задействуем функцию увеличения картинки

function openPopupPic(article){ //функция открытия увеличенной картинки 
  const elImage = article.querySelector('.element__image');
  const elTitle = article.querySelector('.element__title');
  openPopup(popupPic); //добавляет класс для открытия попапа картинки   
  
  popupPic.querySelector('.pic-popup__content').src = elImage.src;  //подтягивает картинку из объявленной 
  popupPic.querySelector('.pic-popup__name').textContent = elTitle.textContent; //подтягивает имя элемента 
} 

const closePicBtn = popupPic.querySelector('.pic-popup__close-button'); //объявили кнопку закрытия картинки

closePicBtn.addEventListener('click', () => { closePopup(popupPic)});//задействуем кнопку закрытия по клику на кнопку закрытия

popupPic.addEventListener('click', closeFormByOverlay);//обработчик кнопки закрытия по нажатию на оверлэй 



//  Добавление новой карточки через форму

const namePic = addContainer.querySelector('#namePic');//название картинки в форме
const linkPic = addContainer.querySelector('#link');//ссылка на картинку в форме

function formSubmitPic(){ //функция добавления нового элемента
  // Создадим экземпляр карточки
  const AddCard = new Card(linkPic, namePic);
  // Создаём карточку и возвращаем наружу
  const AddCardElement = AddCard.generateCard();
  //  Определим картинку и название
  AddCardElement.querySelector('.element__image').src = linkPic.value;
  AddCardElement.querySelector('.element__title').textContent = namePic.value;
  // Добавляем в DOM
  
  document.querySelector('.elements').prepend(AddCardElement);
  closePopup(popupAdd);
  document.querySelector('.element__like').addEventListener('click', likeBtn);
  document.querySelector('.element__image').addEventListener('click', evt => {openPopupPic(evt.target.parentElement)});
}
addContainer.addEventListener('submit', formSubmitPic);// задействуем форму добавления элемента по клику


