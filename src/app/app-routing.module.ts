import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';

const routes:Routes=[
  {
    path:'',component:LoginComponent
  },
  {
    path:"register",component:RegisterComponent
  },
  {
    path:"userhome",component:UserhomeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
