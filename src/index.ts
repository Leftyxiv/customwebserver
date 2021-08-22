import { User } from './User';
import axios, { AxiosResponse } from 'axios';

axios.get('http://localhost:3000/users').then((response: AxiosResponse) => {
    console.log(response.data);
});

const collection = User.buildUserCollection();