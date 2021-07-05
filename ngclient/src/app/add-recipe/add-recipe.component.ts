import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { timer } from 'rxjs';

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
  public labelSuccessText:any;
  public labelErrorText:any;
    
  labelSuccessHidden = true;
  labelErrorHidden = true;

  getMsgFromBaby() {
    this.isDisabled = false;
  }

  getData(recipe: string, tags: string){
    var formData: any = new FormData();
    
    formData.append("recipe", recipe);
    formData.append("tags", tags);
    formData.append("user_id", this.user_id);
    formData.append("username", this.usersUsername);

    this.http.post('http://localhost:5000/api/recipes', formData)
    .subscribe(
      data => {
        this.labelErrorHidden = true;
        this.labelSuccessText = "Added a recipe succesfully";
        this.labelSuccessHidden = false;
        timer(3000).subscribe(x => { this.labelSuccessHidden = true; })
      },
      err => {
        this.labelSuccessHidden = true;
        this.labelErrorText = "There was an issue";
        this.labelErrorHidden = false;
        timer(3000).subscribe(x => { this.labelErrorHidden = true; })
    });

    formData.delete("recipe", recipe);
    formData.delete("tags", tags);
    formData.delete("user_id", this.user_id);
    formData.delete("username", this.usersUsername);

  }

  constructor(private auth:AuthService, private http:HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
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

}
