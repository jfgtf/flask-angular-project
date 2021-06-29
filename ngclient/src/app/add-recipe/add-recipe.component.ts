import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  data_to_db = [''];
  isDisabled = true;

  getMsgFromBaby() {
    this.isDisabled = false;
  }

  getData(recipe: string, tags: string){
    this.data_to_db = [recipe, tags];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
