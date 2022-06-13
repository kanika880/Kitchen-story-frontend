import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartapiService } from '../service/cartapi.service';
import { ProductapiService } from '../service/productapi.service';
import { UserapiService } from '../service/userapi.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public pId : string = "";
  public products : any;
  public searchForm : FormGroup;
  public searchText :string;
  public user : any ;
  public userCart : any;
  public cartProduct : any;
  public displayAlert : string;
  public displayAlertPresent : string;
  constructor(private router : Router, private productapiService : ProductapiService, private userapiService :UserapiService, private cartapiService : CartapiService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search : [""]
    });
    this.searchText = "";
    this.displayAlert = "none";
    this.displayAlertPresent = "none";
  }

  ngOnInit(): void {
      this.productapiService.getProducts(this.searchText).subscribe((res) => {
        this.products = res;
        console.log("Yesss");
        console.log(this.products);
      },
      (error) => {
        console.log(error);
        console.log("Yesss");
      }
    );
  }
  addClick(){
    this.router.navigate(["/products/create"]);
  }

  deleteClick(id : string){
    console.log(id);
    this.productapiService.deleteProduct(parseInt(id)).subscribe((res) => {
      console.log(res);
      window.location.reload();
    },
    (error) => {
      console.log(error);
    });
  }

  updateClick(id : string){
    this.pId = id;
  }

  addCartClick(id : string){
    this.productapiService.getProduct(parseInt(id)).subscribe((res) => {
      this.cartProduct = res;
      console.log("cartproduct");
      console.log(this.cartProduct);
      let username = sessionStorage.getItem("username");
      if(username != null){
        this.userapiService.getUsers().subscribe((res) => {
          const array = Object.values(res);
          for(let u in array){
            console.log("inside user array");
            if(array[u]["username"] == username ){
              console.log("usermatches");
              this.user = array[u];
              console.log(this.user);
              break;
            }
          }
        },
        (error) => {
          console.log(error);
        });

        this.cartapiService.getCarts().subscribe((res) => {
          const array1 = Object.values(res);
          for(let c in array1){
            if(array1[c]["user"]["username"] == username){
              this.userCart = array1[c];
              break;
            }
          }
          if(this.userCart == null){
            console.log("Add");
            console.log(this.cartProduct);
            let finalCartProducts : any[] = [this.cartProduct];
            console.log(finalCartProducts);
            let cartObj = {"products" : finalCartProducts, "user" : this.user};
            this.cartapiService.addCart(cartObj).subscribe((res1) => {
              console.log(res1);
              this.displayAlert = "block";
            },
            (error) => {
              console.log(error);
            });
          }
          else{
            console.log("Update");
            let finalCartProducts : any[] = this.userCart["products"];
            let flag = 0;
            for(let fc in finalCartProducts){
              console.log(finalCartProducts[fc]["id"]);
              console.log(this.cartProduct);
              if(finalCartProducts[fc]["id"] == this.cartProduct["id"]){
                console.log("id present");
                flag =1;
                break;
              }
            }
            if(flag == 1){
              this.displayAlertPresent = "block";
            }
            else{
              finalCartProducts.push(this.cartProduct);
              let cartObj = {"id" : this.userCart["id"], "products" : finalCartProducts, "user" : this.user};
              console.log(cartObj);
              this.cartapiService.updateCart(cartObj, parseInt(this.userCart["id"])).subscribe((res1) => {
                console.log(res1);
                this.displayAlert = "block";
              },
              (error) => {
                console.log(error);
              });
            }
          }
        },
        (error) => {
          console.log(error);
        });
      }
    },
    (error) => {
      console.log(error);
    });

  }

  onSubmit(form : any){
    if(form.valid){
      this.searchText= form.value.search;
        this.productapiService.getProducts(this.searchText).subscribe((res) => {
          this.products = res;
          console.log("Yesss");
          console.log(this.products);
        },
        (error) => {
          console.log(error);
          console.log("Yesss");
        }
      );
    }
  }

  onCloseAlert1(){
    console.log("onclose1");
    this.displayAlert = "none";
  }

  onCloseAlert2(){
    console.log("onclose2");
    this.displayAlertPresent = "none";
  }

  // CheckAdmin(): void {
  //     if(sessionStorage.getItem("role") == "admin"){
  //       this.isAdmin = true;
  //     }
  //     else{
  //       this.isAdmin=false;
  //     }
  //   }
}
