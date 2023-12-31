import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAlbums = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/album.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteAlbum = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/album/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateAlbum = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/album/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createAlbum = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/album.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleAlbum = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/album/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAlbums,
  deleteAlbum,
  updateAlbum,
  createAlbum,
  getSingleAlbum,
};
