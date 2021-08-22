import { UserEdit } from './views/UserEdit';
import { User } from './User';

const user = User.build({
  name: 'John Doe',
  age: 30,
})

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing root element');
}

const userEdit = new UserEdit(root, user);
userEdit.render();
console.log(userEdit);