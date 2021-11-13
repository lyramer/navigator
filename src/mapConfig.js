import { osm } from "./Components/DataSources";
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
  center:[135, 90], // must be in lon/lat
  zoom: 4
}

// LAYER DEFINITIONS
export const layerDefs = [
    {
        id: 'osm',
        type: 'Tile',
        label: 'OSM',
        source: osm(),
        display: false,
        colorbar: false
    },{
        id: 'sdi',
        type: 'Tile',
        label: 'Arctic SDI',
        source: null,
        display: false, 
        colorbar: false
    },{
        id: 'fcst',
        type: 'Raster',
        label: 'FCST',
        display: false,
        source: '/assets/rainbow.png',
        colorbar: '/assets/fcst_colorbar.png',
        projection: view.projection,
        extent: [[-125.7567579406564, 52.21061843150153],[-125.68770670006346, 52.25167533087935]]
    }
    
]