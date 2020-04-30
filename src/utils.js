const axios = require('axios');

async function getData() {
  try {
    const response = await axios.get('http://localhost:5000');
    return response.data;
  } catch (error) {
    return error;
  }
}

module.exports = { getData };
