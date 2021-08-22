import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttrs<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(event: string, callback: Function): void;
  trigger(event: string): void;
}

interface hasId {
  id?: number;
}
export class Model<T extends hasId> {
  constructor(
    private attributes: ModelAttrs<T>, 
    private sync: Sync<T>,
    private events: Events) {}
    
    on = this.events.on;
    trigger = this.events.trigger;
    get = this.attributes.get;
    
    set(props: T): void {
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
      this.sync.save(this.attributes.getAll()).then((res: AxiosResponse): void => {
        this.trigger('save');
      }) .catch((err: Error): void => {
        throw err;
      });
    }
  }


  // get on() {
  //   return this.events.on;
  // }
  // get trigger() {
  //   return this.events.trigger;
  // }
  // get get() {
  //   return this.attributes.get;
  // }