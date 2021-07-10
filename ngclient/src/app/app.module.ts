import { LoadMapService } from './services/load-map.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

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
import { TableComponent } from './table/table.component';
import { SettingsComponent } from './settings/settings.component';
import { TablesComponent } from './tables/tables.component';
import { ChildComponent } from './child/child.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { NewMapComponent } from './new-map/new-map.component';

import { SortDirective } from './table/directive/sort.directive';

import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { RecaptchaModule } from "ng-recaptcha";
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './services/auth.interceptor';


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
    TableComponent,
    SettingsComponent,
    DataTableComponent,
    ButtonsComponent,
    SortDirective,
    TablesComponent,
    ChildComponent,
    NewMapComponent,
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
        path: 'settings', 
        component: SettingsComponent
      },
      {
        path: 'tables', 
        component: TablesComponent
      },
      {
        path: 'new-map', 
        component: NewMapComponent
      },
      {
        path: 'buttons', 
        component: ButtonsComponent
      },
      {
        path: '**', 
        component: NotFoundComponent
      }
    ],{ onSameUrlNavigation: 'reload' }),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot({
      timeOut:1000,
      preventDuplicates: true
    })
  ],
  providers: [
    AuthService, 
    CookieService, 
    LoadMapService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
