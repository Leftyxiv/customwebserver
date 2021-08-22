import { UserForm } from './views/UserForm';
import { User } from './User';

const user = User.build({
  name: 'John Doe',
  age: 30,
})

const userForm = new UserForm(document.getElementById('root'), user);
userForm.render();