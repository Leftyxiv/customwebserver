import { AxiosPromise } from 'axios';

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


export class Model {

}