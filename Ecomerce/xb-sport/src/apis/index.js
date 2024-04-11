import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'x-api-key': 'api-key',
    'x-client-id': 'client-id',
    authorization: 'access-token',
    'refresh-token': 'refresh-token',
  },
});

export default request;
