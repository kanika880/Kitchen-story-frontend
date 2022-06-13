import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../service/userapi.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public user : any;
  constructor(private userapiService : UserapiService) { }

  ngOnInit(): void {
    let username = sessionStorage.getItem("username");
    this.userapiService.getUsers().subscribe((res) => {
    const array = Object.values(res);
    for(let a in array){
      if(username == array[a]["username"]){
        this.user = array[a];
      }
    }
    
    },
    (error)=>{
      console.log(error);
    });
  }

  addAmount(amount : number){
    this.user["walletBalance"] = this.user["walletBalance"] + amount;
    this.userapiService.updateUser(this.user, this.user["id"]).subscribe((res) => {
      console.log(res);
      window.location.reload;
    },
    (error) => {
      console.log(error);
    });
  }

}
