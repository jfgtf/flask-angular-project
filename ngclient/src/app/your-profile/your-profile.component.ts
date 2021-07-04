import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.css']
})
export class YourProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  public usersUsername:any;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((user) => {
        console.log(user);
        console.log(user.data.username);
        if (user.status === 'success') {
          this.isLoggedIn = true;
          this.usersUsername = user.data.username;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}