import { Component, OnInit } from '@angular/core';
import {
  MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader, GoogleMapAPILoaderConfig
} from 'angular-maps';

@Component({
  selector: 'app-votm-cloud-admin-network-map',
  templateUrl: './votm-cloud-admin-network-map.component.html',
  styleUrls: ['./votm-cloud-admin-network-map.component.scss']
})
export class VotmCloudAdminNetworkMapComponent implements OnInit {

  _markerTypeId = MarkerTypeId;
  _options: IMapOptions = {
    disableBirdseye: false,
    disableStreetside: false,
    navigationBarMode: 1,
    zoom: 6
  };

  _box: IBox = {
    maxLatitude: 32,
    maxLongitude: -92,
    minLatitude: 29,
    minLongitude: -98
  };

  private _iconInfo: IMarkerIconInfo = {
    markerType: MarkerTypeId.FontMarker,
    fontName: 'FontAwesome',
    fontSize: 48,
    color: 'red',
    markerOffsetRatio: { x: 0.5, y: 1 },
    text: '\uF276'
  };

  latlon: any;

  constructor() {
    this.getLocation();
  }

  ngAfterViewInit() {

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latlon = {};
        this.latlon.latitude = position.coords.latitude
        this.latlon.longitude = position.coords.longitude;
        // this.GetMap();
        this._box = {
          maxLatitude: this.latlon.latitude + 2,
          maxLongitude: this.latlon.longitude + 2,
          minLatitude: this.latlon.latitude - 1,
          minLongitude: this.latlon.longitude - 2
        };
        console.log('this.latlon ', this.latlon)
      });
    } else {
      this.latlon = {};
      this.latlon.error = "Geolocation is not supported by this browser.";
    }
  }

  showPosition(position) {
    debugger;
    this.latlon = "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;
  }

  _click() {
    console.log("hello world...");
  }

  ngOnInit() {
  }

  GetMap() {
    var map = new Microsoft.Maps.Map('#xmap',
      {});

    map.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.aerial,
      center: new Microsoft.Maps.Location(this.latlon.longitude, this.latlon.latitude),
      zoom: 15
    });
  }

}
