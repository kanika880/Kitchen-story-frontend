import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartapiService } from 'src/app/service/cartapi.service';
import { OrderapiService } from 'src/app/service/orderapi.service';
import { UserapiService } from 'src/app/service/userapi.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  public orderTotal : number;
  public walletBalance : number;
  public products : any;
  public user : any;
  public orderForm : FormGroup;
  public displayAlert : string;
  public cart : any;

  constructor(private formBuilder: FormBuilder,private userapiService : UserapiService, private orderapiService : OrderapiService, private cartapiService : CartapiService) {
    this.orderTotal = 0;
    this.walletBalance = 0;
    this.products = null;
    this.displayAlert = "none";
    this.orderForm = this.formBuilder.group({
      email : ["",[Validators.required]],
      address : ["",[Validators.required]],
      phoneno : ["",[Validators.required]]
    })
   }

  ngOnInit(): void {
    let username = sessionStorage.getItem("username");
    if(username != null){
      this.cartapiService.getCarts().subscribe((res) => {
        let cartArray = Object.values(res);
        for(let c in cartArray){
          if(cartArray[c]["user"]["username"] == username){
            this.cart = cartArray[c];
            this.products = cartArray[c]["products"];
            this.user = cartArray[c]["user"];
            this.walletBalance = cartArray[c]["user"]["walletBalance"];
            break;
          }
        }

        for(let p in this.products){
          this.orderTotal = this.orderTotal + this.products[p]["price"];
        }

      },
      (error) => {
        console.log(error);
      });
    }
  }

  onSubmit(form : any){
    if(form.valid){
      let orderObj = {"totalPrice" : 0, "email" : form.value.email, "address" : form.value.address, "phoneNo" : form.value.phoneno, "products" : this.products, "user" : this.user};
      this.orderapiService.addOrder(orderObj).subscribe((res) => {
        console.log(res);
        let orders : any = res;
        let user = orders.user;
        this.displayAlert = "block";
        let cartObj = {"id" : this.cart["id"],"products" : [], "user" : this.user};
        console.log("clear cart");
        console.log(cartObj);
        this.cartapiService.updateCart(cartObj,cartObj["id"]).subscribe((res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        });
        this.userapiService.updateUser(user,user.id).subscribe((res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        });
      },
      (error) => {
        console.log(error);
      });
    }
  }

  onCloseAlert(){
    this.displayAlert = "none";
  }

}
