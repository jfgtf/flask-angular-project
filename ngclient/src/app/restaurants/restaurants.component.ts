import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader'
import { getAPIkey } from '../_helpers/help-API-key';
import { AuthService } from '../services/auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService, private cookieService:CookieService) {}
  hideLabel: boolean = true;
  openForm: boolean = true;
  title = 'google-maps'
  user_id: number;
  username: string;

  labelSuccessHidden = true;
  labelErrorHidden = true;
  public labelSuccessText:any;
  public labelErrorText:any;
  public opinions:any;

  tokenInClass:string|null;

  isDisabled = true;

  getMsgFromBaby() {
    this.isDisabled = false;
  }

  getData(name: string, city: string, type: string, opinion: string){
    var formData: any = new FormData();

    formData.append("name_of_restaurant", name);
    formData.append("city_of_restaurant", city);
    formData.append("type_of_restaurant", type);
    formData.append("opinion", opinion);
    formData.append("user_id", this.user_id);
    formData.append("username", this.username);

    this.http.post('http://localhost:5000/api/opinions', formData)
    .subscribe(
      data => {
        this.labelErrorHidden = true;
        this.labelSuccessText = "Added an opinion succesfully";
        this.labelSuccessHidden = false;
        timer(3000).subscribe(x => { this.labelSuccessHidden = true; })
      },
      err => {
        this.labelSuccessHidden = true;
        this.labelErrorText = "There was an issue";
        this.labelErrorHidden = false;
        timer(3000).subscribe(x => { this.labelErrorHidden = true; })
    });

    formData.delete("name");
    formData.delete("city");
    formData.delete("type");
    formData.delete("opinion");
    formData.delete("user_id");
    formData.delete("username");

  }

  clicked(){
    const token = this.cookieService.get('token');
    this.tokenInClass = token;
    if (token){
      this.auth.ensureAuthenticated(token)
      .then((user) => {
        if (user.status === 'success') {
          this.user_id = user.data.user_id;
          this.username = user.data.username;
          this.openForm = false;
          this.hideLabel = true;
        }
      })
      .catch((err) => {
        this.hideLabel = false;
        this.openForm = true;
      });
    }
    else{
      this.hideLabel = false;
    }
  }

  goBack(){
    this.openForm = true;
  }

  ngOnInit(): void {
    this.auth.getOpinions()
    .then((opinions) => {
      if (opinions.status === 'success') {
        this.opinions = opinions.data;
      }
    })
    .catch((err) => {
    });

    let loader = new Loader({
      apiKey: getAPIkey()
    })

    loader.load().then(() => {
      new google.maps.Map(document.getElementById("map") as HTMLElement,{
        center: {lat: 52.237049, lng: 21.017532},
        zoom: 6,
        styles:
        [
          {
            "featureType": "poi.attraction",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "weight": 8
              }
            ]
          },
          {
            "featureType": "poi.business",
            "elementType": "labels",
            "stylers": [
              {
                "weight": 8
              }
            ]
          },
          {
            "featureType": "poi.government",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.medical",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.place_of_worship",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.school",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.sports_complex",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
        
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        
        ]
      })
    })
  }
}