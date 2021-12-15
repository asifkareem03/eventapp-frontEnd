import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private router:Router,private fb:FormBuilder,private ds:DataService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  login(){
    var uname=this.loginForm.value.username;
    var password=this.loginForm.value.pwd;
    if(this.loginForm.valid){
      this.ds.login(uname,password)
      .subscribe((result:any)=>{
        localStorage.setItem("token",result.token)
        localStorage.setItem("currentUser",result.currentUser)
        localStorage.setItem("currentuname",uname)
        alert(result.message);
        this.router.navigateByUrl("userhome")
      },result=>{
        alert(result.error.message)
      })
    }
    else{
      alert("Form Error")
    }
  }
}
