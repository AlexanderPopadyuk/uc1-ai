import { useEffect, useState } from 'react';
import axios from 'axios';
import { combinedFilter } from './helpers';

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
        setFilteredCountries(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = combinedFilter(
      formData.name,
      formData.population ? parseFloat(formData.population) : undefined,
      formData.order,
      formData.limit,
      countries
    );

    setFilteredCountries(result);
  };

  return (
    <div className="form-container">
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
      <div className="list-container">
        <h2>List of Countries</h2>
        <ul>
          {filteredCountries.map(country => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}