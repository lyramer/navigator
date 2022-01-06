import { osm, wms } from "./Components/DataSources";
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import {get} from 'ol/proj';
import {getCenter} from 'ol/extent'; 

// PROJECTION DEFINITIONS 
proj4.defs("EPSG:3573","+proj=laea +lat_0=90 +lon_0=-100 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");
register(proj4);

function getProjection() {
    const proj3573 = get('EPSG:3573');
    proj3573.setExtent(projExtent);
    return proj3573;
}
const projExtent = [-5326849.0625,-5326849.0625,5326849.0625,5326849.0625];
const projCenter = getCenter(projExtent);

// MAP OPTIONS
export const view = {
  projection: getProjection(),
  center:[-90, 70], // must be in lon/lat
  zoom: 3
}

// LAYER DEFINITIONS
export const layerDefs = [
    {
        id: 'osm',
        type: 'Tile',
        label: 'Open Street Maps',
        display: false,
        projection: null,
        colorbar: false,
        source: osm()
    },{
        id: 'sdi',
        type: 'Tile',
        label: 'Arctic SDI',
        display: false, 
        colorbar: false,
        projection: null,
        source: null
    },{
        id: "en",
        type: "Tile",
        label: "Earlier than Normal",
        display: false,
        colorbar: '/assets/en_colorbar.png',
        projection: view.projection,
        source: 
          wms({
            url: "http://206.12.92.18:10191/geoserver/BCParks/wms",
            params: {
              'VERSION':"1.1.0",
              'LAYERS':"BCParks:plot_prob_en",
              'SRS':"EPSG:4326",
              'TILED':true,
              'TRANSPARENT': true,
            },
            serverType: "geoserver",
            projection: "EPSG:4326"

          }),
      },{
        id: "nn",
        type: "Tile",
        label: "Near Normal",
        display: false,
        colorbar: '/assets/nn_colorbar.png',
        projection: view.projection,
        source: 
          wms({
            url: "http://206.12.92.18:10191/geoserver/BCParks/wms",
            params: {
              'VERSION':"1.1.0",
              'LAYERS':"BCParks:plot_prob_nn",
              'SRS':"EPSG:4326",
              'TILED':true,
              'TRANSPARENT': true,
            },
            serverType: "geoserver",
            projection: "EPSG:4326"
          }),
      },{
        id: "ln",
        type: "Tile",
        label: "Later than Normal",
        display: false,
        colorbar: '/assets/ln_colorbar.png',
        projection: view.projection,
        source: 
          wms({
            url: "http://206.12.92.18:10191/geoserver/BCParks/wms",
            params: {
              'VERSION':"1.1.0",
              'LAYERS':"BCParks:plot_prob_ln",
              'TILED':true,
              'SRS':"EPSG:4326",
              'TRANSPARENT': true,
            },
            serverType: "geoserver",
            projection: "EPSG:4326"
          }),
      }
    
]