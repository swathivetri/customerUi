import axios from 'axios';
import { API_URL } from './path';

const { DEPLOY_URL } = API_URL;

const api = axios.create({
  baseURL: DEPLOY_URL,
});

export const fetchData = async (endpoint, params, urlType = 'DEPLOY_URL') => {
  try {
    const response = await api.post(endpoint, params, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    console.log(response,'response')
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
