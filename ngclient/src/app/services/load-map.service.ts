import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { getAPIkey } from '../_helpers/help-API-key';

@Injectable({
  providedIn: 'root'
})
export class LoadMapService {

  constructor() { }

  loader:any;

  loadMap(){
    this.loader = new Loader({
      apiKey: getAPIkey()
    })

    return this.loader.load()
  }

  delete(){
    delete this.loader;
  }
}
