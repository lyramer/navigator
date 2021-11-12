import {view} from './mapConfig';
import {transformExtent} from 'ol/proj';



// used to transform extents into different projections
export function transformExt(extent) {
  return transformExtent(extent, 'EPSG:3857', view.projection);
}

// helper to filter out inactive layers and return an array of active layer ID's
export function getActiveLayers(layers) {
  return layers.filter(layer => layer.display);
}


// helper to escape the trickiness of copying by reference, especially in loops...
export function updateLayerProp(layerList, layerID, data, propName) {
  return layerList.map(layer => {
    if (layer.id === layerID) layer[propName] = data
    return layer
  })
}
