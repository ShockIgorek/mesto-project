export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '5502817d-dfaa-490b-a84a-6a16353d0f1d',
    "Content-Type": "application/json",
  }

};
const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
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
