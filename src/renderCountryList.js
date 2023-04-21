function renderCountryList(countries, countryList, countryInfo) {
  const markup = countries
    .map(country => {
      return `<li class='country-list-item'><img src='${country.flags.svg}' alt='${country.flags.alt} width='20' height='20' /> <h3>${country.name.official} </h3></li>`;
    })
    .join('');
  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
}

export { renderCountryList };
