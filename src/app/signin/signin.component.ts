import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserapiService } from '../service/userapi.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signinForm : FormGroup;
  public isDisplay : string = "";
  public isAdmin : boolean;
  constructor(private router : Router, private formBuilder: FormBuilder,private userapiService : UserapiService ) {
    this.signinForm = this.formBuilder.group({
      username: ["",[Validators.required]],
      password:["",[Validators.required]],
      role:["",Validators.required]
  });
   }

  ngOnInit(): void {
    if(sessionStorage.getItem("username") != null && sessionStorage.getItem("role") != null){
      this.isDisplay = "none";
    }
    else{
      this.isDisplay = "block";
    }
  }

  public onSubmit(form:any){
    if(form.valid){
      this.userapiService.loginUser({"username" : form.value.username , "password" : form.value.password}).subscribe((res) => {
        sessionStorage.setItem("username",form.value.username);
        sessionStorage.setItem("role", form.value.role);
        if(sessionStorage.getItem('role')=="admin"){
          this.isAdmin=true;
        }
        this.router.navigate(["/"]).then( () => {
          window.location.reload();
        });
      },
      (error) => {
        console.log(error);
      });
    }
  }


}
