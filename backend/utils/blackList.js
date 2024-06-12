const axios = require("axios");

const scanAddress = async (address) => {
  try {
    const response = await axios.get(`http://143.110.178.16:8000/scan/${address}`, {
      headers: {
        'X-API-KEY': 'your_api_key_1'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error scanning address:', error);
    return null;
  }
};


// const getAddressInfo = async (address) = {
//   try {
//     const res = await axios.get(`http://143.110.178.16:8000/address-info/${address}`, {
//       headers: {
//         'X-API-KEY': 'your_api_key_1'
//       }
//     });
//     return res.data;
//   } catch (error) {
//     console.error('Error scanning address:', error);
//     return null;

//   }
// })
module.exports = { scanAddress };
