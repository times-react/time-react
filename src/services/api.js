import axios from 'axios';

const api = axios.create({
  baseURL: 'https://times-react.azurewebsites.net/times',
});

export default api;
