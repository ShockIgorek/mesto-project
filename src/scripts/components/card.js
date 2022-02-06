// функции для работы с карточками
import {
  openPhotoPopup
} from './modal'
import {
  deleteCard,
  pathLikes,
  deleteLikes,
} from './api'


export const createElement = (name, link, id ,likes, myLike, myCard) => {
  const cardCreation = document.querySelector('.card').content;
  const element = cardCreation.querySelector('.element').cloneNode(true);
  const cardImage = element.querySelector('.element__photo');
  const buttonLike = element.querySelector('.element__button-like');
  const buttonDelete = element.querySelector('.element__button-delete');
  const cardName = element.querySelector('.element__text');
  if (!myCard) {
    buttonDelete.disabled = true;
  }
  if (myLike) {
    buttonLike.classList.add('element__button-like_active')
  }
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  buttonLike.textContent = likes;
  //удаление
  buttonDelete.addEventListener('click', (evt) => {
    deleteCard(id).then(() => {evt.target.closest('.element').remove()}).catch(err => console.log(err))
  });
  //лайк
  buttonLike.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('element__button-like_active')) {
      pathLikes(id)
        .then((res) => {
          evt.target.classList.toggle('element__button-like_active');
          evt.target.textContent = res.likes.length;
        })
        .catch(err => console.log(err))
    } else {
      deleteLikes(id)
        .then((res) => {
          evt.target.textContent = res.likes.length;
          evt.target.classList.toggle('element__button-like_active');
        })
        .catch(err => console.log(err))
    }
  });
  //увеличение
  cardImage.addEventListener('click', () => openPhotoPopup(name, link));
  return element;
}

