// работа модальных окон
const openPopup = (selector) => {
  selector.classList.add('popup_opened')
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}
const openPhotoPopup = (card) => {
  const photoPopup = document.querySelector('.popup_zoom');
  photoPopup.querySelector('.popup-full-screen__photo').src = card.link;
  photoPopup.querySelector('.popup-full-screen__description').textContent = card.name;
  openPopup(photoPopup);
}



export {
  openPopup,
  closePopup,
  openPhotoPopup
}
