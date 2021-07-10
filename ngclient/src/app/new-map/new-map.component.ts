import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { getAPIkey } from '../_helpers/help-API-key';
import { LoadMapService } from '../services/load-map.service';

@Component({
  selector: 'app-new-map',
  templateUrl: './new-map.component.html',
  styleUrls: ['./new-map.component.css']
})
export class NewMapComponent implements OnInit {

  constructor(private map:LoadMapService) { }

  ngOnInit(): void {
    this.map.loadMap().then(() => {
      new google.maps.Map(document.getElementById("map") as HTMLElement,{
        center: {lat: 70, lng: 21.017532},
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
