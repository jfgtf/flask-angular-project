import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { MyToken } from '../models/MyToken';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) {}
  
  login(user: User): Promise<any> {
    let url: string = "http://localhost:5000/api/login";
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

  ensureAuthenticated(token:any): Promise<any> {
    let url: string = "http://localhost:5000/api/status";
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  logout(token:MyToken): Promise<any> {
    let url: string = "http://localhost:5000/api/logout";
    return this.http.post(url, token, {headers: this.headers}).toPromise();
  }

  getOpinions(): Promise<any> {
    let url: string = "http://localhost:5000/api/opinions";
    return this.http.get(url, {headers: this.headers}).toPromise();
  }

  getOpinionsByID(user_id:any): Promise<any> {
    let url: string = "http://localhost:5000/api/opinionsbyid";
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `ID ${user_id}`  
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  getRecipes():Promise<any> {
    let url: string = "http://localhost:5000/api/recipes";
    return this.http.get(url, {headers: this.headers}).toPromise();
  }

  getRecipesByID(user_id:any): Promise<any> {
    let url: string = "http://localhost:5000/api/recipesbyid";
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `ID ${user_id}`  
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  deleteRecipe(id:any): Promise<any> {
    let url: string = "http://localhost:5000/api/recipesdelete";
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `ID ${id}`  
    });
    return this.http.post(url, {headers: headers}).toPromise();
  }
}
