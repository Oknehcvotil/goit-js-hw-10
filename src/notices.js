import { Notify } from 'notiflix/build/notiflix-notify-aio';

function onNotice(countryList, countryInfo) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function onError(countryList, countryInfo) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  Notify.failure('Oops, there is no country with that name');
}

export { onNotice, onError };
