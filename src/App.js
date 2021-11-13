import './App.css';
import { Map, MapLayer} from './Components/Map';
import { Layers} from './Components/Layers';
import { ColorBar} from './Components/Features';
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
    let activeLayers = this.props.activeLayers ? this.props.activeLayers : ["osm", "sdif"];

    let layers = [...this.state.layers]
    let zIndex = 0;

    // note that we must iterate through the activeLayers array in order
    // so that the order in which they are given in the url matches their zIndex
    for (const layerID of activeLayers) {
      let layerDefIndex = layers.findIndex(layer=> layer.id === layerID);
      if (layerDefIndex === undefined || layerDefIndex === -1) {
        console.error(`No layer with this ID (${layerID}) could be found`)
        this.setState({error: `No layer with this ID (${layerID}) could be found`});
      } else {
        layers[layerDefIndex].display = true;
        layers[layerDefIndex].zIndex = zIndex;
        zIndex++;
      }

    }

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
    let showColorBar = [];
    const ActiveLayerList = getActiveLayers(layers).map(layer => {
      if ( layer.colorbar ) showColorBar.push(layer.colorbar);
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
          {showColorBar && <ColorBar src={showColorBar}/>}
      </div>
    );
  }
}

export default App;