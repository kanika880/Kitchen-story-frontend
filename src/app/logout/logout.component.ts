import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserapiService } from '../service/userapi.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router, private userapiService : UserapiService) { }

  ngOnInit(): void {
    let user  = sessionStorage.getItem("username");
    if(user != null){
      this.userapiService.logoutUser(user).subscribe((res) => {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");
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
