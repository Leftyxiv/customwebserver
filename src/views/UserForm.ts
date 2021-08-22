import { User } from '../User';
import { View } from './View';

export class UserForm extends View {

  eventsMap(): {[key: string]: () => void} {
    return {
      'click:#randomAge': this.randomizeAge,
      'click:#changeName': this.changeName
    }
  }

  changeName = (): void => {
    const input = this.parent.querySelector('input')
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  randomizeAge = (): void => {
    this.model.setRandomAge();
  }

  template(): string {
    return `
    <div>
      <h1>User Form</h1>
      <div>User name: ${this.model.get('name')}</div>
      <div>User age: ${this.model.get('age')}</div>
      <input id='inputElement'/>
      <button id='changeName'>Change name</button>
      <button id='randomAge'>Set random age</button>
    </div>
    `
  }

}
