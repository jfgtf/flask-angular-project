import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MyToken } from '../models/MyToken';
import { timer} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.css']
})
export class YourProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  hideOpinions = true;
  hideRecipes = true;
  public usersUsername:any;
  public user_id:any;
  public opinions:any;
  public recipes:any;

  myToken: MyToken = new MyToken();
  
  constructor(private auth: AuthService, private cookieService: CookieService, private toastr: ToastrService ) {}
  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((user) => {
        if (user.status === 'success') {
          this.isLoggedIn = true;
          this.usersUsername = user.data.username;
          this.user_id = user.data.user_id;
        }
      })
      .catch((err) => {
        this.isLoggedIn = false;
      });
    }
    else{
      this.isLoggedIn = false;
    }
  }

  clickedRecipes(){
    this.hideOpinions = true;
    this.auth.getRecipesByID(this.user_id)
    .then((recipes) => {
      if (recipes.status === 'success') {
        this.recipes = recipes.data;
        }
    })
    this.hideRecipes = false;
  }

  clickedOpinions(){
    this.hideRecipes = true;
    this.auth.getOpinionsByID(this.user_id)
    .then((opinions) => {
      if (opinions.status === 'success') {
        this.opinions = opinions.data;
      }
    })
    this.hideOpinions = false;
  }

  logout(){
    this.myToken.token = this.cookieService.get('token');
    if (this.myToken) {
      this.auth.logout(this.myToken)
      .then((data) => {
        if (data.status === 'success') {
          this.toastr.success('Logged out successfully');
          timer(1500).subscribe(x => { this.isLoggedIn = false;})
          this.cookieService.delete('token')
        }
      });
    }
  }
}