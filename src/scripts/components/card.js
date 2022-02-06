// функции для работы с карточками
import {
  openPhotoPopup
} from './modal'
import {
  config,
  getResponseData
} from './api'


function deleteCard(id) {
  return fetch(config.baseUrl + '/cards/' + id, {
    method: 'DELETE',
    headers: config.headers,
  }).then(res => getResponseData(res)).catch(err => console.log(err))
}

function pathLikes(id) {
  return fetch(config.baseUrl + '/cards/likes/' + id, {
    method: 'PUT',
    headers: config.headers,
  }).then(res => getResponseData(res)).catch(err => console.log(err))
}

function deleteLikes(id) {
  console.log(id)
  return fetch(config.baseUrl + '/cards/likes/' + id, {
    method: 'DELETE',
    headers: config.headers,
  }).then(res => getResponseData(res)).catch(err => console.log(err))
}
const createElement = (card) => {
  const cardCreation = document.querySelector('.card').content;
  const element = cardCreation.querySelector('.element').cloneNode(true);
  const cardImage = element.querySelector('.element__photo');
  const buttonLike = element.querySelector('.element__button-like');
  const buttonDelete = element.querySelector('.element__button-delete');
  const id = card.id
  if (!card.myCard) {
    buttonDelete.disabled = true;
  }
  if (card.myLikes) {
    buttonLike.classList.add('element__button-like_active')
  }
  cardImage.src = card.link;
  cardImage.alt = card.name;
  buttonLike.textContent = card.likes;
  element.querySelector('.element__text').textContent = card.name;
  //удаление
  buttonDelete.addEventListener('click', (evt) => {
    deleteCard(id).then(() => {evt.target.closest('.element').remove()}).catch(err => console.log(err))
  });
  //лайк
  buttonLike.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('element__button-like_active')) {
      pathLikes(id)
        .then((res) => {
          console.log(res)
          evt.target.classList.toggle('element__button-like_active');
          evt.target.textContent = Number(evt.target.textContent) + 1
        })
        .catch(err => console.log(err))
    } else {
      deleteLikes(id)
        .then((res) => {
          console.log(res)
          evt.target.textContent = Number(evt.target.textContent) - 1
          evt.target.classList.toggle('element__button-like_active')
        })
        .catch(err => console.log(err))
    }
  });
  //увеличение
  cardImage.addEventListener('click', () => openPhotoPopup(card));
  return element;
}




export {
  createElement
}
