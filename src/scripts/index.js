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
import {
  config,
  postCard,
} from './components/api'


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
const addCardSubmitButton = document.querySelector('.popup__add-button');
const elementsList = document.querySelector('.elements__list');
const elementButtonLike = document.querySelector('.element__button-like')
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
  pathNewName()
  closePopup(profileEditPopup)
});

//разметка, удаление, лайк, увеличение


function addCards(card) {
  elementsList.prepend(createElement(card));
}


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
  }
  addCards(card);
  postCard(cardDescription.value, cardLink.value, )

  closePopup(cardAddPopup);
  cardDescription.value = '';
  cardLink.value = '';
  addCardSubmitButton.disabled = true;
  addCardSubmitButton.classList.add('popup__button_disabled');

});







//получение карточек
let cards = []


function getName() {
  fetch(config.baseUrl + '/users/me', {
      headers: config.headers
    })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name;
      profileDescription.textContent = result.about;
    })
  return profileName.textContent
}


function getCards() {
  return fetch(config.baseUrl + '/cards', {
      headers: config.headers
    })
    .then(res => res.json())
    .then((result) => {

      //проверяю есть ли мое имя в списке лайкнувыших
      for (let i = 0; i < result.length; i++) {
        function checkMyLike() {
          for (let count = 0; count < Object(result[i].likes).length; count++) {
            if (Object(result[i].likes[count]).name === getName()) {
              return true;
            }
          }
        }
        function checkMyCard() {
          if (Object(result[i].owner).name === getName()) {
            return true;
          }
        }
        cards[i] = {
          name: result[i].name,
          link: result[i].link,
          likes: result[i].likes.length,
          id: result[i]._id,
          myLikes: checkMyLike(),
          myCard: checkMyCard(),
        }
      }
      return (cards)
    })
    .catch((err) => {
      console.log(err)
    })
}


const getAppInfo = () => {
  return Promise.all([getName(), getCards()]);
};
getAppInfo()
  .then(([name, cards]) => {
    console.log(name)
    console.log(cards)
    renderCards()
  })
  .catch(err => console.log(err));





function pathNewName() {
  fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName.value,
      about: newDescription.value
    })
  })
};
