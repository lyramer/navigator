import React from "react"

const ColorBar = (props) => {
	return (
		<div className="colorbar">
			{props.src.map((imgUrl, index) => {
				return <ColorBarImg key={index} src={imgUrl}/>
			})}
        </div>
	)
}
const ColorBarImg = (props) => {
	return (
		<img src={props.src}/>
	)
}
export default ColorBar;