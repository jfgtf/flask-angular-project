import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/User';
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
}
