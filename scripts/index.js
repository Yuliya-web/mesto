let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let container = popup.querySelector('.popup__container');
let closeButton = container.querySelector('.popup__close-button');
let name = container.querySelector('#Name');
let about = container.querySelector('#About');
let nameProfile = profile.querySelector('.profile__title');
let aboutProfile = profile.querySelector('.profile__subtitle');

function openPopup(){
  popup.classList.add('popup_opened');
  name.value = nameProfile.textContent;
  about.value = aboutProfile.textContent;
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt){
  evt.preventDefault();
  nameProfile.textContent = name.value;
  aboutProfile.textContent = about.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
container.addEventListener('submit', formSubmitHandler);