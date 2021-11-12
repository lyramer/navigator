import './App.css';
import { Map, MapLayer} from './Components/Map';
import { Layers} from './Components/Layers';
import {  wmts} from './Components/DataSources'
import React, { Component } from "react";
import * as config from "./mapConfig.js";
import { getActiveLayers, updateLayerProp } from './helpers';

class App extends Component{
  constructor(props) {
    super(props);    
    this.state = {
      layers: [...config.layerDefs],
    }
  }

  componentDidMount(){
   
    // grab the active layers from the url params (if specified)
    let activeLayers = this.props.activeLayers ? this.props.activeLayers : ["osm", "sdi"];

    let layers = [...this.state.layers]
    let zIndex = 0;
    layers = layers.map(layer => {
      if (activeLayers.includes(layer.id)) {
        layer.display = true;
        layer.zIndex = zIndex;
        zIndex++;
      }
      return layer
    })
    this.setState({layers});

    // grab the WMTS data from SDI
    fetch("https://cors-anywhere.herokuapp.com/http://basemap.arctic-sdi.org/mapcache/wmts/?request=GetCapabilities&service=wmts")
        .then(res => res.text())
        .then(async (text) => {
            const wmtsData = await wmts(text);
            if (wmtsData.error) throw new Error(wmtsData.error);
            let layers = [...this.state.layers];
            layers = updateLayerProp(layers, "sdi", wmtsData, "source");
            this.setState({layers})
        })
        .catch((error) => {
          console.error(error)
          this.setState({
              error
          });
        })

    

  }


  render(){
    const layers = [...this.state.layers];
    let showColorBar = false;
    const ActiveLayerList = getActiveLayers(layers).map(layer => {
      if ( layer.colorbar ) showColorBar = true;
      return <MapLayer key={layer.id} {...layer}/>
    })

    return (
      <div className="App">
          <Map             
            center={config.view.center} 
            zoom={config.view.zoom} 
            projection={config.view.projection}>
            <Layers>   
              {ActiveLayerList}
            </Layers>
          </Map>
      </div>
    );
  }
}

export default App;