import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  isLoggedIn: boolean = false;
  isDisabled = true;
  public usersUsername:any;
  public user_id:any;

  getMsgFromBaby() {
    this.isDisabled = false;
  }

  getData(recipe: string, tags: string){
    var formData: any = new FormData();
    
    formData.append("recipe", recipe);
    formData.append("tags", tags);
    formData.append("user_id", this.user_id);
    formData.append("username", this.usersUsername);

    this.auth.addRecipe(formData)
    .subscribe(
      data => {
        this.toastr.success('Added a recipe succesfully');
      });

    formData.delete("recipe", recipe);
    formData.delete("tags", tags);
    formData.delete("user_id", this.user_id);
    formData.delete("username", this.usersUsername);

  }

  constructor(private auth:AuthService, private http:HttpClient, private cookieService:CookieService, private toastr: ToastrService) { }

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
        this.toastr.error('Log in to add recipes');
      });
    }
    else{
      this.isLoggedIn = false;
      this.toastr.error('Log in to add recipes');
    }
  }

}
