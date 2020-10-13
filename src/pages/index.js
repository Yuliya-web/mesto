import Api from '../components/Api.js';
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { submAddCard, profileAvatar, nameProfile, aboutProfile, elementsContainer, popup, popupAdd, editButton, name, about, selectorObject, addButton, popupAvatar, submProfButton, submProfAva } from '../utils/constants.js';
import { savingText } from '../utils/utils.js';
import { data } from 'autoprefixer';

//  1. Создадим ГЛАВНЫЙ экземпляр класса Api и подтянем данные объекта профиля с сервера
const main = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-16/',
  headers: {
    authorization: '11833e84-e207-4192-9aba-df03c33b720c',
    'content-type': 'application/json'
  }
})

const dataProfile = main.getUserInfo();
dataProfile.then((data) => {
  nameProfile.textContent = data.name;
  aboutProfile.textContent = data.about;
  profileAvatar.src = data.avatar;
});

//  2. Подтянем карточки с сервера, создав экземпляр класса

//  Экземпляр класса попапа согласия удаления
const delPopup = new Popup('.delete-popup');

const dataElements = main.getCardsServer();
dataElements.then((data) => {
  const cardList = new Section({ //  Создадим экземпляр класса Section для прохода по массиву и добавления элементов в DOM
    items: data,
    renderer: (item) => { 
      const card = new Card(item, '#element', { 
        handleCardClick:() => {  
          BigPicture.open(item);  
        } 
      });
      // Создаём карточку 
      const newCardElement = card.generateCard(); 
      cardList.addItem(newCardElement);   
      //  Счетчик лайков в карточке
      document.querySelector('.element__like-counter').textContent = item.likes.length;

      // Слушатель лайка
      const likeButton = document.querySelector('.element__like');
      likeButton.addEventListener('click', () => {
      
      //document.querySelector('.element__like-counter').textContent = item.likes.length+1;
      if( likeButton.classList.contains('element__like_active')){
        main.delLike(item)
        .then(data => {
          card.checkLikeClass(data.likes)
        })
      } else {
        main.putLike(item)
        .then(data => {
          card.checkLikeClass(data.likes)
        })  
      }  
      }); 
      //  Слушатель кнопки "корзина" для открытия попапа (либо удаление этой кнопки)
      const delBtn = elementsContainer.querySelector('.element__delete-card');
      if (item.owner._id === 'd11a2f0d97502500a3df5278') {delBtn.addEventListener('click', () => {  
        delPopup.open();
        delPopup.setEventListeners();
        //  Слушатель кнопки попапа подтверждения удаления
        document.querySelector('.delete-popup__container').addEventListener('submit', (evt) => { 
          evt.preventDefault();            
          main.delMyCard(item)
          .then(()=> {            
            delPopup.close();
          })
        });
      }); 
      }
      else  {
        delBtn.remove()
      }    

    }
  },
    elementsContainer
  );
  cardList.render(); // создаем раздел с карточками
});

// 3. Редактирование данных профиля

    // Данные профиля
const personInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__subtitle' });
    // экземпляр формы редактирования профиля
const editPopup = new PopupWithForm({ formSelector: '.popup__container', onSubmit: (evt) => {
  evt.preventDefault();
  savingText(true, submProfButton);
  main.editProf()
    .then((data)=> {
      personInfo.setUserInfo(data);
      editPopup.close();
    })
    .catch(err => console.log(err))
  .finally(()=> {
    savingText(false, submProfButton, 'Сохранить');
  })
  }
} , '.popup');

  //обработчик кнопки редактирования профиля  
editButton.addEventListener('click', () => { 
  editPopup.open();
  const objPersonal = personInfo.getUserInfo();
  name.value = objPersonal.nameSelector; 
  about.value = objPersonal.aboutSelector;  
}); 

// 4. Добавление новой карточки

//  Добавление новой карточки через форму
const addPopup = new PopupWithForm({ formSelector: '.popup__container', onSubmit: () => {  
  const objInp = addPopup._getInputValues();
  // Создадим экземпляр карточки
  const addCard = new Card(objInp, '#element', { 
    handleCardClick: () => {
      BigPicture.open(objInp);
    } 
  });
  savingText(true, submAddCard);  
  main.addNewCard() 
    .then(()=> {
      addPopup.close();
      const elementCard = addCard.generateCard();            
      elementsContainer.append(elementCard);       
    })
    .catch(err => console.log(err))
  .finally(()=> {
    savingText(false, submAddCard, 'Сохранить');
  });
  }
}, '.add-popup');

addButton.addEventListener('click', () => { //обработчик кнопки добавления '+' карточки
  addPopup.open();
  addPopup.setEventListeners();
})


//  5. Экземпляр класса попапа редактирования аватара
const avaPopup = new PopupWithForm({ formSelector: '.popup__container', onSubmit: (evt) => {  
  evt.preventDefault();
  savingText(true, submProfAva);
  main.editAvatar()
    .then((data)=> {      
      avaPopup.close();
      profileAvatar.src = data.avatar;
    })
    .catch(err => console.log(err))
  .finally(()=> {
    savingText(false, submProfAva, 'Сохранить');
  })
}
}, '.avatar-popup');

//обработчик кнопки редактирования аватара
document.querySelector('.profile__edit-avatar').addEventListener('click', () => { 
  avaPopup.open();
  avaPopup.setEventListeners();
})


//  Экземпляр класса попапа увеличенной картинки
const BigPicture = new PopupWithImage('.pic-popup');

//  Валидация
const validProfile = new FormValidator(selectorObject, popup); //  экземпляр класса валидации формы редактирования профиля
const validAdd = new FormValidator(selectorObject, popupAdd); //  экземпляр класса валидации формы добавления карточки
const validAva = new FormValidator(selectorObject, popupAvatar); //  экземпляр класса валидации формы редактирования аватара
validProfile.enableValidation();
validAdd.enableValidation();
validAva.enableValidation();










