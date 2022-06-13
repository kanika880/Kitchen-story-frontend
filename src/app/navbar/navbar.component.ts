import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isSigninDisplay : string ;
  public isSignupDisplay : string ;
  public isLogoutDisplay : string ;
  public isAdmin : string;
  public isAccountDisplay : string;
  public isOrderDisplay : string;
  public isCartDisplay : string;
  constructor(private router : Router) {
    this.isSigninDisplay = "block";
    this.isSignupDisplay = "block";
    this.isLogoutDisplay = "none";
    this.isAdmin = "none";
    this.isAccountDisplay = "none";
    this.isOrderDisplay = "none";
    this.isCartDisplay = "none";
   }

  ngOnInit(): void {
    if(sessionStorage.getItem("username") != null && sessionStorage.getItem("role") != null){
      this.isSigninDisplay = "none";
      this.isSignupDisplay = "none";
      this.isLogoutDisplay = "block";
      this.isAccountDisplay = "block";
      this.isOrderDisplay = "block";
      this.isCartDisplay = "block";
      if(sessionStorage.getItem("role") == "admin"){
        this.isAdmin = "block";
      }
      else{
        this.isAdmin = "none";
      }
    }
    else{
      this.isSigninDisplay = "block";
      this.isSignupDisplay = "block";
      this.isLogoutDisplay = "none";
      this.isAccountDisplay = "none";
      this.isOrderDisplay = "none";
      this.isAdmin = "none";
      this.isCartDisplay = "none";
    }
  }


}
