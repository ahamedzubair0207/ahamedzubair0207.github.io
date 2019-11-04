import { Component, OnInit, ViewChild } from '@angular/core';
import * as atlas from 'azure-maps-control';

@Component({
  selector: 'app-votm-cloud-admin-network-map',
  templateUrl: './votm-cloud-admin-network-map.component.html',
  styleUrls: ['./votm-cloud-admin-network-map.component.scss']
})
export class VotmCloudAdminNetworkMapComponent implements OnInit {

  key: string = 'g5km6coCc-GZ7BuSq2OXfwBK_sswYgVMG10VZ6yu4Rg';
  map: any;
  datasource: any;
  controls = [];
  //GeoJSON feed of all earthquakes from the past 30 days. Sourced from the USGS.
  earthquakeFeed = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

  constructor() { }

  ngOnInit() {
    this.GetMap();
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.map.map.resize();
    //   console.log('RESIZE');
    // }, 5000);
  }

  GetMap() {
    //Initialize a map instance.
    this.map = new atlas.Map('myMap', {
      center: new atlas.data.Position(-97, 39),
      zoom: 3,
      // style: 'night',
      view: 'Unified',
      //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
      "subscription-key": this.key
    });


    //Wait until the map resources are ready.
    this.map.events.add('ready', () => {
      //Create a data source and add it to the map.
      this.datasource = new atlas.source.DataSource(null, {
        //Tell the data source to cluster point data.
        cluster: true,
        //The radius in pixels to cluster points together.
        clusterRadius: 45,
        //The maximium zoom level in which clustering occurs.
        //If you zoom in more than this, all points are rendered as symbols.
        clusterMaxZoom: 15
      });
      this.map.sources.add(this.datasource);


      //Create a bubble layer for rendering clustered data points.
      var clusterBubbleLayer = new atlas.layer.BubbleLayer(this.datasource, null, {
        //Scale the size of the clustered bubble based on the number of points inthe cluster.
        radius: [
          'step',
          ['get', 'point_count'],
          20,         //Default of 20 pixel radius.
          100, 30,    //If point_count >= 100, radius is 30 pixels.
          750, 40     //If point_count >= 750, radius is 40 pixels.
        ],

        //Change the color of the cluster based on the value on the point_cluster property of the cluster.
        color: [
          'step',
          ['get', 'point_count'],
          'rgba(0,255,0,0.8)',            //Default to green. 
          100, 'rgba(255,255,0,0.8)',     //If the point_count >= 100, color is yellow.
          750, 'rgba(255,0,0,0.8)'        //If the point_count >= 100, color is red.
        ],
        strokeWidth: 0,
        filter: ['has', 'point_count'] //Only rendered data points which have a point_count property, which clusters do.
      });
      //Add a click event to the layer so we can zoom in when a user clicks a cluster.
      this.map.events.add('click', clusterBubbleLayer, this.clusterClicked.bind(this));
      //Add mouse events to change the mouse cursor when hovering over a cluster.
      this.map.events.add('mouseenter', clusterBubbleLayer, () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.events.add('mouseleave', clusterBubbleLayer, () => {
        this.map.getCanvas().style.cursor = '';
      });
      //Add the clusterBubbleLayer and two additional layers to the map.
      this.map.layers.add([
        clusterBubbleLayer,
        //Create a symbol layer to render the count of locations in a cluster.
        new atlas.layer.SymbolLayer(this.datasource, null, {
          iconOptions: {
            image: 'none' //Hide the icon image.
          },
          textOptions: {
            textField: ['get', 'point_count_abbreviated'],
            offset: [0, 0.4]
          }
        }),
        //Create a layer to render the individual locations.
        new atlas.layer.SymbolLayer(this.datasource, null, {
          filter: ['!', ['has', 'point_count']] //Filter out clustered points from this layer.
        })
      ]);
      //Retrieve a GeoJSON data set and add it to the data source. 
      this.datasource.importDataFromUrl(this.earthquakeFeed);

      // control Option Map
      this.addControls();
    });
  }

  addControls() {
    // Map navigation control option

    //Remove all controls on the map.
    this.map.controls.remove(this.controls);
    this.controls = [];
    //Get input options.
    var positionOption = this.getSelectValue('controlPosition');
    var controlStyle = this.getSelectValue('controlStyle');
    //Create a zoom control.
    this.controls.push(new atlas.control.ZoomControl({
      zoomDelta: parseFloat(this.getSelectValue('zoomControlDelta')),
      style: controlStyle
    }));
    //Create a pitch control and add it to the map.
    this.controls.push(new atlas.control.PitchControl({
      pitchDegreesDelta: parseFloat(this.getSelectValue('pitchControlDelta')),
      style: controlStyle
    }));
    //Create a compass control and add it to the map.
    this.controls.push(new atlas.control.CompassControl({
      rotationDegreesDelta: parseFloat(this.getSelectValue('compassControlRotationDelta')),
      style: controlStyle
    }));
    //Create a style control and add it to the map.
    this.controls.push(new atlas.control.StyleControl({
      style: controlStyle,
      //Optionally specify which map styles you want to appear in the picker. 
      //All styles available with the S0 license tier appear by default in the control. 
      //If using a S1 tier license, you can use the mapStyles option to add premium styles such as 'satellite' and 'satellite_road_labels' to the control.
      //To add all available styles, you can use the 'all' keyword.
      mapStyles: ['road', 'road_shaded_relief', 'grayscale_light', 'night', 'grayscale_dark', 'satellite', 'satellite_road_labels'] // 'all'
      //Alternatively, specify an array of all the map styles you would like displayed in the style picker.
      //mapStyles: ['road', 'road_shaded_relief', 'grayscale_light', 'night', 'grayscale_dark', 'satellite', 'satellite_road_labels']
    }));
    //Add controls to the map.
    this.map.controls.add(this.controls, {
      position: positionOption
    });
  }

  clusterClicked(e) {
    if (e && e.shapes && e.shapes.length > 0 && e.shapes[0].properties.cluster) {
      //Get the clustered point from the event.
      var cluster = e.shapes[0];
      //Get the cluster expansion zoom level. This is the zoom level at which the cluster starts to break apart.
      this.datasource.getClusterExpansionZoom(cluster.properties.cluster_id).then((zoom) => {
        //Update the map camera to be centered over the cluster. 
        this.map.setCamera({
          center: cluster.geometry.coordinates,
          zoom: zoom,
          type: 'ease',
          duration: 200
        });
      });
    }
  }

  // Map navigation control panel

  getSelectValue(id) {
    var elm: any = document.getElementById(id);
    return elm.options[elm.selectedIndex].value;
  }
}
