import '../pages/index.css';
import {
  initialCards
} from './components/initial-сards';
//валидация
import {
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  disableButton,
  enableButton,
  toggleButtonState,
  setEventListeners,
  enableValidation
} from './components/validate'
// import {config} from'./components/validate';
//модальные окна

//карточки
import {
  openPopup,
  closePopup,
  openPhotoPopup
} from './components/modal';
import {
  createElement
} from './components/card';




const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileEditPopup = document.querySelector('.popup_edit');
const newName = profileEditPopup.querySelector('.popup__input_name');
const newDescription = profileEditPopup.querySelector('.popup__input_description');
const cardAddPopup = document.querySelector('.popup_add-photo')
const cardDescription = cardAddPopup.querySelector('.popup__input_card-name');
const cardLink = cardAddPopup.querySelector('.popup__input_card-link');
const popupCloseButton = document.querySelectorAll('.popup__button-close');
const photoPopup = document.querySelector('.popup_zoom');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',

}
enableValidation(validationConfig);



popupCloseButton.forEach(popup => {
  popup.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')))
});

//закрытие попапа кликом на оверлей
document.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup_opened')){
    closePopup(evt.target.closest('.popup'))
  }
});
//закрытие попапа нажатием на esc
document.addEventListener('keydown', (evt) => {
  if (evt.key == "Escape" ) {
    closePopup(cardAddPopup)
    closePopup(profileEditPopup)
    closePopup(photoPopup)
  }
});

// редактирование профиля
profileButtonEdit.addEventListener('click', () => {
  openPopup(profileEditPopup);
  newName.value = profileName.textContent;
  newDescription.value = profileDescription.textContent;
});

profileEditPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = newName.value;
  profileDescription.textContent = newDescription.value;
  closePopup(profileEditPopup)
});

//разметка, удаление, лайк, увеличение


function addCards(card) {
  document.querySelector('.elements__list').prepend(createElement(card));
}

function launch() {
  initialCards.forEach(card => {
    addCards(card)
  })
}
launch();

//добавление карточки
profile.querySelector('.profile__button-plus').addEventListener('click', () => openPopup(cardAddPopup));
cardAddPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  const card = {
    name: cardDescription.value,
    link: cardLink.value
  }
  addCards(card);

  closePopup(cardAddPopup);
  cardDescription.value = '';
  cardLink.value = '';
});
