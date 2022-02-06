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
  getResponseData
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
const cardAddPopupForm = cardAddPopup.querySelector('.popup__form');
const profileEditPopupForm = profileEditPopup.querySelector('.popup__form');
const profileEditPopupButton = profileEditPopup.querySelector('.popup__button');
const profilePhotoEditPopupForm = profilePhotoEditPopup.querySelector('.popup__form');
const profilePhotoEditPopupButton = profilePhotoEditPopup.querySelector('.popup__button');
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

function addCards(card) {
  elementsList.prepend(createElement(card));
}

function getInfo() {
  return fetch(config.baseUrl + '/users/me', {
      headers: config.headers
    }).then(res => getResponseData(res))
    .catch(err => console.log(err))

}

const getAppInfo = () => {
  return Promise.all([
    getInfo()
    .then((result) => {
      return result.name
    })
    .catch(err => console.log(err)),
    getInfo().then((result) => {
      return result.about
    })
    .catch(err => console.log(err)),
    getInfo()
    .then((result) => {
      return result._id
    })
    .catch(err => console.log(err)),
    getInfo()
    .then((result) => {
      return result.avatar
    })
    .catch(err => console.log(err))
  ]);
};

let myId;

const renderProfile = () => {
  return getAppInfo().then((result) => {
    profileName.textContent = result[0];
    profileDescription.textContent = result[1];
    profileButtonPhotoEdit.style = `background-image: url(${result[3]})`
    return result[2];
  }).catch((err) => console.log(err))
}

let cards = []
function getCards() {
  return fetch(config.baseUrl + '/cards', {
    headers: config.headers
  }).then(res => getResponseData(res))
}

function checkMyLike(result, index) {
  for (let i = 0; i < Object(result[index].likes).length; i++) {
    if (Object(result[index].likes[i])._id === myId) {
      return true;
    }
  }
}

function checkMyCard(result, index) {
  if (Object(result[index].owner)._id === myId) {
    return true;
  }
}

renderProfile().then((result) => {
  myId = result;
  console.log(myId);
  getCards()
    .then((result) => {
      for (let i = result.length - 1; i >= 0; i--) {
        cards[i] = {
          name: result[i].name,
          link: result[i].link,
          likes: result[i].likes.length,
          id: result[i]._id,
          myLikes: checkMyLike(result, i),
          myCard: checkMyCard(result, i),
        }
        addCards(cards[i])
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

function postCard(card, link) {
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card,
      link: link,
    })
  }).then(res => getResponseData(res)).catch(err => console.log(err))
}
//добавление карточки
profileButtonPlus.addEventListener('click', () => openPopup(cardAddPopup));
cardAddPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCardSubmitButton.textContent = 'Сохранение...'
  postCard(cardDescription.value, cardLink.value)
    .then((result) => {
      const card = {}
      card.name = result.name;
      card.link = result.link;
      card.id = result._id;
      card.myCard = true;
      addCards(card);
      closePopup(cardAddPopup);
      cardDescription.value = '';
      cardLink.value = '';
      addCardSubmitButton.textContent = 'Создать'
      addCardSubmitButton.disabled = true;
      addCardSubmitButton.classList.add('popup__button_disabled');
    })
    .catch(err => console.log(err))
});
//изменение профиля
function pathNewName() {
  return fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName.value,
      about: newDescription.value
    })
  }).then(res => getResponseData(res))
  .catch(err => console.log(err))
};

profileButtonEdit.addEventListener('click', () => {
  openPopup(profileEditPopup);
  newName.value = profileName.textContent;
  newDescription.value = profileDescription.textContent;
});

profileEditPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileEditPopupButton.textContent = 'Сохранение...'
  pathNewName().then((result) => {
    console.log(result)
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileEditPopupButton.textContent = 'Сохранить'
    closePopup(profileEditPopup)
  })
});

//редактирование фотографии профиля
function postPhoto(link) {
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  }).then(res => getResponseData(res)).catch(err => console.log(err))
};

profileButtonPhotoEdit.addEventListener('click', () => {
  openPopup(profilePhotoEditPopup);
})

profilePhotoEditPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profilePhotoEditPopupButton.textContent = 'Сохранение...'
  postPhoto(newPhoto.value).then(result => {
    profileButtonPhotoEdit.style = `background-image: url(${result.avatar})`;
    profileEditPopup.querySelector('.popup__button').textContent = 'Сохранить';
    closePopup(profilePhotoEditPopup);
  })
  newPhoto.value = '';
});



