let cards = []

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '5502817d-dfaa-490b-a84a-6a16353d0f1d',
    "Content-Type": "application/json",
  }

};

function pathLikes(id) {
  fetch(config.baseUrl + '/cards/likes/' + id, {
    method: 'PUT',
    headers: config.headers,
  })

}
function deleteLikes(id) {
  fetch(config.baseUrl + '/cards/likes/' + id, {
    method: 'DELETE',
    headers: config.headers,
  })
}

function updateLikes(id) {
  fetch(config.baseUrl + '/cards/likes/' + id, {
      headers: config.headers
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result)
    })

}
function postCard(card, link) {
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

function deleteCard(id) {
  fetch(config.baseUrl + '/cards/' + id, {
    method: 'DELETE',
    headers: config.headers,
  })
}

function getName() {
  fetch(config.baseUrl + '/users/me', {
      headers: config.headers
    })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name;
      profileDescription.textContent = result.about;
    })
}

function checkMyLike(result ,index) {
  for (let i = 0; i < Object(result[index].likes).length; i++) {
    if (Object(result[index].likes[i]).name === getName()) {
      return true;
    }
  }
}
function checkMyCard(result, index) {
  if (Object(result[index].owner).name === getName()) {
    return true;
  }
}

const getCards= () => {
  return fetch(config.baseUrl + '/cards', {
      headers: config.headers
    }).then(res => getResponseData(res))
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




function pathNewName() {
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

function postPhoto(link) {
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
