import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private service : DataService) { }

  color:string="";

  ngOnInit() {
    this.color = this.service.get_color_header();
  }

  ngAfterViewInit()
  {
    document.getElementById("color-footer").style.backgroundColor=this.color;

  }
}
