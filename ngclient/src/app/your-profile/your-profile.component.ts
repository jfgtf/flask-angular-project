import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MyToken } from '../models/MyToken';
import { timer} from 'rxjs';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.css']
})
export class YourProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  labelSuccessHidden = true;
  labelErrorHidden = true;
  public labelSuccessText:any;
  public labelErrorText:any;
  public usersUsername:any;
  myToken: MyToken = new MyToken();
  
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((user) => {
        if (user.status === 'success') {
          this.isLoggedIn = true;
          this.usersUsername = user.data.username;
        }
      })
      .catch((err) => {
        this.isLoggedIn = false;
      });
    }
  }
  logout(){
    this.myToken.token = localStorage.getItem('token');
    if (this.myToken) {
      this.auth.logout(this.myToken)
      .then((data) => {
        if (data.status === 'success') {
          this.labelErrorHidden = true;
          this.labelSuccessText = "Logged out succesfully";
          this.labelSuccessHidden = false;
          timer(1500).subscribe(x => { this.labelSuccessHidden = true; })
          timer(1500).subscribe(x => { this.isLoggedIn = false;})
          localStorage.removeItem('token')
        }
      })
      .catch((err) => {
        this.labelSuccessHidden = true;
        this.labelErrorText = err.error.message;
        this.labelErrorHidden = false;
        timer(3000).subscribe(x => { this.labelErrorHidden = true; })
      });
    }
  }
}