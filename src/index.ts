import { UserListView } from './views/UserList';
import { Collection } from './models/Collection';
import { User, UserProps } from './User';

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
  return User.build(json);
});

users.on('change', () => {
  const root = document.getElementById('root');

  if (root) {
    new UserListView(root, users).render;
  }
})

users.fetch();