import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-my-burger-8881b-default-rtdb.firebaseio.com/',
});

export default instance;