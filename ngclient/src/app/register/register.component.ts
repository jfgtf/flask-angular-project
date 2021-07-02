import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { timer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit{ 
  constructor( private http: HttpClient ) {}

  labelSuccessHidden = true;
  labelErrorHidden = true;
  public labelSuccessText:any;
  public labelErrorText:any;
 
  isDisabled = true;
  passwordPattern: string;

  ngOnInit(){}

  clicked(email:string, firstName:string, lastName:string, username:string, password:string, repeatPassword: string){
    var formData: any = new FormData();

    formData.set("email", email);
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("username", username);
    formData.set("password", password);
    formData.set("repeatPassword", repeatPassword);

    this.http.post('http://localhost:5000/api/register', formData)
    .subscribe(
      // Successful responses call the first callback.
      data => {
        this.labelErrorHidden = true;
        this.labelSuccessText = "Registered succesfully";
        this.labelSuccessHidden = false;
        timer(3000).subscribe(x => { this.labelSuccessHidden = true; })
      },
      // Errors will call this callback instead:
      err => {
        this.labelSuccessHidden = true;
        this.labelErrorText = "Email already in use";
        this.labelErrorHidden = false;
        timer(3000).subscribe(x => { this.labelErrorHidden = true; })
      }
    );

    formData.delete("email");
    formData.delete("firstName");
    formData.delete("lastName");
    formData.delete("username");
    formData.delete("password");
    formData.delete("repeatPassword");
  }

  getPassword(s:string){
    this.passwordPattern = s;
  }

  getMsgFromBaby() {
    this.isDisabled = false;
  }
}
