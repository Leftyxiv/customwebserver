import axios, { AxiosResponse } from 'axios';
import { User } from '../user';
import { Eventing } from './Eventing';
import { UserProps } from '../user';

export class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string) {};
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: UserProps) => {
        const user = User.build(value);
        this.models.push(user);
      });
     });
  }
}