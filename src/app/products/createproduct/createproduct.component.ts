import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductapiService } from 'src/app/service/productapi.service';
import * as myjson from "src/assets/data/imgmap.json";

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  public addForm : FormGroup;
  public image : any;
  constructor(private router : Router, private formBuilder: FormBuilder,private productapiService : ProductapiService ) {
    this.addForm = this.formBuilder.group({
      name: ["",[Validators.required]],
      price:["",[Validators.required]],
      description:["",Validators.required],
      category:["",Validators.required],
      image:["",Validators.required],
      seller:["",Validators.required]
  });
   }

  ngOnInit(): void {
    console.log(myjson);
    this.image = myjson;
  }

  onSubmit(form : any){
    
    if(form.valid){
      console.log(form.value.image);
      this.productapiService.addProduct({"name" : form.value.name , "price" : parseFloat(form.value.price) , "description" : form.value.description , "category" : form.value.category , "imagePath" : form.value.image, "seller" : form.value.seller}).subscribe((res) => {
        console.log(res);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      });
    }
  }

}
