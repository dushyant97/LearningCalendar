import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public storage : object;

  set_storage(obj){
    this.storage = obj;
  }

  get_storage():object{
    return this.storage;    
  }
}
