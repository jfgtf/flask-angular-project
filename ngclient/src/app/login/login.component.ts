import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { timer} from 'rxjs';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor( private auth: AuthService, private cookieService: CookieService ) {}

  user: User = new User();

  labelSuccessHidden = true;
  labelErrorHidden = true;
  public labelSuccessText:any;
  public labelErrorText:any;

  onLogin(email:string, password:string): void {
    this.user.email = email;
    this.user.password = password;

    this.auth.login(this.user)
    .then((user) => {
      this.cookieService.set('token', user.token);
      this.labelErrorHidden = true;
      this.labelSuccessText = "Logged in succesfully";
      this.labelSuccessHidden = false;
      timer(3000).subscribe(x => { this.labelSuccessHidden = true; })
    })
    .catch((err) => {
      this.labelSuccessHidden = true;
      this.labelErrorText = err.error.message;
      this.labelErrorHidden = false;
      timer(3000).subscribe(x => { this.labelErrorHidden = true; })
    });
  }

  clicked(email:string, password:string){
    this.onLogin(email, password);
  }
}
