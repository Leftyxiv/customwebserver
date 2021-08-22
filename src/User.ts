import { Eventing } from './models/Eventing';
import { Attributes } from './models/Attributes';
import { Model } from './models/Model';
import { ApiSync } from './models/ApiSync';
import { Collection } from './models/Collection';


export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://127.0.0.1:3000/users';
export class User extends Model<UserProps> {
  static build(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new ApiSync(rootUrl),
      new Eventing(),
    );
  }
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) => User.build(json));
  }
  setRandomAge(): void {
    const age = Math.floor(Math.random() * 100);
    this.set({ age });
  }
}