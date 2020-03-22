import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { loadModules } from 'esri-loader';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {MatFabMenu} from '@angular-material-extensions/fab-menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  constructor(private bottomSheet: MatBottomSheet, private router: Router) {}

  // Controla el CSS del Backdrop
  fbbackMap = 'fbback_map_hide';
  isActive = false;

  public zoom = 0;
  basemapToggle: any;

  // Opciones del boton flotante
  fabOptions: MatFabMenu[] = [
    {
      id: 1,
      icon: 'settings',
      tooltip: 'Configuración',
      tooltipPosition: 'before'
    },
    {
      id: 2,
      icon: 'assessment',
      tooltip: 'Estadísticas',
      tooltipPosition: 'before'
    },
    {
      id: 3,
      // imgUrl: 'assets/318476.svg',
      icon: 'brightness_3', // Oscuro -> brightness_3 Claro -> highlight
      tooltip: 'Oscuro',
      tooltipPosition: 'before'
    },
  ];

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  public view: any;

  // click boton flotante
  clickBtnFlotante(): void {
    if (this.isActive) {
      this.hideBackdrop();
    } else {
      this.showBackdrop();
    }
  }

  // Mostrar Backdrop
  showBackdrop(): void {
    console.log('showBackdrop');
    this.fbbackMap = 'fbback_map_show';
    this.isActive = true;
    console.log(this.view.popup);
    this.view.popup.close(); // Se cierran los popups del mapa
  }

  // Ocultar Backdrop
  hideBackdrop(): void {
    console.log('hideBackdrop');
    this.fbbackMap = 'fbback_map_hide';
    this.isActive = false;
  }

  // Captura la opcion seleccionada del boton flotante
  selectedAction = (event: number) => {
    this.fbbackMap = 'fbback_map_hide';
    // Click opcion filtros
    if (event === 1) {
      this.openBottomSheet();
    }
    // Click opcion estadisticas
    if (event === 2) {
      this.view.map.basemap = 'dark-gray-vector';
    }
    // Click opcion Basemap
    if (event === 3) {
      console.log('BaseMap', this.fabOptions);
      const basemap = this.view.map.basemap.id;
      if (basemap === 'dark-gray-vector') {
        this.view.map.basemap = 'streets';
        this.fabOptions[2].icon = 'brightness_3';
        this.fabOptions[2].tooltip = 'Oscuro';
      } else {
        this.view.map.basemap = 'dark-gray-vector';
        this.fabOptions[2].icon = 'highlight';
        this.fabOptions[2].tooltip = 'Claro';
      }
    }
  }

  // Mostrar modal de filtros
  openBottomSheet(): void {
    this.bottomSheet.open(MapOptionsComponent, {
      // Se pasan valores al modal de filtros
      data: { zoom: this.zoom, view: this.view },
    });
  }

  async updateMap(value: number) {
    console.log('valor zoom: ', this.zoom);
    this.zoom = value;
    this.view.zoom = this.zoom;
    this.view.center = [-74.5, 6.2];
    this.view.map.basemap = 'dark-gray-vector';
    console.log('Propiedades Mapa: ', this.view.map.layers.items[0].url);
    console.log('Propiedades basemap: ', this.view.map);
    const [CSVLayer, BasemapToggle] = await loadModules(['esri/layers/CSVLayer', 'esri/widgets/BasemapToggle']);
    const url = 'assets/file_pqrs.csv';
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

  // Se carga el mapa
  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      // tslint:disable-next-line: max-line-length
      const [Track, Map, MapView, CSVLayer, Search, Legend, BasemapToggle, watchUtils] = await loadModules(['esri/widgets/Track', 'esri/Map', 'esri/views/MapView', 'esri/layers/CSVLayer', 'esri/widgets/Search', 'esri/widgets/Legend', 'esri/widgets/BasemapToggle', 'esri/core/watchUtils']);

      // const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv';
      // const url = '';
      const url = 'assets/2.5_week.csv';

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
        colorStops: [
          { color: 'rgba(63, 40, 102, 0)', ratio: 0 },
          { color: '#472b77', ratio: 0.083 },
          { color: '#4e2d87', ratio: 0.166 },
          { color: '#563098', ratio: 0.249 },
          { color: '#5d32a8', ratio: 0.332 },
          { color: '#6735be', ratio: 0.415 },
          { color: '#7139d4', ratio: 0.498 },
          { color: '#7b3ce9', ratio: 0.581 },
          { color: '#853fff', ratio: 0.664 },
          { color: '#a46fbf', ratio: 0.747 },
          { color: '#c29f80', ratio: 0.83 },
          { color: '#e0cf40', ratio: 0.913 },
          { color: '#ffff00', ratio: 1 }
        ],
        maxPixelIntensity: 25,
        minPixelIntensity: 0
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
        basemap: 'streets',
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

      legend.style = { type: 'card' }; // CSS leyenda tipo card

      this.view.ui.add(legend, {position: 'bottom-left'});  // Muestra las convenciones del mapa
      this.view.ui.add(search, {position: 'top-right'});    // Muestra el input de busqueda
      this.view.ui.remove([this.basemapToggle, 'zoom']);    // Elimina los botones de zoom
      // this.view.ui.add(this.basemapToggle, 'top-right'); // Muestra las opciones del mapa base
      this.view.ui.add(track, 'top-right');                 // Muestra el boton de MyLocation
      // this.view.ui.move([ 'zoom' ], 'top-right');        // Mover los botones de zoom a la izquierda

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
      this.view.container = null; // destroy the map view
    }
  }

}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-map-options',
  templateUrl: './map-options/map-options.component.html',
  styleUrls: ['./map-options/map-options.component.scss']
})
export class MapOptionsComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<MapOptionsComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Energía'},
    {value: 'pizza-1', viewValue: 'Gas'},
    {value: 'tacos-2', viewValue: 'GLP'}
  ];

  openLink(event: MouseEvent): void {
    console.log(event);

    // Evento que se ejecuta despues de cerrar el modal
    this.bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });

    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  async updateMap(value: number) {
    console.log('datos desde abajo: ', this.data);
    console.log('valor zoom: ', this.data.zoom);
    this.data.zoom = value;
    this.data.view.zoom = this.data.zoom;
    this.data.view.center = [-74.5, 6.2];
    this.data.view.map.basemap = 'dark-gray-vector';
    console.log('Propiedades Mapa: ', this.data.view.map.layers.items[0].url);
    console.log('Propiedades basemap: ', this.data.view.map);
    const [CSVLayer, BasemapToggle] = await loadModules(['esri/layers/CSVLayer', 'esri/widgets/BasemapToggle']);
    const url = 'assets/file_pqrs.csv';
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
    this.data.view.map.layers = layer; // Se agrega un nuevo layer CSV al mapa
    // this.data.view.ui.remove([this.basemapToggle]);
    this.data.basemapToggle = new BasemapToggle({view: this.data.view, nextBasemap: 'streets-navigation-vector'});
    // this.data.view.ui.add(this.basemapToggle, 'top-right'); // Muestra las opciones del mapa base
    // Evento que se ejecuta despues de cerrar el modal
    this.bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
    this.bottomSheetRef.dismiss(); // cerrar modal
  }

}
