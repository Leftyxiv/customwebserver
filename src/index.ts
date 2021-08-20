import axios from 'axios';

axios.post('http://localhost:3000/users', {
  name: 'Manny',
  age: 34,
})