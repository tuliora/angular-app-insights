import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(){}

  get(nome: string): void {
    return JSON.parse(localStorage.getItem(nome))
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear(): void {
    localStorage.clear();
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
