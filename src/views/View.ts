import { Model } from '../models/Model';
import { User } from '../User';
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';
export abstract class View<T extends Model<K>, K> {
  regions: {[key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.model.on('change', () => {
      this.render();
    })
  };

  abstract template(): string;

  eventsMap(): {[key: string]: () => void} {
    return {}
  }
  regionsMap(): { [key: string]: string } {
    return {};
  };

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let regionKey in regionsMap) {
      const selector = regionsMap[regionKey];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[regionKey] = element;
      }
    }
  }
  onRender(): void {
    // FIX ME WTF
    // new UserShow(this.regions.userShow, this.model).render();
    // new UserForm(this.regions.userForm, this.model).render();
  };

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  };
}