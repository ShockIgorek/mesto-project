
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '5502817d-dfaa-490b-a84a-6a16353d0f1d',
    "Content-Type": "application/json",
  }
};


export const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export function pathLikes(id) {
  return fetch(config.baseUrl + '/cards/likes/' + id, {
    method: 'PUT',
    headers: config.headers,
  }).then(res => getResponseData(res))
}


export function deleteCard(id) {
  return fetch(config.baseUrl + '/cards/' + id, {
    method: 'DELETE',
    headers: config.headers,
  }).then(res => getResponseData(res))
}

export function getCards() {
  return fetch(config.baseUrl + '/cards', {
    headers: config.headers
  }).then(res => getResponseData(res))
}

export function postCard(card, link) {
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card,
      link: link,
    })
  }).then(res => getResponseData(res))
}

export function pathNewName(name, about) {
  return fetch(config.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => getResponseData(res))
};

export function getInfo() {
  return fetch(config.baseUrl + '/users/me', {
    headers: config.headers
  }).then(res => getResponseData(res))
}
export function postPhoto(link) {
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  }).then(res => getResponseData(res))
};

export function deleteLikes(id) {
  console.log(id)
  return fetch(config.baseUrl + '/cards/likes/' + id, {
    method: 'DELETE',
    headers: config.headers,
  }).then(res => getResponseData(res))
}

