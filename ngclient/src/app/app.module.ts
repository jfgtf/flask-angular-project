import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { YourProfileComponent } from './your-profile/your-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { RecipesComponent } from './recipes/recipes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { AddOpinionComponent } from './add-opinion/add-opinion.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    AddRecipeComponent,
    NavbarComponent,
    HomeComponent,
    YourProfileComponent,
    LoginComponent,
    RegisterComponent,
    RecipesComponent,
    NotFoundComponent,
    RecaptchaComponent,
    OpinionsComponent,
    AddOpinionComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD6WQvbBUddYIN5o2wHrk4vJs-ZBT18StY'
    }),
    RouterModule.forRoot([
      {
        path: '', 
        component: HomeComponent
      },
      {
        path: 'recipes', 
        component: RecipesComponent
      },
      {
        path: 'add-recipe', 
        component: AddRecipeComponent
      },
      {
        path: 'restaurants', 
        component: RestaurantsComponent
      },
      {
        path: 'restaurants/opinions', 
        component: OpinionsComponent
      },
      {
        path: 'restaurants/add-opinion', 
        component: AddOpinionComponent
      },
      {
        path: 'your-profile', 
        component: YourProfileComponent
      },
      {
        path: 'login', 
        component: LoginComponent
      },
      {
        path: 'register', 
        component: RegisterComponent
      },
      {
        path: '**', 
        component: NotFoundComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
