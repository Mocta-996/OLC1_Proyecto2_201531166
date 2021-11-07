import React, { useEffect, useState, Component  } from "react";
import Editer from "./components/editer";
import { FiCodesandbox } from "react-icons/fi";
import "./styles.css";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Graph from "./components/graph";


const url = 'http://localhost:3001/';
function App() {
  const [ret, setRet] = useState("");
  const [erroresconsola, setErroersconsola] = useState([]);
  const [js, setJs] = useState("");
  const [srcDoc, setsrcDoc] = useState("");
  const [ errores, setErrores] = useState([]);
  const [ tabla, setTabla] = useState([]);
  const [ grafo, setGrafo] = useState("");
  //{lexico:"",sintactico:"",semantico:""}

  useEffect(() => {
    const timeout = setTimeout(() => {
    setsrcDoc(`
    <script>${js}</script>`);
    }, 250);
    return () => {
      clearTimeout(timeout);
    };
  }, [js],
  );

 
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({entrada:js})
  };
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/interpretar',requestOptions);
      const json = await response.json();
      //setRet(json.consola);
      //setErroersconsola(json.error);
      //console.log(json);
      var texto = json.consola ;
      if(json.error !=null){
        texto +='\n'+json.Errores;
      }
      setRet(texto);
      //console.log(texto)
    } catch (error) {
      console.log("error", error);
    }
  };

  // peticion para obtener tabla de simbolos
  const fetchTabla = async () => {
    try {
      const response = await fetch('http://localhost:3001/TablaSimbolos',requestOptions);
      const json = await response.json();
      
      console.log(json);
      setTabla(json.tabla)
      
      
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchErrores = async () => {
    try {
      const response = await fetch('http://localhost:3001/ReporteErrores',requestOptions);
      const json = await response.json();
      
      console.log(json);
      setErrores(json.lexico)
      
    } catch (error) {
      console.log("error", error);
    }
  };

    // peticion para obtener tabla de simbolos
  const fetchGrafo = async () => {
    try {
      const response = await fetch('http://localhost:3001/Grafo',requestOptions);
      const json = await response.json();
      
      console.log(json);
      setGrafo(json.grafo)
      
      
    } catch (error) {
      console.log("error", error);
    }
  };
  


  return (
      <div className="panel top-panel">
        <Grid container>
          <Grid container>
            <Grid item xs={12} >
              <Box display="flex" flexDirection="row">
                <Box>
                  <p className="para" style={{ marginTop: 15, marginLeft: 10 }}>
                    SYSCOMPILER  - OLC1
                  </p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>

        {/* seccion de botones */  }
        <Grid container>
        <Grid item xs={2} sm = {false} ></Grid>
          <Grid item xs={10} >
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" >Crear Archivo</Button>
              <Button variant="outlined">Abrir Archivo</Button>
              
              <Button variant="outlined" onClick={()=>fetchData()} >Ejecutar </Button>
            </Stack>
          </Grid>
        </Grid>
        {/* SECCION DE EDITOR DE CODIGO */ }
        <Grid item xs={1} sm = {false} > </Grid>
        <Grid item xs={10} >
            <Editer
              title="tab1"
              language="javascript"
              value={js}
              onChange={setJs}
            />
           
          </Grid>
        </Grid>

        {/* SECCION DE CONSOLA */ }
                  
              
            <div class="row">
            <p className="para" style={{ marginTop: 15, marginLeft: 10 }}>
                    Consola
            </p>
              <div class="col-md-1"></div>
                  <div class="col-xs-10 col-sm-10 col-md-10">
                    <div className="display-linebreak" class ="p-3 mb-2 bg-dark text-white"> 
                      <div style={{ whiteSpace: "break-spaces" }}> {ret} </div>
                   
                  </div> 
                </div>
            </div>
                  
           
      
  
         {/*seccion de reportes*/ } 

        <Grid container>
        <Grid item xs={2} sm = {false} ></Grid>
          <Grid item xs={10} >
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={()=>fetchErrores()} >Reporte Errores </Button>
              <Button variant="outlined"  onClick={()=>fetchGrafo()} >Arbol AST</Button>
              <Button variant="outlined" onClick={()=>fetchTabla()}>Tabla de simbolos</Button>
            </Stack>
          </Grid>
        </Grid>

        {/* SECCION DE REPORTE DE ERRORES  */}
        <div>
        <Grid container>
        <Box display="flex" flexDirection="row">
                <Box>
                  <p className="para" style={{ marginTop: 15, marginLeft: 10 }}>
                    Reporte de Errores
                  </p>
                </Box>                
          </Box>
        </Grid>
        <Box>
        <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tipo de Error</th>
                <th scope="col">Descripcion </th>
                <th scope="col">Linea</th>
                <th scope="col">Columna</th>
              </tr>
            </thead>
            <tbody>
            {errores.map(lexico => {
                let j=0;
                return (
                <tr>
                <th scope="row">{}</th>
                <td>{lexico.tipo}</td>
                <td>{lexico.mensaje}</td>
                <td>{lexico.linea}</td>
                <td>{lexico.columna}</td>
                </tr>
                );
                j++;
            })}
            </tbody>
          </table> 
        </Box>
        </div>

        {/* SECCION TABLA DE SIMBOLO  */}
        <div>
        <Grid container>
        <Box display="flex" flexDirection="row">
                <Box>
                  <p className="para" style={{ marginTop: 15, marginLeft: 10 }}>
                    Tabla de simbolos
                  </p>
                </Box>                
          </Box>
        </Grid>
        <Box>
        <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Identificador</th>
                <th scope="col">Tipo  </th>
                 <th scope="col">Tipo  </th>
                <th scope="col">Entorno</th>
                <th scope="col">Linea</th>
                 <th scope="col">Columna</th>
              </tr>
            </thead>
            <tbody>
             {tabla.map(tabla => {
                return (
                <tr>
                <th scope="row">{}</th>
                <td>{tabla.id}</td>
                <td>{tabla.tipo1}</td>
                <td>{tabla.tipo2}</td>
                <td>{tabla.ambito}</td>
                <td>{tabla.linea}</td>
                <td>{tabla.columna}</td>
                </tr>
                );
            })}
          
            </tbody>
          </table> 
        </Box>
        </div> 

        <div>
        <Grid container>
        <Box display="flex" flexDirection="row">
                <Box>
                  <p className="para" style={{ marginTop: 15, marginLeft: 10 }}>
                  Grafica AST
                  </p>
                </Box>                
          </Box>
        </Grid>
        <Graph dot={grafo}/>
        </div>     
      </div>
     
  );
}

export default App;
