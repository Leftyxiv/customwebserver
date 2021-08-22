import { View } from './View';
import { User, UserProps } from '../User';

export class UserEdit extends View<User, UserProps> {
  template(): string {
    return `
    <div>
      <div id='userShow'></div>
      <div id='userForm'></div>
    </div>
    `
  }
}