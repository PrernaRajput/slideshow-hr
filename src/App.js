import React from 'react';
import "h8k-components";

import Slides from './components/Slides';
import { SLIDES_DATA } from "./constants";

import "./App.css";

function App() {
  return (
    <>
      <h8k-navbar header="Slideshow App"></h8k-navbar>
      <div className="App">
        <Slides slides={SLIDES_DATA} />
      </div>
    </>
  );
}

export default App;
