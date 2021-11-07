import React, { useEffect } from "react";


const Graph = ({ dot }) => {
  
  useEffect(() => {
    d3.select("#graph-body").graphviz().renderDot(dot);
  }, [dot]);

  return <div id="graph-body"></div>;
};

export default Graph;