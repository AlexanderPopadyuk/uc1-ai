import { useEffect, useState } from 'react';
import axios from 'axios';

function filterCountries(searchTerm, countries) {
  return countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
function filterCountriesByPopulation(maxPopulationInMillions, countries) {
  const maxPopulation = maxPopulationInMillions ? maxPopulationInMillions * 1_000_000 : Infinity;
  return countries.filter(country =>
    country.population < maxPopulation
  );
}
function sortCountriesByName(order, countries) {
  return countries.slice().sort((a, b) => {
    if (order === "ascend") {
      return a.name.common.localeCompare(b.name.common);
    } else if (order === "descend") {
      return b.name.common.localeCompare(a.name.common);
    } else {
      return 0;
    }
  });
}
function limitCountries(limit, countries) {
  return limit ? countries.slice(0, limit) : countries;
}
function combinedFilter(searchTerm, maxPopulationInMillions, order, limit, countries) {
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

export const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    population: '',
    order: '',
    limit: ''
  });
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    // Fetch data from the API using axios
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const result = combinedFilter(
      formData.name,
      formData.population ? parseFloat(formData.population) : undefined,
      formData.order,
      formData.limit,
      countries
    );

    setFilteredCountries(result);
  }, [formData, countries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with formData
    console.log('Form data submitted:', formData);
  };

  console.log(countries.length);
  console.log(filteredCountries);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Population:
            <input
              type="text"
              name="population"
              value={formData.population}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Order:
            <input
              type="text"
              name="order"
              value={formData.order}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Limit:
            <input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}