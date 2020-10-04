import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, elementsContainer, popup, popupAdd, editButton, name, about, selectorObject, addButton } from '../utils/constants.js';

const BigPicture = new PopupWithImage('.pic-popup');// экземпляр класса попапа увеличенной картинки

  //  Создадим экземпляр класса Section для прохода по массиву и добавления элементов в DOM

const cardList = new Section({
  items: initialCards,
  renderer: (item) => { 
    const card = new Card(item, '#element', { 
      handleCardClick:() => {  
        BigPicture.open(item);
      } 
    });
    // Создаём карточку 
    const newCardElement = card.generateCard(); 
    cardList.addItem(newCardElement);
  }
},
  elementsContainer
);

cardList.render(); // создаем раздел с карточками

//  Валидация

const validProfile = new FormValidator(selectorObject, popup); //  экземпляр класса формы редактирования профиля
const validAdd = new FormValidator(selectorObject, popupAdd); //  экземпляр класса формы добавления карточки
validProfile.enableValidation();
validAdd.enableValidation();

// Данные профиля
const personInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__subtitle' });

// экземпляр формы редактирования профиля
const editPopup = new PopupWithForm({ formSelector: '.popup__container', onSubmit: (evt) => {
    evt.preventDefault();
    personInfo.setUserInfo();
    editPopup.close()}
  } , '.popup');

//обработчик кнопки редактирования профиля  
editButton.addEventListener('click', () => { 
  editPopup.open();
  const objPersonal = personInfo.getUserInfo();
  name.value = objPersonal.nameSelector; 
  about.value = objPersonal.aboutSelector;  
}); 

//  Добавление новой карточки через форму
const addPopup = new PopupWithForm({ formSelector: '.popup__container', onSubmit: (evt) => {
  evt.preventDefault();
  const objInp = addPopup._getInputValues();
  // Создадим экземпляр карточки
  const addCard = new Card(objInp, '#element', { 
    handleCardClick: () => {
      BigPicture.open(objInp);
    } 
  });
  // Создаём карточку и возвращаем наружу
  const addCardElement = addCard.generateCard();
  // Добавляем в DOM  
  cardList.addItem(addCardElement);
  addPopup.close()}
}, '.add-popup');

addButton.addEventListener('click', () => { //обработчик кнопки добавления '+' карточки
  addPopup.open();
  addPopup.setEventListeners();
})







