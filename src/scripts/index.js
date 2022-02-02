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
import {config} from './components/api'


const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonPlus = profile.querySelector('.profile__button-plus');
const profileEditPopup = document.querySelector('.popup_edit');
const newName = profileEditPopup.querySelector('.popup__input_name');
const newDescription = profileEditPopup.querySelector('.popup__input_description');
const cardAddPopup = document.querySelector('.popup_add-photo')
const cardDescription = cardAddPopup.querySelector('.popup__input_card-name');
const cardLink = cardAddPopup.querySelector('.popup__input_card-link');
const popupCloseButtons = document.querySelectorAll('.popup__button-close');
const addCardSubmitButton = document.querySelector('.popup__add-button')
const elementsList = document.querySelector('.elements__list')
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
}

enableValidation(validationConfig);
popupCloseButtons.forEach(popup => {
  popup.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')))
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
  elementsList.prepend(createElement(card));
}


const renderCards = () => {
  Cards.forEach(card => {
    addCards(card)
  })
}


//добавление карточки
profileButtonPlus.addEventListener('click', () => openPopup(cardAddPopup));
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
  addCardSubmitButton.disabled = true;
  addCardSubmitButton.classList.add('popup__button_disabled');

});







//получение карточек
let Cards = []

fetch(config.baseUrl, {headers: config.headers})
  .then(res => res.json())
  .then((result) => {
    console.log(result)
    for (let i = 0; i < result.length; i++) {
      Cards[i] = {
        name: result[i].name,
        link: result[i].link
      }
    }
    renderCards();
  });
