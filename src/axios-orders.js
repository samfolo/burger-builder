import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-1bd63.firebaseio.com',
})

export default instance;