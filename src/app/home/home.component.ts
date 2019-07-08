import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileSelected : File ;
  content : string= "Choose a File";
  constructor() { }

  ngOnInit() {
  }

  onFileSelected(event)
  {
    this.fileSelected = event.target.files[0];
    this.content = event.target.files[0].name;
  }

}
