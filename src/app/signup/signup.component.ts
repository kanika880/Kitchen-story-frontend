import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserapiService } from '../service/userapi.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm : FormGroup;
  public submitted : boolean = false;

  constructor(private router: Router,private formBuilder: FormBuilder,private userapiService : UserapiService, ) {
    this.signupForm = this.formBuilder.group({
      username: ["",[Validators.required]],
      password:["",[Validators.required]],
      email:["",[Validators.required]],
      role:["",Validators.required]
  });
   }

  ngOnInit(): void {
  }
  onSubmit(form : any){
    if(form.valid){
      this.submitted = true;
      console.log(form);
      this.userapiService.addUser({"username" : form.value.username, "password" : form.value.password, "email" : form.value.email , "role" : form.value.role, "walletBalance" : 10000.0, "loggedIn" : false}).subscribe((res) =>{
        console.log(res)
        this.router.navigate(["/"]).then( () => {
          window.location.reload();
        });
    },
      (error) =>{
        console.log(error);
      }
      );
    }
  }

}
