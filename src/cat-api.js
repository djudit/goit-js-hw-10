import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_41ZLKc6w55aKAhNKcvazVK7pSDRpFwv5hmBkV3y3mU9I8HjFpMwjMfY85hbt4uCy';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(resp => resp.data)
    .catch(err => {
      console.log(err);
      throw new Error(err);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => resp.data)
    .catch(err => {
      console.log(err);
      throw new Error(err);
    });
}

export { fetchBreeds, fetchCatByBreed };
