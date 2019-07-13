import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

declare var html2canvas : any;

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
  closed_nomination = [];
  open_nomination = [];
  digital = [];
  invitation = [];
  excelJsonObject = [
    {
      "Content": "This is IOT",
      "Duration": "3",
      "Facilitator": "Dushyant",
      "S.No.": "1",
      "Site": "NOIDA",
      "Title": "IOT",
      "Date" : "7",
      "Type": "Open Nomination Based"
    },
    {
      "Content": "DB",
      "Duration": "112",
      "Facilitator": "Parth",
      "S.No.": "2",
      "Site": "NOIDA",
      "Title": "DB",
      "Date" : "19",
      "Type": "Closed Nomination Based"
    },
    {
      "Content": "SQL",
      "Duration": "112132",
      "Facilitator": "Rishabh",
      "S.No.": "3",
      "Site": "NOIDA",
      "Title": "SQL",
      "Date" : "10",
      "Type": "Digital"
    },
    {
      "Content": "OS",
      "Duration": "132",
      "Facilitator": "Shreyans",
      "S.No.": "4",
      "Site": "NOIDA",
      "Title": "OS",
      "Date" : "25",
      "Type": "Invitation Based"
    } 
  ]


  constructor(private service : DataService) { }

  ngOnInit() {

    for(let item in this.excelJsonObject)
    {
      var data =  Object.values(this.excelJsonObject)[item];
      var type = data['Type'];

      if(type == "Open Nomination Based")
      {
        this.open_nomination.push(data);        
      }
      else if(type == "Closed Nomination Based")
      {
        this.closed_nomination.push(data);
      }
      else if(type == "Digital")
      {
        this.invitation.push(data);
      }
      else if(type == "Invitation Based")
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

  screenshot()
  {
    html2canvas(document.body).then(function(canvas) {
      var a = document.createElement('a');
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg","image/octet-stream");
      var name = prompt("Enter the file name");
      a.download = name+'.jpg';
      a.click();
    });
  }
}
