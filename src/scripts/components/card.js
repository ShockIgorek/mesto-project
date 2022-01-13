// функции для работы с карточками
import {openPhotoPopup} from './modal'
const createElement = (card) => {
  const cardCreation = document.querySelector('.card').content;
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

export {createElement}
