import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://ec2-18-235-255-201.compute-1.amazonaws.com:8080/auth/',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;


