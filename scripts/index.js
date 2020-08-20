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
const addButton = profile.querySelector('.profile__add-button');//кнопка создать
const addContainer = popupAdd.querySelector('.add-popup__container');//контейнер в попапе добавления
const closeButtonPic = addContainer.querySelector('.add-popup__close-button'); //закрытие попапа формы добавления
const elementContainer = document.querySelector('.elements'); //грид картинок

 //открытие-закрытие попапов

function openPopup(pop){ //функция открытия попапов
  pop.classList.add('popup_opened');
  name.value = nameProfile.textContent; //в форму переносится со странички
  about.value = aboutProfile.textContent; //в форму переносится со странички
}

editButton.addEventListener('click', openPopup.bind(editButton, popup)); //обработчик кнопки редактирования
addButton.addEventListener('click', openPopup.bind(addButton, popupAdd)); //обработчик кнопки добавления +

function closePopup(pop){ //функция закрытия попапов
  pop.classList.remove('popup_opened');
  name.value = nameProfile.textContent;
  about.value = aboutProfile.textContent; 
}

closeButton.addEventListener('click', closePopup.bind(closeButton, popup)); //обработчик кнопки закрытия редактирования
closeButtonPic.addEventListener('click', closePopup.bind(closeButtonPic, popupAdd));//обработчик кнопки закрытия формы добавления

//добавление данных и перенос их на страницу

function formSubmitHandler(evt){ //для подтягивания в профиль забитых значений из формы (имя и работа)
  evt.preventDefault();
  nameProfile.textContent = name.value;
  aboutProfile.textContent = about.value;
  closePopup(popup);
}
container.addEventListener('submit', formSubmitHandler); //перенос данных формы по клику Submit (имя и работа) и закрытие

//создаем карточки из массива

const addElement = document.querySelector('#element');//выбрали темплэйт

function addElementContainer (element){ //делаем контейнер под карточку
  const cloneCard = addElement.content.cloneNode(true); //клонируем карточку из темплэйта
  const elImage = cloneCard.querySelector('.element__image');
  const elTitle = cloneCard.querySelector('.element__title');
  elImage.src = element.link; //ссылка вытаскивает картинку
  elTitle.textContent = element.name;  //в подпись подтягивает имя из массива
     
    //задействуем кнопку "лайк"
    const likeButton = cloneCard.querySelector('.element__like');// объявляем кнопку Лайк 
      function likeBtn(evt){  
        evt.target.classList.toggle('element__like_active');
      } 
    likeButton.addEventListener('click', likeBtn);    
    
    //задействуем кнопку "удалить"
    const delButton = cloneCard.querySelector('.element__delete-card'); //объявляем кнопку корзина
    const elementCard = cloneCard.querySelector('.element'); //объявляем элемент под удаление
    function deleteElement(){  //функция удаления карточки
      elementCard.classList.add('element_non-display'); //добавляет класс не показывать карточку (удалить)
    }
    delButton.addEventListener('click', deleteElement); //запускаем удаление по клику
    
   //задействуем функцию увеличения картинки

    const popupPic = document.querySelector('.pic-popup'); //попап увеличения картинки
    function openPopupPic(){ //функция открытия увеличенной картинки
      openPopup(popupPic); //добавляет класс для открытия попапа картинки
      popupPic.querySelector('.pic-popup__content').src = elImage.src;  //подтягивает картинку из объявленной
      popupPic.querySelector('.pic-popup__name').textContent = element.name; //подтягивает имя элемента
    }
    elImage.addEventListener('click', openPopupPic); //задействует картинку для клика-увеличения

    const closePicBtn = popupPic.querySelector('.pic-popup__close-button'); //объявили кнопку закрытия картинки
    closePicBtn.addEventListener('click', closePopup.bind(closePicBtn, popupPic));//задействуем кнопку закрытия по клику 

  elementContainer.prepend(cloneCard); //добавляем элемент в контейнер
}

initialCards.forEach(addElementContainer); //по каждому элементу массива проходится функция (6 раз) 
  
//добавляем новые карточки

const namePic = addContainer.querySelector('#namePic');//название картинки в форме
const linkPic = addContainer.querySelector('#link');//ссылка на картинку в форме
function formSubmitPic(evt){ //функция добавления нового элемента
  const newCard = {name: namePic.value, link: linkPic.value};
  evt.preventDefault();
  addElementContainer(newCard);
  closePopup(popupAdd); //закрываем Попап добавления картинок-элементов
}
addContainer.addEventListener('submit', formSubmitPic);// задействуем форму добавления элемента по клику
