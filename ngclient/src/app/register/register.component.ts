import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent{ 
  isDisabled = true;

  passwordPattern = '';

  getPassword(s:string){
    this.passwordPattern = s;
  }

  getMsgFromBaby() {
    this.isDisabled = false;
  }
}
