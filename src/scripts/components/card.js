// функции для работы с карточками
import {
  openPhotoPopup
} from './modal'
import {
  pathLikes,
  deleteLikes,
  updateLikes,
  deleteCard
} from './api'
const createElement = (card) => {
  const cardCreation = document.querySelector('.card').content;
  const element = cardCreation.querySelector('.element').cloneNode(true);
  const cardImage = element.querySelector('.element__photo');
  const buttonLike = element.querySelector('.element__button-like');
  const buttonDelete = element.querySelector('.element__button-delete');
  const id = card.id
  if(!card.myCard) {
    buttonDelete.disabled = true;
  }
  if(card.myLikes) {
    buttonLike.classList.add('element__button-like_active')
  }
  cardImage.src = card.link;
  cardImage.alt = card.name;
  buttonLike.textContent = card.likes;
  element.querySelector('.element__text').textContent = card.name;

  //удаление
  buttonDelete.addEventListener('click', (evt) => {
    deleteCard(id)
    evt.target.closest('.element').remove()
  });
  //лайк
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
    if (evt.target.classList.contains('element__button-like_active')) {
      pathLikes(id)
      evt.target.textContent = Number(evt.target.textContent) + 1
    } else {
      deleteLikes(id)
      evt.target.textContent = Number(evt.target.textContent) - 1
    }
    console.log(id)

  });
  //увеличение
  cardImage.addEventListener('click', () => openPhotoPopup(card))
  return element;
}




export {
  createElement
}
