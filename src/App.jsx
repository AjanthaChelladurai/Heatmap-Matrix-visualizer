import React from "react";
import Heatmap from "./Heatmap";
import "./App.css";

function App() {
  return (
    <div className="app-container">
    <h1 className="title">Heatmap Matrix Visualizer</h1>
    <Heatmap rows={20} cols={20} />
    </div>
  );
}

export default App;
