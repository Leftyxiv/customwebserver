import { AxiosResponse } from 'axios';
import { Eventing } from './models/Eventing';
import { Sync } from './models/Sync';
import { Attributes } from './models/Attributes';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://127.0.0.1:3000/users';
export class User {
  events: Eventing = new Eventing();
  sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(props?: UserProps) {
    this.attributes = new Attributes<UserProps>(props);
  }

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }

  set(props: UserProps): void {
    this.attributes.set(props);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('can not fetch without an id');
    }
    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.attributes.set(res.data);
    }) .catch((err: Error): void => {
      throw err;
    });
  }

  save(): void {
    
}