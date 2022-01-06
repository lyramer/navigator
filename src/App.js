import './App.css';
import { Map, MapLayer} from './Components/Map';
import { Layers} from './Components/Layers';
import { ColorBar} from './Components/Features';
import {  wmts} from './Components/DataSources'
import { Panel, LayerSelect } from './Components/Panel'
import React, { Component } from "react";
import * as config from "./mapConfig.js";
import { getActiveLayers, updateLayerProp } from './helpers';
import {Button, Input} from "semantic-ui-react"


class App extends Component{
  constructor(props) {
    super(props);    
    this.state = {
      layers: [...config.layerDefs],
      layerURL: "",
      layerURLCopied: false,
      showPanel: this.props.showPanel ?? true,

    }
  }

  componentDidMount(){
   
    // grab the active layers from the url params (if specified)
    let activeLayers = this.props.activeLayers ? this.props.activeLayers : ["osm", "en", "nn", "ln"];

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
    // fetch("https://cors-anywhere.herokuapp.com/http://basemap.arctic-sdi.org/mapcache/wmts/?request=GetCapabilities&service=wmts")
    fetch("http://basemap.arctic-sdi.org/mapcache/wmts/?request=GetCapabilities&service=wmts")
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

  setLayers = (layers) => {
    // reset URL
    this.setState({
      layerURL: "",
      layerURLCopied: false,
    })
    // copy new layer list into state
    this.setState({layers})
  }

  getURL = () => {
    let activeLayers = this.state.layers.filter((layer) => layer.display === true).map((layer) => layer.id);
    console.log("activeLayers", activeLayers)
    let newURL = window.location.href + "layers/" + activeLayers.join("&")
    this.setState({layerURL: newURL})
  }

  copyURLtoClipboard = () => {
    navigator.clipboard.writeText(this.state.layerURL)
    this.setState({layerURLCopied: true});
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
        {this.state.showPanel &&
          <Panel>
            <LayerSelect layers={this.state.layers} setLayers={this.setLayers}/>
            <div className={"get-url"}>
              <Button onClick={this.getURL}>Get Permanent URL for Currently Active Layers</Button>
              {this.state.layerURL &&
                <Input
                  action={{
                    color: 'teal',
                    labelPosition: 'right',
                    icon: 'copy',
                    onClick: this.copyURLtoClipboard,
                  }}
                  defaultValue={this.state.layerURL}
                />
              }
              {this.state.layerURLCopied && 
                <div className='copied'>URL Copied to Clipboard</div>
              }
            </div>
          </Panel>
        }
                   
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