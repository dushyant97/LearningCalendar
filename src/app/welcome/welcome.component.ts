import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import html2canvas from 'html2canvas/dist/html2canvas.js';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit { 


  obj : Object;

  condition_close : boolean = false;
  condition_open : boolean = false;
  condition_digital : boolean = false;
  condition_invitation : boolean =false;
  
  condition_data : boolean = false;

  closed_nomination = [];
  open_nomination = [];
  digital = [];
  invitation = [];

  excelJsonObject : Object;
  window: any;

  color_body:string="";

  constructor(private service : DataService) { }

  ngOnInit(){

    this.color_body=this.service.get_color_body();

    this.excelJsonObject = this.service.get_storage();
    
    if(this.excelJsonObject == undefined)
    {
      this.condition_data = true;
    }

    for(let item in this.excelJsonObject)
    {
      var data =  Object.values(this.excelJsonObject)[item];
      var type = data['Training Category'].toUpperCase();
      
      if(type == "OPEN NOMINATION")
      {
        this.open_nomination.push(data);        
      }
      else if(type == "CLOSED NOMINATION")
      {
        this.closed_nomination.push(data);
      }
      else if(type == "INVITATION")
      {
        this.invitation.push(data);
      }
      else if(type == "DIGITAL")
      {
        this.digital.push(data);
      }
    }

    if(this.open_nomination.length>0)
    {
      this.condition_open = true;
    }
    if(this.closed_nomination.length>0)
    {
      this.condition_close = true;
    }
    if(this.invitation.length>0)
    {
      this.condition_invitation = true;
    }
    if(this.digital.length>0)
    {
      this.condition_digital = true;
    }

  }

  ngAfterViewInit()
  {
    if(this.condition_open)
    { 
      document.getElementById("color-type1").style.backgroundColor=this.color_body;
    }
    if(this.condition_close)
    {
      document.getElementById("color-type2").style.backgroundColor=this.color_body;
    }
    if(this.condition_digital)
    {
      document.getElementById("color-type3").style.backgroundColor=this.color_body;
    }
    if(this.condition_invitation)
    {
      document.getElementById("color-type4").style.backgroundColor=this.color_body;
    }
  }

  screenshot()
{
    document.getElementById("capture").style.display="none";
    html2canvas(document.body, { logging: true, letterRendering: 1, useCORS: true }).then(function(canvas) {
      var a = document.createElement('a');
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg","image/octet-stream");
      var name = prompt("Enter the file name");
      if(name =="" || name == "null")
        {
          alert("invalid name");
        }
      if(name.length>0)
      {
        a.download = name+'.jpg';
        a.click();
      }
    });
    document.getElementById("capture").style.display="block";
  }

}
