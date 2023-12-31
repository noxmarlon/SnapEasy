import axios from 'axios';
import { getData } from './localstorage';

const instance = axios.create({
  baseURL: 'http://snapi.epitech.eu:8000/',
  responseType: 'json'
});

// Set the AUTH token for any request
instance.interceptors.request.use(async config => {
  const token = await getData('token');
  const email = await getData('email');
   
  if (token) {
    config.headers.token = token;
    
  }

  return config;
});

export default instance;