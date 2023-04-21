function renderCountryCard(countries, countryList, countryInfo) {
  countryList.innerHTML = `<li class='country-list-item'><img src='${countries[0].flags.svg}' alt='${countries[0].flags.alt} width='20' height='20' /> <h3>${countries[0].name.official} </h3></li>`;

  countryInfo.innerHTML = `<p>Capital: ${countries[0].capital}</p>
      <p>Population: ${countries[0].population}</p>
      <p>Languages: ${Object.values(countries[0].languages).join(', ')}</p>`;
}

export { renderCountryCard };
