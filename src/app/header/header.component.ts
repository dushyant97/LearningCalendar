import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service : DataService) { }

  month:string="undefined";
  year:string="undefined";
  color:string="";

  ngOnInit() {
    this.month = this.service.get_month();
    this.year = this.service.get_year();
    this.color = this.service.get_color_header();
  }

  ngAfterViewInit()
  {
    document.getElementById("color-header1").style.backgroundColor=this.color;
    document.getElementById("color-header2").style.backgroundColor=this.color;
  }

}
