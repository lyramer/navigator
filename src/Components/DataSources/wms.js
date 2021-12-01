import * as olSource from "ol/source";

function wms(props) {
    const {url, params, serverType, projection="EPSG:4326"} = {...props}
    return new olSource.TileWMS({
        url,
        params,
        serverType,
        projection
        // Countries have transparency, so do not fade tiles:
    });
}

export default wms;