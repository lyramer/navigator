import React from "react";
import {Popup} from "semantic-ui-react"
import "./panel.css";


class LayerSelect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        layers: [...props.layers]
      };
    }
  
    handleChange = (event) => {
      let layers = [...this.state.layers];
      layers = layers.map(layer => {
        if (event.target.id == layer.id) {
          layer.display = event.target.checked
        }
        return layer
      })
      this.props.setLayers(layers);
      this.setState({layers});  
    }
  
    render() {
      let layers = this.state.layers;
      return (
        <div className="layer-list">
          <h1>Data Sources</h1>
          <form className={"layer-form"} onSubmit={event => event.preventDefault()}>
            {/* // this is framework for populating the layer list from mapConfig.js
            // due to the need for customizing and ordering the layer order at this point
            // in the project, it is unused and left in place for future iterations */}
            {/* {this.state.layers.map(layer => {
              return CheckBox(layer, this.handleChange)
            })}                          */}
            <h2>Base Maps</h2>
            <div className="layer-group">
              {CheckBox(layers.find(layer => layer.id === "osm"), this.handleChange)}
              <Popup content='Currently Unavailable' trigger={CheckBox(layers.find(layer => layer.id === "sdi"), this.handleChange, true)} position='top right' />
            </div>
            <h2>Melt Onset Probability</h2>
            <div className="layer-group">
              {CheckBox(layers.find(layer => layer.id === "en"), this.handleChange)}
              {CheckBox(layers.find(layer => layer.id === "nn"), this.handleChange)}
              {CheckBox(layers.find(layer => layer.id === "ln"), this.handleChange)}
            </div>

          </form>
        </div>

      );
    }
  }

  export default LayerSelect;



function CheckBox(layer, handleChange, disabled=false) {
  return (
    <label key={"checkbox_" + layer.id} className={disabled ? "disabled" : ""}>
      {layer.label}
      <input 
          type="checkbox"
          id={layer.id}
          checked={layer.display} 
          onChange={handleChange} 
          disabled={disabled}
      />        
    </label>
  )
}