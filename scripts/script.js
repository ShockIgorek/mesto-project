//прошу прощения в прошлый раз случайно отправил код на проверку пока читал коментарий(смотрел с телефона случайно клацанул).

const profile = document.querySelector('.profile');
//информация о пользователе
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
//кнопка редактирования
const profileButtonEdit = profile.querySelector('.profile__button-edit');
//popup редактирования профиля
const profileEditPopup = document.querySelector('.popup_edit');
const newName = profileEditPopup.querySelector('.popup__input_name');
const newDescription = profileEditPopup.querySelector('.popup__input_description');
//popup добавления карточек
const cardAddPopup = document.querySelector('.popup_add-photo')
const cardDescription = cardAddPopup.querySelector('.popup__input_card-name');
const cardLink = cardAddPopup.querySelector('.popup__input_card-link');
//popup для увеличения фотографий
const photoPopup = document.querySelector('.popup_zoom');
//карточка
const cardCreation = document.querySelector('.card').content;
//кнопки закрытия
const popupCloseButton = document.querySelectorAll('.popup__button-close');
//6 карточек перенесены в файл initial-cards.js



//открытие и закрытие попапов
function openPopup(selector) {
  selector.classList.add('popup_opened')
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

popupCloseButton.forEach(popup => {
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
function createElement(card) {
  const element = cardCreation.querySelector('.element').cloneNode(true);
  element.querySelector('.element__photo').src = card.link;
  element.querySelector('.element__text').textContent = card.name;
  //удаление
  element.querySelector('.element__button-delete').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove()
  });
  //лайк
  element.querySelector('.element__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active')
  });
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

  closePopup(cardAddPopup);
  cardDescription.value = '';
  cardLink.value = '';
});
