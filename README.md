This project is built off the [base implementation for OpenLayers in React](https://github.com/lyramer/basic-ol-react-map) I created for this project and [others](https://github.com/lyramer/parcel-vegetation). I recommend starting there and using this and other example repos on how you can build off this base map.

Perhaps the most notable aspect of this particular extension of the basic-ol-react-map is the use of the [North Pole LAEA Canada Projection (EPSG:3573)](https://epsg.io/3573). This included [creating a proj4 definition](https://openlayers.org/en/latest/apidoc/module-ol_proj_proj4.html) and installing [the proj4 npm package](https://www.npmjs.com/package/proj4).

I've also included the display of the [Arctic SDI topographic basemap](https://arctic-sdi.org/services/topografic-basemap/), which is a WMTS service. Sadly, they have disabled CORS on their WMTS server (!!!) so a workaround is being actively developed; for the moment, we are making use of the kind public demo of the [cors-anywhere library](https://github.com/Rob--W/cors-anywhere/) but this is obviously a development-only solution and cannot function in any sort of production capacity.

## React Router & Custom URLs

This project also adds [React Router](https://reactrouter.com/) to basic-ol-react-map so that custom urls to a given set of map layers could be created. This is because the client wishes to do A/B testing with image products they've created, and would like to send their users a link to a particular map without exposing access to any sort of layer toggling on the user's end. The url pattern for these custom image product stacks is as follows

mydomain.com/layers/[firstLayerID]&[secondLayerID]&[thirdLayerID]&...

The order in which the ids are listed are the order in which they are rendered on the map, bottom to top.

The layer IDs themselves are defined in layerDefs, in the [src/mapConfig.js](/src/mapConfig.js) file. 

Since going to the base url will show no layers in this configuration, I have set it up so that the base url will display osm and Arctic SDI data. 

## Getting Up and Running

First off, make sure you're running npm 6.14.14, and node 14.17.5. If you type `npm -v` or `node -v` and you get different versions, [follow the install instructions for nvm](https://github.com/nvm-sh/nvm) and then follow the same guide on how to install and use the correct versions of npm and node in your project directory.

*Not following these instructions will lead to weird behaviour, including failures to compile which will make you think it's an issue with some package or another. I am speaking from personal experience here. Do not skip this step; you'll spend days debugging weird errors until you figure out that it has nothing to do with Babel or Sass or react-scripts or whatever it is saying*

Once you've done this, navigate to your project root and run `npm install`. 

After its done installing, running `npm start` should spin it up on your local port 3030 and you should see it if you navigate to localhost:3030 in your browser. Yay!


## Hints

The mapConfig.js file will probably come quite in handy. (I had to change this from the basemap's config.json due to needing to import the proj4 library in order to create the layer definitions properly).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
