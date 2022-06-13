import { Component, OnInit } from '@angular/core';
import { OrderapiService } from 'src/app/service/orderapi.service';

@Component({
  selector: 'app-listorders',
  templateUrl: './listorders.component.html',
  styleUrls: ['./listorders.component.css']
})
export class ListordersComponent implements OnInit {
  public orders : any;
  constructor(private orderapiService : OrderapiService) { }

  ngOnInit(): void {
    this.orderapiService.getOrders().subscribe((res) => {
      console.log(res);
      this.orders = res;
    },
    (error) => {
      console.log(error);
    });
  }

}
