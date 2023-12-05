import Notiflix from 'notiflix';

const selectCat = document.querySelector('.breed-select');
const loadCat = document.querySelector('.loader');
const errorCat = document.querySelector('.error');
const infoCat = document.querySelector('.cat-info');

infoCat.style.display = 'flex';
infoCat.style.gap = '20px';
infoCat.style.fontFamily = 'Arial';
infoCat.style.backgroundColor = '#E7EAEF';
infoCat.style.padding = '10px';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

selectCat.style.visibility = 'hidden';
errorCat.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    selectCat.style.visibility = 'visible';
    loadCat.style.visibility = 'hidden';
    console.log(breeds);

    const breedCats = breeds
      .map(
        breed => `
    <option value="${breed.id}">${breed.name}</option>
    `
      )
      .join('');

    selectCat.insertAdjacentHTML('beforeend', breedCats);
  })
  .catch(err => {
    loadCat.style.visibility = 'hidden';

    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

selectCat.addEventListener('change', handleChange);
function handleChange() {
  const selectedBreedId = selectCat.value;

  infoCat.innerHTML = '';

  // loadCat.style.visibility = 'visible';
  Notiflix.Notify.info('Loading data, please wait...');

  fetchCatByBreed(selectedBreedId)
    .then(breeds => {
      loadCat.style.visibility = 'hidden';

      const data = breeds[0];
      console.log(data);
      infoCat.innerHTML = `
        <div><img src="${data.url}" alt="${data.breeds[0].name}" width ="600px"/></div>
        <div>
        <h3>${data.breeds[0].name}</h3>
        <p>${data.breeds[0].description}</p>
        <h4>Temperament</h4>
        <p>${data.breeds[0].temperament}</p>
        </div>
        `;
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
// --------------------------------------------------------------------

// infoCat.insertAdjacentHTML('beforeend', createMarkup(data.results));

// function createMarkup(arr) {
//   arr
//     .map(
//       ({ imageUrl, name, description, temperament }) => `
//   <img src="${imageUrl}" alt="${name}" width="600px">
//   <div>
//        <h3>${name}</h3>
//        <p>${description}</p>
//        <h4>Temperament</h4>
//        <p>${temperament}</p>
//   </div>
//   `
//     )
//     .join('');
// }
