//Дорогой ревьюер, сейчас открыв проект у меня был вместо аватара белый фон, я поставил свой и он благополучно остался...

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



Promise.all([getInfo(), getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileButtonPhotoEdit.style = `background-image: url(${userData.avatar})`
    for (let i = cards.length - 1; i >= 0; i--) {
      const myLike = Boolean(cards[i].likes.find(user => user._id === userData._id));
      const myCard = Boolean(cards[i].owner._id === userData._id)
      elementsList.prepend(createElement(
        cards[i].name,
        cards[i].link,
        cards[i]._id,
        cards[i].likes.length,
        myLike,
        myCard))
    }
    return userData._id;
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

  pathNewName(newNameInput.value, newDescription.value).then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileEditPopupButton.disabled = true;
    profileEditPopupButton.classList.add('popup__button_disabled');
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
    profilePhotoEditPopupButton.classList.add('popup__button_disabled');
    closePopup(profilePhotoEditPopup);
  })
  .catch(err => console.log(err))
  .finally(() => {
    profilePhotoEditPopupButton.textContent = 'Сохранить';
  })
});
