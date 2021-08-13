const profile = document.querySelector('.profile');
//информация о пользователе
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
//кнопка редактирования
const profileButtonEdit = profile.querySelector('.profile__button-edit');
//popup редактирования профиля
const profileEditPopup = document.querySelectorAll('.popup')[0];
const newName = profileEditPopup.querySelectorAll('.popup__input')[0];
const newDescription = profileEditPopup.querySelectorAll('.popup__input')[1];
//popup добавления карточек
const cardAddPopup = document.querySelectorAll('.popup')[1]
const cardDescription = cardAddPopup.querySelectorAll('.popup__input')[0];
const cardLink = cardAddPopup.querySelectorAll('.popup__input')[1];
//popup для увеличения фотографий
const photoPopup = document.querySelectorAll('.popup')[2];
//карточка
const cardCreation = document.querySelector('.card').content;
//6 карточек
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//открытие и закрытие попапов
function openPopup(selector) {
  selector.classList.add('popup_opened')
}

function select(selector) {
  selector.classList.remove('popup_opened')
}

function closePupup() {
  document.querySelectorAll('.popup__button-close').forEach(popup => {
    popup.addEventListener('click', (evt) => select(evt.target.closest('.popup')))
  })
}
closePupup();
// редактирование профиля
console.log(newName, newDescription)

profileButtonEdit.addEventListener('click', () => {
  openPopup(profileEditPopup);
  newName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
})
profileEditPopup.querySelector('.popup__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = newName.value;
  profileDescription.textContent = newDescription.value;
  select(profileEditPopup)
})
//разметка, удаление, лайк, увеличение
function createElement(card) {
  const element = cardCreation.querySelector('.element').cloneNode(true);
  element.querySelector('.element__photo').src = card.link;
  element.querySelector('.element__text').textContent = card.name;
  //удаление
  element.querySelector('.element__button-delete').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove()
  })
  //лайк
  element.querySelector('.element__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active')
  })
  //увеличение
  element.querySelector('.element__photo').addEventListener('click', () => openPhotoPopup(card))
  return element;
}

function openPhotoPopup(card) {
  photoPopup.querySelector('.popup-full-screen__photo').src = card.link;
  photoPopup.querySelector('.popup-full-screen__description').textContent = card.name;
  openPopup(photoPopup);
}



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
  select(cardAddPopup);
})
