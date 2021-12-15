import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';


const options={
  withCredentials:true,
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getOptions(){
    const token=localStorage.getItem("token")
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append('x-access-token',token)
      options.headers=headers;
    }
    return options
  }

  register(name:any, uname: any, password: any) {
    
    const data={
      name,
      uname,
      password
    }

    return this.http.post("http://localhost:3000/register",data)
  }

  login(uname: any, password: any) {
    const data={
      uname,
      password
    }
    return this.http.post("http://localhost:3000/login",data)
    // return this.http.post(environment.apiURL+"/login",data)
  }

  create(event_data:any,event_date:any){
    const data={
      event_data,
      event_date
    }
    return this.http.post("http://localhost:3000/create",data,this.getOptions())
  }

  view(){
    const data={}
    return this.http.post("http://localhost:3000/view",data,this.getOptions())
  }

  editEvent(eventData:any,eventDate:any,uid:any){
    const data={
      eventData,
      eventDate,
      uid
    }
    return this.http.post("http://localhost:3000/editEvent",data,this.getOptions())
  }

  deleteEvent(uid:any){
    const data={uid}
    return this.http.post("http://localhost:3000/deleteEvent",data,this.getOptions())
  }
}

