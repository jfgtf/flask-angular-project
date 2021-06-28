import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-opinion',
  templateUrl: './add-opinion.component.html',
  styleUrls: ['./add-opinion.component.css']
})
export class AddOpinionComponent implements OnInit {

  data_to_db = [''];
  isDisabled = true;

  getMsgFromBaby() {
    this.isDisabled = false;
  }

  getData(name: string, city: string, type: string, opinion: string){
    this.data_to_db = [name, city, type, opinion];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
