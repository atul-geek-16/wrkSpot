import axios from 'axios';

async function fetchCountries() {
    try {
      const response = await axios.get(`https://api.sampleapis.com/countries/countries`);
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  export default fetchCountries;