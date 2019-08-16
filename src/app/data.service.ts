import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public storage : object;
  public month : string;
  public year :string;
  public color_header:string;
  public color_body:string;

  set_storage(obj){
    this.storage = obj;
  }

  get_storage():object{
    return this.storage;    
  }

  set_month(x){
    this.month=x;
  }

  get_month():string{
    return this.month;
  }
  
  set_year(y){
    this.year=y;
  }

  get_year():string{
    return this.year;
  }

  set_color_header(color_header){
    this.color_header=color_header;
  }

  get_color_header():string{
    return this.color_header;
  }

  set_color_body(color_body){
    this.color_body=color_body;
  }

  get_color_body():string{
    return this.color_body;
  }
}
