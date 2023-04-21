import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { renderCountryList } from './renderCountryList';
import { renderCountryCard } from './renderCountryCard';
import { onNotice, onError } from './notices';
import { refs } from './refs';

const { searchForm, countryList, countryInfo } = refs;
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const inputValue = refs.searchForm.value.trim();

  if (!inputValue) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 1 && countries.length <= 10) {
        renderCountryList(countries, countryList, countryInfo);
      } else if (countries.length === 1) {
        renderCountryCard(countries, countryList, countryInfo);
      } else if (countries.length > 10) {
        onNotice(countryList, countryInfo);
      }
    })
    .catch(() => onError(countryList, countryInfo));
}
