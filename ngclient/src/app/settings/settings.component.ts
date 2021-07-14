import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy, DoCheck, OnChanges, Input } from '@angular/core';

interface AppState{
  message: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy, OnChanges   {

  message$: Observable<string>

  constructor(private store: Store<AppState>) {
      this.message$ = this.store.select('message')
  }

  spanishMessage(){
    this.store.dispatch({type: 'SPANISH'})
  }

  frenchMessage(){
    this.store.dispatch({type: 'FRENCH'})
  }
 
  enabled1:boolean;
  enabled2:boolean;
  enabled3:boolean;
  test = false;
  
  madeChanges:boolean;

  ngOnChanges(){
    this.madeChanges = true;
    console.log(this.madeChanges)

  }

  clickedSave(){
    console.log("s")
  }

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

  ngOnDestroy(){
    console.log("destroy")

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
    this.madeChanges = false;
    console.log(this.madeChanges) 
  }
}