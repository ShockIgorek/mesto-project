// работа модальных окон
const photoPopup = document.querySelector('.popup_zoom');
const fullScreen = photoPopup.querySelector('.popup-full-screen__photo');
const description = photoPopup.querySelector('.popup-full-screen__description');
//закртие попапа кликом на оверлей
function closeByOverlay (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target)
  }
};
//закртие попапа кликом на esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  }
}
const openPopup = (selector) => {
  selector.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('mousedown', closeByOverlay);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape)
  document.removeEventListener('mousedown', closeByOverlay);
}


const openPhotoPopup = (name, link) => {
  fullScreen.src = link;
  fullScreen.alt = name;
  description.textContent = name;
  openPopup(photoPopup);
}

export {
  openPopup,
  closePopup,
  openPhotoPopup,
  closeByEscape
}
