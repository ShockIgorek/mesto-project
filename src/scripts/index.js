//css
import '../pages/index.css';
//валидация
import {
  enableValidation
} from './components/validate'
//работа модальных окон
import {
  openPopup,
  closePopup,
} from './components/modal';
//карточки
import {
  createElement
} from './components/card';
//api
import {cards,
  postCard,
  getAppInfo,
  getPhoto,
  pathNewName,
  postPhoto,getCards
} from './components/api'


const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonPlus = profile.querySelector('.profile__button-plus');
const profileButtonPhotoEdit = profile.querySelector('.profile__avatar');
const profilePhotoEditPopup = document.querySelector('.popup-edit-avatar')
const newPhoto = profilePhotoEditPopup.querySelector('.popup-avatar')
const profileEditPopup = document.querySelector('.popup_edit');
const newName = profileEditPopup.querySelector('.popup__input_name');
const newDescription = profileEditPopup.querySelector('.popup__input_description');
const cardAddPopup = document.querySelector('.popup_add-photo')
const cardDescription = cardAddPopup.querySelector('.popup__input_card-name');
const cardLink = cardAddPopup.querySelector('.popup__input_card-link');
const popupCloseButtons = document.querySelectorAll('.popup__button-close');
const addCardSubmitButton = document.querySelector('.popup__add-button');
const elementsList = document.querySelector('.elements__list');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
}
//валидация
enableValidation(validationConfig);
popupCloseButtons.forEach(popup => {
  popup.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')))
});

//редактирование профиля
profileButtonEdit.addEventListener('click', () => {
  openPopup(profileEditPopup);
  newName.value = profileName.textContent;
  newDescription.value = profileDescription.textContent;
});

profileEditPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileEditPopup.querySelector('.popup__button').textContent = 'Сохранение...'
  profileName.textContent = newName.value;
  profileDescription.textContent = newDescription.value;
  pathNewName();
  getAppInfo();
  closePopup(profileEditPopup)
});

//редактирование фото профиля
profileButtonPhotoEdit.addEventListener('click', () => {
  openPopup(profilePhotoEditPopup);
  console.log('был клик')
})
profilePhotoEditPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  profilePhotoEditPopup.querySelector('.popup__button').textContent = 'Сохранение...'
  postPhoto(newPhoto.value);
  getAppInfo()
  newPhoto.value = '';
});


function addCards(card) {
  elementsList.prepend(createElement(card));
}

//отрисовка карточек полученных с сервера
const renderCards = () => {
  cards.reverse().forEach(card => {
    addCards(card)
  })
}
//добавление карточки
profileButtonPlus.addEventListener('click', () => openPopup(cardAddPopup));
cardAddPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  const card = {
    name: cardDescription.value,
    link: cardLink.value,
    //созданная мной карточка может удалятся
    myCard: true,
    id: postCard(cardDescription.value, cardLink.value)
  }
  cardAddPopup.querySelector('.popup__button').textContent = 'Сохранение...'
  addCards(card);
  getAppInfo();
  cardDescription.value = '';
  cardLink.value = '';
  addCardSubmitButton.disabled = true;
  addCardSubmitButton.textContent = 'Создать'
  addCardSubmitButton.classList.add('popup__button_disabled');
});


getAppInfo()
  .then(() => {
    renderCards()
  })
  .catch(err => console.log(err));
