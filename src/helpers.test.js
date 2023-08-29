import {
  filterCountries,
  filterCountriesByPopulation,
  sortCountriesByName,
  limitCountries,
  combinedFilter
} from './helpers';

const mockCountries = [
  { name: { common: 'Aland' }, population: 30000 },
  { name: { common: 'Zimbabwe' }, population: 15000000 },
  { name: { common: 'India' }, population: 1300000000 },
  { name: { common: 'Canada' }, population: 37000000 },
];

describe('helpers', () => {

  test('filterCountries', () => {
    const result = filterCountries('can', mockCountries);
    expect(result).toEqual([{ name: { common: 'Canada' }, population: 37000000 }]);
  });

  test('filterCountriesByPopulation', () => {
    const result = filterCountriesByPopulation(1, mockCountries);
    expect(result).toEqual([{ name: { common: 'Aland' }, population: 30000 }]);
  });

  test('sortCountriesByName ascend', () => {
    const result = sortCountriesByName('ascend', mockCountries);
    expect(result[0].name.common).toBe('Aland');
    expect(result[result.length - 1].name.common).toBe('Zimbabwe');
  });

  test('sortCountriesByName descend', () => {
    const result = sortCountriesByName('descend', mockCountries);
    expect(result[0].name.common).toBe('Zimbabwe');
    expect(result[result.length - 1].name.common).toBe('Aland');
  });

  test('limitCountries', () => {
    const result = limitCountries(2, mockCountries);
    expect(result.length).toBe(2);
  });

  test('combinedFilter', () => {
    const result = combinedFilter('ca', 1000, 'ascend', 3, mockCountries);
    expect(result).toEqual([
      { name: { common: 'Canada' }, population: 37000000 }
    ]);
  });

});