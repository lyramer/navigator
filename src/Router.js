import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import App from "./App";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/layers/:ids" element={<Application/>} />
      <Route element={<div>404 Not Found</div>} />
    </Routes>
  </BrowserRouter>
);

export default Router;


function Application() {
    // or here. Just call the hook wherever you need it.
    let { ids } = useParams();
    ids = ids.split("&")
    return (
        <App activeLayers={ids}/>
    )
  }
