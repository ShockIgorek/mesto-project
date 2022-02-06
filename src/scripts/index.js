//Дорогой ревьюер , у меня нету бага с белым аватаром... может кроссбраузерность какая-то,
//или картинка которую ты хочешь поставить не хочет грузится


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
  createElement,
} from './components/card';
//api
import {
  getCards,
  postCard,
  pathNewName,
  getInfo,
  postPhoto
} from './components/api'
//константы
import {
  profileName,
  profileDescription,
  profileButtonEdit,
  profileButtonPlus,
  profileButtonPhotoEdit,
  profilePhotoEditPopup,
  newPhoto,
  profileEditPopup,
  newNameInput,
  newDescription,
  cardAddPopup,
  cardDescription,
  cardLink,
  popupCloseButtons,
  addCardSubmitButton,
  elementsList,
  cardAddPopupForm,
  profileEditPopupForm,
  profileEditPopupButton,
  profilePhotoEditPopupForm,
  profilePhotoEditPopupButton,
  validationConfig
} from './components/constants'


//валидация
enableValidation(validationConfig);
popupCloseButtons.forEach(popup => {
  popup.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')))
});


function getUserInfo() {
  return getInfo().then((result) => {
    let info = []
    info[0] = result.name;
    info[1] = result.about;
    info[2] = result._id;
    info[3] = result.avatar;
    return info;
  }).catch(error => {
    console.log(error)
  })
}


Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData[0];
    profileDescription.textContent = userData[1];
    profileButtonPhotoEdit.style = `background-image: url(${userData[3]})`
    for (let i = cards.length - 1; i >= 0; i--) {
      const myLike = Boolean(cards[i].likes.find(user => user._id === userData[2]));
      const myCard = Boolean(cards[i].owner._id === userData[2])
      elementsList.prepend(createElement(
        cards[i].name,
        cards[i].link,
        cards[i]._id,
        cards[i].likes.length,
        myLike,
        myCard))
    }
    return userData[2];
  }).catch(err => {
    console.log(err)
  });


//добавление карточки
profileButtonPlus.addEventListener('click', () => openPopup(cardAddPopup));
cardAddPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCardSubmitButton.textContent = 'Сохранение...'
  postCard(cardDescription.value, cardLink.value)
    .then((result) => {
      elementsList.prepend(
        createElement(
          result.name,
          result.link,
          result._id,
          undefined,
          undefined,
          true
        )
      );
      closePopup(cardAddPopup);
      cardDescription.value = '';
      cardLink.value = '';
      addCardSubmitButton.disabled = true;
      addCardSubmitButton.classList.add('popup__button_disabled');
    })
    .catch(err => console.log(err)).finally(() => {
      addCardSubmitButton.textContent = 'Создать';
    })
});
//изменение профиля
profileButtonEdit.addEventListener('click', () => {
  openPopup(profileEditPopup);
  newNameInput.value = profileName.textContent;
  newDescription.value = profileDescription.textContent;
});

profileEditPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileEditPopupButton.textContent = 'Сохранение...'
  pathNewName().then((result) => {
    console.log(result)
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileEditPopupButton.disabled = true;
    closePopup(profileEditPopup)
  }).catch(err => console.log(err)).finally(() => {
    profileEditPopupButton.textContent = 'Сохранить';
  })
});

//редактирование фотографии профиля

profileButtonPhotoEdit.addEventListener('click', () => {
  openPopup(profilePhotoEditPopup);
})

profilePhotoEditPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profilePhotoEditPopupButton.textContent = 'Сохранение...'
  postPhoto(newPhoto.value).then(result => {
    profileButtonPhotoEdit.style = `background-image: url(${result.avatar})`;
    newPhoto.value = '';
    profilePhotoEditPopupButton.disabled = true;
    closePopup(profilePhotoEditPopup);
  })
  .catch(err => console.log(err))
  .finally(() => {
    profilePhotoEditPopupButton.textContent = 'Сохранить';
  })
});
