import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

declare var XLSX : any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  file: File;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
  
  }

  read(){
    var reader = new FileReader();
    reader.readAsArrayBuffer(this.file);
    
    reader.onload = function(e){
      var data = new Uint8Array(<ArrayBuffer>reader.result);
      var wb = XLSX.read(data, {type: 'array'});
      var htmlstr = XLSX.write(wb,{sheetAtIndex:'0',type:'binary', bookType:'html'});
      //document.getElementById("table").innerHTML+=htmlstr;
      console.log(htmlstr);
    }
  
  }

}
