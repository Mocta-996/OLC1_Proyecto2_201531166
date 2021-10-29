import React, { useEffect, useState, Component  } from "react";
import Editer from "./components/editer";
import { FiCodesandbox } from "react-icons/fi";
import "./styles.css";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";
const url = 'http://localhost:3001/';
function App() {
  const [ret, setRet] = useState("");
  
  const [js, setJs] = useState("");
  const [srcDoc, setsrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsrcDoc(`
    <script>${js}</script>
   
    `);
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
      //const json = await response;
      console.log(json);
      var texto = json.consola ;
      //var texto = json;
      if(json.error !=null){
        texto +='\n'+json.Errores;
      }
      setRet(texto);
      console.log(texto)
      //setAdvice(json.slip.advice);
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
              
              <textarea value={ret} />
                
              
            </div>
          </Grid>
        </Grid>
         {/*seccion de reportes*/ } 

        <Grid container>
        <Grid item xs={2} sm = {false} ></Grid>
          <Grid item xs={10} >
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" >Reporte Errores </Button>
              <Button variant="outlined">Arbol AST</Button>
              <Button variant="outlined">Tabla de simbolos</Button>
            </Stack>
          </Grid>


        </Grid>


        <Grid container>


        </Grid>
      </div>
     
  );
}

export default App;