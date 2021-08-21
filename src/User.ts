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
}