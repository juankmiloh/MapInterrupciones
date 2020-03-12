import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit, OnDestroy {

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  view: any;

  constructor() {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView] = await loadModules(["esri/Map", "esri/views/MapView"]);

      // Configure the Map
      const mapProperties = {
        basemap: "streets"
      };

      const map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [-74.5, 6.2],
        zoom: 6,
        map: map
      };

      this.view = new MapView(mapViewProperties);

      return this.view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

}
