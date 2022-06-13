import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {

  private url:string = "http://localhost:8085/api/v1/cart";
  constructor(private httpClient : HttpClient) { }

  public getCarts(){
    return this.httpClient.get(this.url+"/getcarts");
  }

  public getCart(id : number){
    return this.httpClient.get(`${this.url}/getcart/${id}`);
  }

  public addCart(cart : any){
    return this.httpClient.post(this.url+"/addcart", cart);
  }

  public updateCart(cart : any, id : number){
    return this.httpClient.put(`${this.url}/updatecart/${id}`,cart);
  }

  public deleteCart(id : number){
    return this.httpClient.delete(`${this.url}/deletecart/${id}`);
  }
}
