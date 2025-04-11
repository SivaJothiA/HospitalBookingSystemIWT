const axios = require('axios');

async function testEndpoint() {
  try {
    console.log("Testing /api/patient/get endpoint...");
    const response = await axios.get('http://localhost:4000/api/patient/get');
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  } catch (error) {
    console.error("Error testing endpoint:", {
      message: error.message,
      code: error.code,
      config: {
        url: error.config.url,
        method: error.config.method
      }
    });
  }
}

testEndpoint();
