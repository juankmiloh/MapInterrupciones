import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit, OnDestroy {

  constructor() {}

  zoom = 0;
  basemapToggle: any;

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  view: any;

  async updateMap(value: number) {
    this.zoom = value;
    this.view.zoom = this.zoom;
    this.view.center = [-74.5, 6.2];
    this.view.map.basemap = 'dark-gray-vector';
    console.log('Propiedades Mapa: ', this.view.map.layers.items[0].url);
    console.log('Propiedades basemap: ', this.view.map);
    const [CSVLayer, BasemapToggle] = await loadModules(['esri/layers/CSVLayer', 'esri/widgets/BasemapToggle']);
    const url = 'assets/export_1_std_1_2018.csv';
    const template = {
      title: '{place}',
      content: 'Magnitude {mag} {type} hit {place} on {time}.'
    };
    const renderer = {
      type: 'heatmap',
      // field: 'numero_pqrs',
      colorStops: [
        { color: 'rgba(63, 40, 102, 0)', ratio: 0 }, // rango de 0 a 1
        { color: '#6300df', ratio: 0.083 },          // Azul claro
        { color: '#002dfe', ratio: 0.100 },          // Azul
        { color: '#00ff2c', ratio: 0.166 },          // Verde Clarito
        { color: '#a1ff00', ratio: 0.249 },          // Verde
        { color: '#e5ff00', ratio: 0.332 },          // Amarillo claro
        { color: '#fef700', ratio: 0.415 },          // Amarillo
        { color: '#ffc700', ratio: 0.498 },          // Amarillo oscuro
        { color: '#fea701', ratio: 0.581 },          // Naranja claro
        { color: '#ff6400', ratio: 0.664 },          // Naranja
        { color: '#ff3000', ratio: 1 }               // Rojo
      ],
      maxPixelIntensity: 2000,
      minPixelIntensity: 50
    };
    const layer = new CSVLayer({
      url,
      title: 'Agregar Título',
      copyright: 'DESARROLLADO POR JUAN CAMILO HERRERA - CIAD SSPD',
      popupTemplate: template,
      renderer
    });
    this.view.map.layers = layer; // Se agrega un nuevo layer CSV al mapa
    this.view.ui.remove([this.basemapToggle]);
    this.basemapToggle = new BasemapToggle({view: this.view, nextBasemap: 'streets-navigation-vector'});
    this.view.ui.add(this.basemapToggle, 'top-right'); // Muestra las opciones del mapa base
  }

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      // tslint:disable-next-line: max-line-length
      const [Track, Map, MapView, CSVLayer, Search, Legend, BasemapToggle, watchUtils] = await loadModules(['esri/widgets/Track', 'esri/Map', 'esri/views/MapView', 'esri/layers/CSVLayer', 'esri/widgets/Search', 'esri/widgets/Legend', 'esri/widgets/BasemapToggle', 'esri/core/watchUtils']);

      // const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv';
      const url = '';

      // Paste the url into a browser's address bar to download and view the attributes
      // in the CSV file. These attributes include:
      // * mag - magnitude
      // * type - earthquake or other event such as nuclear test
      // * place - location of the event
      // * time - the time of the event

      const template = {
        title: '{place}',
        content: 'Magnitude {mag} {type} hit {place} on {time}.'
      };

      // The heatmap renderer assigns each pixel in the view with
      // an intensity value. The ratio of that intensity value
      // to the maxPixel intensity is used to assign a color
      // from the continuous color ramp in the colorStops property

      const renderer = {
        type: 'heatmap',
        // field: 'numero_pqrs',
        colorStops: [
          { color: 'rgba(63, 40, 102, 0)', ratio: 0 }, // rango de 0 a 1
          { color: '#6300df', ratio: 0.083 },          // Azul claro
          { color: '#002dfe', ratio: 0.100 },          // Azul
          { color: '#00ff2c', ratio: 0.166 },          // Verde Clarito
          { color: '#a1ff00', ratio: 0.249 },          // Verde
          { color: '#e5ff00', ratio: 0.332 },          // Amarillo claro
          { color: '#fef700', ratio: 0.415 },          // Amarillo
          { color: '#ffc700', ratio: 0.498 },          // Amarillo oscuro
          { color: '#fea701', ratio: 0.581 },          // Naranja claro
          { color: '#ff6400', ratio: 0.664 },          // Naranja
          { color: '#ff3000', ratio: 1 }               // Rojo
        ],
        maxPixelIntensity: 2000,
        minPixelIntensity: 50
      };

      const layer = new CSVLayer({
        url,
        title: 'Agregar Título',
        copyright: 'DESARROLLADO POR JUAN CAMILO HERRERA - CIAD SSPD',
        popupTemplate: template,
        renderer
      });

      // Configure the Map
      const mapProperties = {
        basemap: 'streets-navigation-vector',
        layers: [layer]
      };

      const map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [-74.5, 4.5], // [horizontal (long), vertical (lat)]
        zoom: 4,
        map
      };

      this.view = new MapView(mapViewProperties);

      // Display the loading indicator when the view is updating
      watchUtils.whenTrue(this.view, 'updating', (evt: any) => {
        // showLoad();
        console.log('showLoad', evt);
        console.log('showCoordenadas', this.view.center);
      });

      // Hide the loading indicator when the view stops updating
      watchUtils.whenFalse(this.view, 'updating', (evt: any) => {
        console.log('closeLoad', evt);
        console.log('closeCoordenadas', this.view.center); // guardar estas coordenadas en localStorage para cuando se haga una busqueda se actualice el mapa en las mismas coordenadas
      });

      const legend = new Legend({view: this.view});
      const search = new Search({view: this.view});
      this.basemapToggle = new BasemapToggle({view: this.view, nextBasemap: 'dark-gray-vector'});
      const track = new Track({view: this.view});

      this.view.ui.add(legend, 'bottom-left'); // Muestra las convenciones del mapa
      this.view.ui.add(search, {position: 'top-right'}); // Muestra el input de busqueda
      this.view.ui.move(['zoom', this.basemapToggle], 'top-left'); // Mover los botones de zoom a la izquierda
      this.view.ui.add(track, 'top-left'); // Muestra el boton de MyLocation
      // this.view.ui.remove([basemapToggle, 'zoom']);
      this.view.ui.add(this.basemapToggle, 'top-right'); // Muestra las opciones del mapa base

      return this.view;

    } catch (error) {
      console.log('EsriLoader: ', error);
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
