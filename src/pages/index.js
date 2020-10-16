import Api from '../components/Api.js';
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js';
import { submAddCard, profileAvatar, elementsContainer, popup, popupAdd, editButton, name, about, selectorObject, addButton, popupAvatar, submProfButton, submProfAva, namePic, linkPic } from '../utils/constants.js';
import { savingText } from '../utils/utils.js';
import { data } from 'autoprefixer';

//  1. Создадим ГЛАВНЫЙ экземпляр класса Api 
const main = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-16/',
  headers: {
    authorization: '11833e84-e207-4192-9aba-df03c33b720c',
    'content-type': 'application/json'
  }
})

//  2. Подтянем карточки с сервера и подтянем данные объекта профиля с сервера, потом создадим профиль и контейнер с карточками

Promise.all([  //в Promise.all передаем массив промисов которые нужно выполнить
  main.getUserInfo(),
  main.getCardsServer()
])    
.then((data)=>{    //попадаем сюда когда оба промиса будут выполнены
  const [userData, initCards] = data;
  personInfo.setUserInfo(userData);
  const cardList = new Section({ //  Создадим экземпляр класса Section для прохода по массиву и добавления элементов в DOM
    items: initCards,
    renderer: (item) => { 
      // проходимся методом по массиву, передадим параметром функцию, создающую карточку и создаем целую сетку карточек
      cardList.addItem(createCard(item));        
  }},
    elementsContainer
  );
  cardList.render(); // создаем раздел с карточками  
})
.catch((err)=>{     //попадаем сюда если один из промисов завершается ошибкой
  console.log(err);
})

//  Код создания экземпляра карточки
const createCard = (item) => {
  const card = new Card(item, '#element', 
    {
      handleCardClick:() => {  // функция увеличенной картинки
        //  Экземпляр класса попапа увеличенной картинки
        const bigPicture = new PopupWithImage('.pic-popup', item);
        bigPicture.open();  
        bigPicture.setEventListeners();
      } 
    },
    {
      showAndDelete:() => {  //функция, открывающая попап удаления по нажатию на корзину
        //  Экземпляр класса попапа согласия удаления
      const delPopup = new PopupDelete('.delete-popup', '.popup__save-button', { 
          onCkick: () => {                          
            main.delMyCard(item)
            .then(()=> { 
              card.deleteCard(item);                       
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            })
            .finally(()=>{
            })
          } 
        });
        delPopup.open();
        delPopup.setEventListeners();
      }
    }, 
    {
      likeOff:() => {  //постановка лайка
        main.delLike(item)
        .then(data => {
          card.checkLikeClass(data.likes)
          card.likeCounte(data.likes);
        })
        .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        });
      }
    } ,
    {
      likeOn:() => {  // снятие лайка
        main.putLike(item)
          .then(data => {
            card.checkLikeClass(data.likes)
            card.likeCounte(data.likes);
          })  
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }
    }       
  );
  // Создаём карточку 
  const newCardElement = card.generateCard();
  //  отображение кнопки корзинки удаления+слушатель на нее
  card.showDelBtn(item); 
  //  вернем созданную карточку
  return newCardElement;
}



// 3. Редактирование данных профиля

    // Данные профиля
const personInfo = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__subtitle', avaSelector: '.profile__avatar' });
    // экземпляр формы редактирования профиля
const editPopup = new PopupWithForm({ formSelector: '.popup__container', onSubmit: (evt) => {
  evt.preventDefault();
  savingText(true, submProfButton);
  main.editProf({ name: name.value, about: about.value })
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
  editPopup.setEventListeners();
  const objPersonal = personInfo.getUserInfo();
  name.value = objPersonal.nameSelector; 
  about.value = objPersonal.aboutSelector;  
}); 

// 4. Добавление новой карточки

//  Добавление новой карточки через форму
const addPopup = new PopupWithForm({ formSelector: '.popup__container', 
  onSubmit: () => {      
      savingText(true, submAddCard);  
      main.addNewCard({ name: namePic.value , link: linkPic.value }) 
      .then((data)=> {
        addPopup.close();               
        elementsContainer.prepend(createCard(data));       
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
const avaPopup = new PopupWithForm({ formSelector: '.popup__container', 
  onSubmit: (evt) => {  
    evt.preventDefault();
    savingText(true, submProfAva);
    main.editAvatar({ avatar: linkAva.value })
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


//  6. Валидация
const validProfile = new FormValidator(selectorObject, popup); //  экземпляр класса валидации формы редактирования профиля
const validAdd = new FormValidator(selectorObject, popupAdd); //  экземпляр класса валидации формы добавления карточки
const validAva = new FormValidator(selectorObject, popupAvatar); //  экземпляр класса валидации формы редактирования аватара
validProfile.enableValidation();
validAdd.enableValidation();
validAva.enableValidation();