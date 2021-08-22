import { Model } from './../models/Model';
import { User, UserProps } from '../User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {

  eventsMap(): {[key: string]: () => void} {
    return {
      'click:#randomAge': this.randomizeAge,
      'click:#changeName': this.changeName,
      'click:#saveModel': this.saveModel
    }
  }

  saveModel = (): void => {
    this.model.save();
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
      <input id='inputElement' placeholder="${this.model.get('name')}"/>
      <button id='changeName'>Change name</button>
      <button id='randomAge'>Set random age</button>
      <button id='saveModel'>Save User</button>
    </div>
    `
  }

}
