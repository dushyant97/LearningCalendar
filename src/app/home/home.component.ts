import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as XLSX from 'xlsx/dist/xlsx.full.min.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileSelected : File;
  content : string= "Choose a File";
  excelJsonObj : Object;

  constructor(private service: DataService) { }

  ngOnInit() {    
  }

  onFileSelected(event)
  {
    this.fileSelected = event.target.files[0];

    //getting file name for display
    this.content = event.target.files[0].name;
    
    //calling the function to read excel file
    this.read();
  }

  read()
  {
    var reader = new FileReader();
    
    reader.readAsArrayBuffer(this.fileSelected);
    
    reader.onload = (event)=>{
      var data = new Uint8Array(<ArrayBuffer>event.target['result']);
      var wb =  XLSX.read(data, {type: 'array'});
      var arr = new Array();
      //Iterating over the sheet names
      for(var i = 0; i != data.length; ++i) 
      {
        arr[i] = String.fromCharCode(data[i]);
      }
        var bstr = arr.join("");

        //reading the excel sheets
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        console.log('Inside' +" " +first_sheet_name);
        
        //getting the data from first sheet
        var worksheet = workbook.Sheets[first_sheet_name];
        //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        
        this.excelJsonObj = XLSX.utils.sheet_to_json(worksheet,{raw:true});

        //saving the data via setter and getter
        this.service.set_storage(this.excelJsonObj);
        console.log("this is before setter",this.excelJsonObj)
    }
  }

}
