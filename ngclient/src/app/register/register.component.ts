import { Component} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent{ 
  data_to_db = [''];
  isDisabled = true;

  getMsgFromBaby() {
    this.isDisabled = false;
  }

  getData(email: string, firstName: string, lastName: string, username: string, password: string, repeatPassword: string ){
    this.data_to_db = [email, firstName, lastName, username, password, repeatPassword];
  }

  test2(){
    return this.data_to_db;
  }
}
