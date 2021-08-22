import { Model } from './models/Model';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://127.0.0.1:3000/users';
export class User extends Model<UserProps> {
  
}