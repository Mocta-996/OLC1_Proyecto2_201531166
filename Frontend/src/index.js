import { StrictMode } from "react";
import ReactDOM from "react-dom";
import  Graph from "./components/graph";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Graph />
  </StrictMode>,
  rootElement
);
