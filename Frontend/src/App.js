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

const url = 'http://localhost:3001/';
function App() {
  const [ret, setRet] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setsrcDoc] = useState("");
  const [ errores, setErrores] = useState([]);
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

  // peticion para obtener los errores
  const fetchErrores = async () => {
    try {
      const response = await fetch('http://localhost:3001/ReporteErrores',requestOptions);
      const json = await response.json();
      
      console.log(json);
      /*serErrores({
        ...errores,
        lexico:json.lexico,
        sintactico :json.sintactico,
        semantico :json.semantico
      })*/
      setErrores(json.lexico)
      
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
        <Grid container>
          <Grid item xs={1} sm = {false} > </Grid>
            <Grid item xs={10}>
              <div style={{ backgroundColor: "hsl(225, 6%, 25%)", padding: 20 }}>
              
                <textarea value={ret}  />
              </div>
            </Grid>
        </Grid>
         {/*seccion de reportes*/ } 

        <Grid container>
        <Grid item xs={2} sm = {false} ></Grid>
          <Grid item xs={10} >
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={()=>fetchErrores()} >Reporte Errores </Button>
              <Button variant="outlined">Arbol AST</Button>
              <Button variant="outlined">Tabla de simbolos</Button>
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



        
      </div>
     
  );
}

export default App;
/*
 <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>



 */