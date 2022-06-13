import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  private url:string = "http://localhost:8085/api/v1/user";
  constructor(private httpClient : HttpClient) { }

  public loginUser(user:any){
    return this.httpClient.post(this.url+"/login",user);
  }

  public logoutUser(user : string){
    return this.httpClient.post(`${this.url}/logout/${user}`,null);
  }

  public getUsers(){
    return this.httpClient.get(this.url+"/getusers");
  }

  public getUser(id : number){
    return this.httpClient.get(`${this.url}/getuser/${id}`);
  }

  public addUser(user : any){
    return this.httpClient.post(this.url+"/adduser", user);
  }

  public updateUser(user : any, id : number){
    return this.httpClient.put(`${this.url}/updateuser/${id}`,user);
  }

  public deleteUser(id : number){
    return this.httpClient.delete(`${this.url}/delete/${id}`);
  }


}
