import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})

export class UserhomeComponent implements OnInit {

  event_data='';
  event_date='';
  reminders:any;
  isDisabled:boolean = true;
  user:any;
  tempEventData:any;
  tempEventDate:any;

  btn1:boolean=true;
  btn2:boolean=true;
  btn3:boolean=false;
  btn4:boolean=false;

  div1:boolean=false;
  div2:boolean=false;
  div3:boolean=false;
  div4:boolean=false;

  constructor(private ds:DataService,private fb:FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.user=localStorage.getItem("currentUser")
    if(!localStorage.getItem("token")){
      alert("Please Login!!!")
      this.router.navigateByUrl("")
    }
    this.myday()
  }

  add_event(){
    let event_data=this.event_data;
    let event_date=this.event_date;
    this.ds.create(event_data,event_date)
    .subscribe((result: any) => {
      if (result) {
        alert(result.message)
        this.event_data=''
        this.event_date=''
      }
    },result=>{
      alert(result.error.message)
    })
  }


  view_event(){
    this.ds.view()
    .subscribe((result: any) => {
      if (result) {
        this.reminders=result.reminders;
        // console.log(this.reminders);
        this.reminders.forEach((reminder:any)=>{
          reminder.isDisabled=true;
          reminder.btn1=true;
          reminder.btn2=true;
          reminder.btn3=false;
          reminder.btn4=false;
        })
        // console.log(this.reminders);
        // alert("Succesfull Please Check ")
        // alert(result.message)
      }
    },result=>{
      alert(result.error.message)
    })
  }

  edit_event(index:any){
    // this.reminders[index]
    this.tempEventData=this.reminders[index].event;
    this.tempEventDate=this.reminders[index].date;
    this.reminders[index].isDisabled=false;
    this.interchange(index);
    // console.log(this.tempEventData,this.tempEventDate);
  }


  deleteEvent(index:any){
    this.ds.deleteEvent(this.reminders[index].uid)
    .subscribe((result:any)=>{
      if(result){
        this.reminders=result.reminders;
        alert(result.message)
        this.view_event()
      }
    },result=>{
      alert(result.error.message)
    })
  }

  updateEvent(index:any){
    // console.log(this.reminders[index].event);
    // this.ds.editEvent()
    let eData=this.reminders[index].event;
    let eDate=this.reminders[index].date;
    let uid=this.reminders[index].uid
    if(this.tempEventDate!==eDate||this.tempEventData!==eData){
      this.ds.editEvent(eData,eDate,uid)
      .subscribe((result:any)=>{
        if(result){
          this.reminders=result.reminders;
          alert(result.message)
        }
      },result=>{
        alert(result.error.message)
      })
    }
    this.reminders[index].isDisabled=true;
    this.interchange(index);
    this.view_event();
    this.view_reminder();
  }

  cancelEditEvent(index:any){
    this.reminders[index].event=this.tempEventData
    this.reminders[index].date=this.tempEventDate
    this.reminders[index].isDisabled=true;
    this.interchange(index);
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("")
  }


  myday(){
    this.blocking();
    this.div4=true;
    console.log(this.reminders);
  }

  add_reminder(){
    this.blocking();
    this.div1=true;
  }

  view_reminder(){
    this.blocking();
    this.div2=true;
    this.view_event();
  }

  change_password(){
    this.blocking();
    this.div3=true;
  }

  blocking(){
    this.div1=false;
    this.div2=false;
    this.div3=false;
    this.div4=false;
  }

  interchange(index:any){
    this.reminders[index].btn1=!this.reminders[index].btn1;
    this.reminders[index].btn2=!this.reminders[index].btn2;
    this.reminders[index].btn3=!this.reminders[index].btn3;
    this.reminders[index].btn4=!this.reminders[index].btn4;
  }

}
