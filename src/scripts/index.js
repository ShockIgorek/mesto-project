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
const getCards = () => {
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
cardAddPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  cardAddPopup.querySelector('.popup__button').textContent = 'Сохранение...'
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



console.log(getCards())
console.log(cards)
console.log(myId)
