import { UserForm } from './views/UserForm';
import { User } from './User';

const user = User.build({
  name: 'John Doe',
  age: 30,
})

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing root element');
}

const userForm = new UserForm(root, user);
userForm.render();