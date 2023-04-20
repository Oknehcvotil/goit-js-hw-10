import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const inputValue = refs.searchForm.value.trim();

  if (!inputValue) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 1 && countries.length <= 10) {
        renderCountryList(countries);
      } else if (countries.length === 1) {
        renderCountryCard(countries);
      } else if (countries.length > 10) {
        onInfo();
      }
    })
    .catch(onError);
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li class='country-list-item'><img src='${country.flags.svg}' alt='${country.flags.alt} width='20' height='20' /> <h3>${country.name.official} </h3></li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
  refs.countryInfo.innerHTML = '';
}

function renderCountryCard(countries) {
  refs.countryList.innerHTML = `<li class='country-list-item'><img src='${countries[0].flags.svg}' alt='${countries[0].flags.alt} width='20' height='20' /> <h3>${countries[0].name.official} </h3></li>`;

  refs.countryInfo.innerHTML = `<p>Capital: ${countries[0].capital}</p>
      <p>Population: ${countries[0].population}</p>
      <p>Languages: ${Object.values(countries[0].languages).join(', ')}</p>`;
}

function onInfo() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function onError() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  Notify.failure('Oops, there is no country with that name');
}
