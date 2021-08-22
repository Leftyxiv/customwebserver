import { User } from '../user';

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.model.on('change', () => {
      this.render();
    })
  };

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
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  };
}
