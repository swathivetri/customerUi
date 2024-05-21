// import axios from 'axios';

// const baseURL = 'http://192.168.1.238:3201/module/public/';

// const api = axios.create({
//   baseURL,
// });

// export const fetchData = async (endpoint, params) => {
//   try {
//     const response = await api.post(endpoint, params);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
const API_BASE_URL = 'https://api.services.oneappplus.in';

export default API_BASE_URL;