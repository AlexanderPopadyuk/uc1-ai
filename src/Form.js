import { useEffect, useState } from 'react';
import axios from 'axios';

export const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    population: '',
    order: '',
    limit: ''
  });
  const [countries, setCountries] = useState([]);

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

  console.log(countries);

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