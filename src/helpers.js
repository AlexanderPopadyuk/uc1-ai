export function filterCountries(searchTerm, countries) {
  return countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
export function filterCountriesByPopulation(maxPopulationInMillions, countries) {
  const maxPopulation = maxPopulationInMillions ? maxPopulationInMillions * 1_000_000 : Infinity;
  return countries.filter(country =>
    country.population < maxPopulation
  );
}
export function sortCountriesByName(order, countries) {
  return countries.slice().sort((a, b) => {
    if (order === 'ascend') {
      return a.name.common.localeCompare(b.name.common);
    } else if (order === 'descend') {
      return b.name.common.localeCompare(a.name.common);
    } else {
      return 0;
    }
  });
}
export function limitCountries(limit, countries) {
  return limit ? countries.slice(0, limit) : countries;
}
export function combinedFilter(searchTerm, maxPopulationInMillions, order, limit, countries) {
  return limitCountries(
    limit,
    sortCountriesByName(
      order,
      filterCountriesByPopulation(
        maxPopulationInMillions,
        filterCountries(searchTerm, countries)
      )
    )
  );
}