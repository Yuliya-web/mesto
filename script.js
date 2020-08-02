let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let container = popup.querySelector('.popup__container');
let closeButton = container.querySelector('.popup__close-button');
let saveButton = container.querySelector('.popup__save-button');
let Name = container.querySelector('#Name');
let About = container.querySelector('#About');
let nameProfile = profile.querySelector('.profile__title');
let aboutProfile = profile.querySelector('.profile__subtitle');

Name.value = 'Жак-Ив Кусто';
About.value = 'Исследователь океана';

function openPopup(){
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);

function closePopup(){
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

function formSubmitHandler(evt){
  evt.preventDefault();
  let Name = container.querySelector('#Name');
  let About = container.querySelector('#About');
  nameProfile.textContent = Name.value;
  aboutProfile.textContent = About.value;
  popup.classList.remove('popup_opened');
}

container.addEventListener('submit', formSubmitHandler);