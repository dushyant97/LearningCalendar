import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Promise, async } from 'q';
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
    this.content = event.target.files[0].name;
    this.read();
  }

   read()
  {
    var reader = new FileReader();
    
    reader.readAsArrayBuffer(this.fileSelected);
    
    reader.onload = (event)=>{
      var data = new Uint8Array(<ArrayBuffer>event.target['result']);
      var wb =  XLSX.read(data, {type: 'array'});

      //Iterating over the sheet names
        wb.SheetNames.forEach( function(sheetName: string | number)
      {
        //var rowObject =  XLSX.utils.sheet_to__object_array(wb.Sheets[sheetName]);
        console.log("assigning value",  XLSX.utils.sheet_to_json(wb.Sheets[sheetName]));
        this.excelJsonObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        console.log("Inside loop",this.excelJsonObj);
      })

      console.log("Inside function",this.excelJsonObj)
  }
    console.log("Before return",this.excelJsonObj);

  }

}

//function
/*  reader.onload = function(e)
    {
      //Creating a promise
      var prom = Promise((resolve,reject)=>
      {
          try
          {

            var data = new Uint8Array(<ArrayBuffer>reader.result);
            var wb = XLSX.read(data, {type: 'array'});

            //Iterating over the sheet names
            wb.SheetNames.forEach(function(sheetName)
            {
              var rowObject = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
              excelJsonObj = rowObject;
            })

            resolve(excelJsonObj);
          }
          catch(error)
          {
            reject(error);
          }
      });

      //Handling the promise
      prom
      .then(excelJsonObj => {
        console.log("Just before return",excelJsonObj);
      })
      .catch(error =>{
        console.log(error + " is the error");
      });
    }
  */