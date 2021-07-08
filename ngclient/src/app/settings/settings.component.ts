import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private cookieService: CookieService, private auth: AuthService) { }

  public enabled1:boolean;
  public enabled2:boolean;
  public enabled3:boolean;
  isLoggedIn: boolean = false;
  user_id:any;

  clicked1e(){
    this.enabled1=true;
    localStorage.setItem("setting1", "true");
  }

  clicked1d(){
    this.enabled1=false;
    localStorage.setItem("setting1", "false");
  }

  clicked2e(){
    this.enabled2=true;
    localStorage.setItem("setting2", "true");
  }

  clicked2d(){
    this.enabled2=false;
    localStorage.setItem("setting2", "false");
  }

  clicked3e(){
    this.enabled3=true;
    localStorage.setItem("setting3", "true");
  }

  clicked3d(){
    this.enabled3=false;
    localStorage.setItem("setting3", "false");
  }

  ngOnInit(): void {
    if (localStorage.getItem("setting1") === null) {
      localStorage.setItem("setting1", "false");
    }
    if (localStorage.getItem("setting2") === null) {
      localStorage.setItem("setting2", "false");
    }
    if (localStorage.getItem("setting2") === null) {
      localStorage.setItem("setting2", "false");
    }
    if (localStorage.getItem("setting1") === "false") {
      this.enabled1=false;
    }
    else{
      this.enabled1=true;
    }
    if (localStorage.getItem("setting2") === "false") {
      this.enabled2=false;
    }
    else{
      this.enabled2=true;
    }
    if (localStorage.getItem("setting3") === "false") {
      this.enabled3=false;
    }
    else{
      this.enabled3=true;
    }
  }
}