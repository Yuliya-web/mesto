const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const container = popup.querySelector('.popup__container');
const closeButton = container.querySelector('.popup__close-button');
const name = container.querySelector('#Name');
const about = container.querySelector('#About');
const nameProfile = profile.querySelector('.profile__title');
const aboutProfile = profile.querySelector('.profile__subtitle');

const popupAdd = document.querySelector('.add-popup');
const addButton = profile.querySelector('.profile__add-button');
const addContainer = popupAdd.querySelector('.add-popup__container');
const namePic = addContainer.querySelector('#namePic');
const linkPic = addContainer.querySelector('#link');
const closeButtonPic = addContainer.querySelector('.add-popup__close-button');
const elementContainer = document.querySelector('.elements');

const popupPic = document.querySelector('.pic-popup');

function openPopup(){
  popup.classList.add('popup_opened');
  name.value = nameProfile.textContent;
  about.value = aboutProfile.textContent;
}
function openPopupAdd(){
  popupAdd.classList.add('add-popup_opened');
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

function closePopupAdd(){
  popupAdd.classList.remove('add-popup_opened');
}

function formSubmitHandler(evt){
  evt.preventDefault();
  nameProfile.textContent = name.value;
  aboutProfile.textContent = about.value;
  closePopup();
}


const initialCards = [
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
 
const addElementContainer = element => {
  const addElement = document.querySelector('#element').content.cloneNode(true);
  addElement.querySelector('.element__image').src = element.link;
  addElement.querySelector('.element__title').textContent = element.name;  

  let likeButton = addElement.querySelector('.element__like');
  function likeBtn(evt){  
    evt.target.classList.toggle('element__like_active');
  }
  likeButton.addEventListener('click', likeBtn);

  let delButton = addElement.querySelector('.element__delete-card');
  const elementCard = addElement.querySelector('.element');
  function deleteElement(){ 
    elementCard.classList.add('element_non-display');
  }
  delButton.addEventListener('click', deleteElement);

  const picture = addElement.querySelector('.element__image');
  function openPopupPic(){
    popupPic.classList.add('pic-popup_opened');
    popupPic.querySelector('.pic-popup__content').src = picture.src;
    popupPic.querySelector('.pic-popup__name').textContent = element.name;
  }
  picture.addEventListener('click', openPopupPic);

  const closePicBtn = popupPic.querySelector('.pic-popup__close-button');
  function closePopupPic(){
    popupPic.classList.remove('pic-popup_opened');
  }
  closePicBtn.addEventListener('click', closePopupPic);

  elementContainer.append(addElement); 
}
 
initialCards.forEach(addElementContainer);
  
function formSubmitPic(evt){
  evt.preventDefault();
  const newCard = document.querySelector('#element').content.cloneNode(true);
  newCard.querySelector('.element__image').src = linkPic.value;
  newCard.querySelector('.element__title').textContent = namePic.value;
  closePopupAdd();
  
  let likeButton = newCard.querySelector('.element__like');
  function likeBtn(evt){  
  evt.target.classList.toggle('element__like_active');
  }
  likeButton.addEventListener('click', likeBtn);

  let delButton = newCard.querySelector('.element__delete-card');
  const elementCard = newCard.querySelector('.element');
  function deleteElement(evt){ 
    elementCard.classList.add('element_non-display');
  }
  delButton.addEventListener('click', deleteElement);

  const picture = newCard.querySelector('.element__image');
  function openPopupPic(){
    popupPic.classList.add('pic-popup_opened');
    popupPic.querySelector('.pic-popup__content').src = picture.src;
    popupPic.querySelector('.pic-popup__name').textContent = namePic.value;
  }
  picture.addEventListener('click', openPopupPic);

  const closePicBtn = popupPic.querySelector('.pic-popup__close-button');
  function closePopupPic(){  
    popupPic.classList.remove('pic-popup_opened');
  }
  closePicBtn.addEventListener('click', closePopupPic);

  elementContainer.prepend(newCard);
}
addContainer.addEventListener('submit', formSubmitPic);

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
container.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', openPopupAdd);
closeButtonPic.addEventListener('click', closePopupAdd);




