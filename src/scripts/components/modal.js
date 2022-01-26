// работа модальных окон
const openPopup = (selector) => {
  selector.classList.add('popup_opened')
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}
const openPhotoPopup = (card) => {
  const photoPopup = document.querySelector('.popup_zoom');
  const fullScreen = photoPopup.querySelector('.popup-full-screen__photo');
  const description = photoPopup.querySelector('.popup-full-screen__description')
  fullScreen.src = card.link;
  fullScreen.alt = card.name;
  description.textContent = card.name;
  openPopup(photoPopup);
}

export {
  openPopup,
  closePopup,
  openPhotoPopup
}
