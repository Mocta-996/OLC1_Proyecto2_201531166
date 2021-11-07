import { Graphviz } from 'graphviz-react';


//const Graphviz = dynamic(() => import('graphviz-react'), { ssr: false });

const graph = () => {
  const dot = 'graph{a--b}';

  return <Graphviz dot={dot} />;
}

export default graph;