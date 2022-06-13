import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductapiService {

  private url:string = "http://localhost:8085/api/v1/product";
  constructor(private httpClient : HttpClient) { }

  public getProducts(search : string){
    return this.httpClient.get(this.url+"/getproducts?name="+search);
  }

  public getProduct(id : number){
    let user= sessionStorage.getItem("username");
    return this.httpClient.get(`${this.url}/getproduct/${id}?userName=${user}`);
  }

  public addProduct(product : any){
    let user= sessionStorage.getItem("username");
    return this.httpClient.post(this.url+"/addproduct?userName="+user, product);
  }

  public updateProduct(product : any, id : number){
    let user= sessionStorage.getItem("username");
    return this.httpClient.put(`${this.url}/updateproduct/${id}?userName=${user}`,product);
  }

  public deleteProduct(id : number){
    let user= sessionStorage.getItem("username");
    return this.httpClient.delete(`${this.url}/deleteproduct/${id}?userName=${user}`);
  }


}
