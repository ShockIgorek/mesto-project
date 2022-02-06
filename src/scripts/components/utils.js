let cards = []

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '5502817d-dfaa-490b-a84a-6a16353d0f1d',
    "Content-Type": "application/json",
  }

};





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
