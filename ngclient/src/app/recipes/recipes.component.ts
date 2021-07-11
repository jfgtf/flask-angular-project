import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private auth: AuthService) {}

  public recipes:any;

  ngOnInit(): void {
    this.auth.getRecipes()
    .then((recipes) => {
      if (recipes.status === 'success') {
        this.recipes = recipes.data;
      }
    })
    .catch((err) => {
    });
  }
}   
