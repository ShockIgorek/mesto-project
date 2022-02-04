import {
  closePopup
} from './modal'
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const profileButtonPhotoEdit = profile.querySelector('.profile__avatar');
const profilePhotoEditPopup = document.querySelector('.popup-edit-avatar');
const profileEditPopup = document.querySelector('.popup_edit');
const newName = profileEditPopup.querySelector('.popup__input_name');
const newDescription = profileEditPopup.querySelector('.popup__input_description');
export let cards = []

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '5502817d-dfaa-490b-a84a-6a16353d0f1d',
    "Content-Type": "application/json",
  }

};

export function pathLikes(id) {
  fetch(config.baseUrl + '/cards/likes/' + id, {
    method: 'PUT',
    headers: config.headers,
  })

}
export function deleteLikes(id) {
  fetch(config.baseUrl + '/cards/likes/' + id, {
    method: 'DELETE',
    headers: config.headers,
  })
}

export function updateLikes(id) {
  fetch(config.baseUrl + '/cards/likes/' + id, {
      headers: config.headers
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
    })

}
export function postCard(card, link) {
  const popup = document.querySelector('.popup_add-photo')
  fetch(config.baseUrl + '/cards', {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: card,
        link: link,
      })
    }).then(res => res.json())
    .then((result) => {
      console.log(result._id)
      closePopup(popup)
      return result
    }).catch((err => {
      console.log(err);
      closePopup(popup)
    }))
}

export function deleteCard(id) {
  fetch(config.baseUrl + '/cards/' + id, {
    method: 'DELETE',
    headers: config.headers,
  })
}

export function getName() {
  fetch(config.baseUrl + '/users/me', {
      headers: config.headers
    })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name;
      profileDescription.textContent = result.about;
    })
  return profileName.textContent
}

export function checkMyLike(result ,index) {
  for (let i = 0; i < Object(result[index].likes).length; i++) {
    if (Object(result[index].likes[i]).name === getName()) {
      return true;
    }
  }
}
export function checkMyCard(result, index) {
  if (Object(result[index].owner).name === getName()) {
    return true;
  }
}

export function getCards() {
  return fetch(config.baseUrl + '/cards', {
      headers: config.headers
    })
    .then(res => res.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        cards[i] = {
          name: result[i].name,
          link: result[i].link,
          likes: result[i].likes.length,
          id: result[i]._id,
          myLikes: checkMyLike(result, i),
          myCard: checkMyCard(result, i),
        }
      }
      return (cards)
    })
    .catch((err) => {
      console.log(err)
    })
}
//
export function getPhoto() {
  return fetch(config.baseUrl + '/users/me', {
      headers: config.headers
    })
    .then(res => res.json())
    .then((result) => {
      profileButtonPhotoEdit.style = `background-image: url(${result.avatar})`;
      closePopup(profilePhotoEditPopup);
    })
}

export const getAppInfo = () => {
  return Promise.all([getName(), getCards(), getPhoto()]);
};


export function pathNewName() {
  fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName.value,
      about: newDescription.value
    })
  }).then(() => {
      console.log('Новое имя: ' + getName())
    })
};

export function postPhoto(link) {
  fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  }).then(res => res.json()).then((res) => {
    console.log(res)
  })
};


