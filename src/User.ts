interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void;
export class User {
  events: {[key: string]: Callback[]} = {};

  constructor(private data: UserProps) {};

  get(propName: string): (number | string) {
  return this.data[propName];
  }
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
  on(eventName: string, callback: Callback): void {
    this.data[eventName] = callback;
  }
  trigger(eventName: string, data: UserProps): void {
    this.data[eventName](data);
  }
}