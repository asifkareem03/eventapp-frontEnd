import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    accountname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private router: Router, private fb: FormBuilder, private ds: DataService) { }

  ngOnInit(): void {
  }

  register() {
    var name = this.registerForm.value.accountname;
    var uname = this.registerForm.value.username;
    var password = this.registerForm.value.pwd;
    name=name.replace(/\s+/g, ' ');
    console.log(name);
    if (this.registerForm.valid) {
      this.ds.register(name,uname,password)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
          this.router.navigateByUrl("")
        }
      },result=>{
        alert(result.error.message)
      })
    }
    else {
      alert("Form Error")
    }
  }

}
