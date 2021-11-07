import {Request,Response} from 'express';
import { Ambito } from './interprete/Mas/Ambito';
import {ListaWriteline} from './interprete/Instruccion/ListaWriteline';
import { ListaError } from './interprete/Instruccion/ListaError';
import { Funcion } from './interprete/Instruccion/Funcion';
import { StartWith } from './interprete/Instruccion/StartWith';
import { Writeline } from './interprete/Instruccion/Writeline';
import {lista_errores} from './interprete/Error/lista_errores';
import { ListaTabla } from './interprete/Mas/ListaTabla';
import  {exec} from 'child_process';
import path  from 'path';
let archivodot="";
class rjpController{
    

    public helloWorld (req:Request,res:Response){
        res.send("hola soy yo de nuevo");
    }

    
    public interpretar (req:Request,res:Response){
        ListaError.splice(0,ListaError.length);
         ListaTabla.splice(0,ListaTabla.length);
        var parser = require('./interprete/interprete');

        const text = req.body.entrada;
        console.log("texto de entrada:  "+text)
        if (text == "") {
            alert("Entrada vacia");
            return null;
        }
        try{
            const ast = parser.parse(text)
            console.log(ast)
            const ambito = new Ambito(null);
            try {
              for (const inst of ast) 
              {
                  if(inst instanceof Funcion){
                    inst.execute(ambito)
                  } 
              }
            } catch (error) {
              console.log(error)
            }
            try{
                for (const inst of ast){
                    if(!(inst instanceof Funcion) && !(inst instanceof StartWith) && !(inst instanceof Writeline) ){
                        const retornar1 = inst.execute(ambito);
                    }
                }
                for (const inst of ast){
                    if(inst instanceof StartWith){
                        const retornar = inst.execute(ambito);
                    }
                }
            }catch(error){
                console.log(error);
            }
            //---------------------------
             try {
              let codigoFinal = 'digraph G { \n principal[label="AST"];\n';
              for (const inst of ast) 
              {
                const codigo = inst.getCodigoAST();
                codigoFinal = codigoFinal + `
                ${codigo.codigorama}\n
                principal -> ${codigo.nombrenodo};\n`;
              }
               codigoFinal = codigoFinal + '}';
                console.log( codigoFinal);
                archivodot = codigoFinal;
            } catch (error) {
              console.log(error)
            }

            let resultado =  ListaWriteline;
            let errores = lista_errores;
            let mensaje= resultado.join("\n") +"\n"+errores.join("\n");
            res.send({consola:mensaje});
            ListaWriteline.splice(0,ListaWriteline.length);
            lista_errores.splice(0,lista_errores.length);
        }
        catch(err){
            console.log(err);
            res.json({
                salida : err,
                errores : err
            });
        }
    }



    public ReporteErr (req:Request,res:Response){
        let error = ListaError;
        let lexico =[]
        let sintactico =[]
        let semantico =[]

        for(let i=0 ; i<error.length ;i++){
            if(error[i].tipo == "Lexico"){
                lexico.push(error[i]);
            }else if(error[i].tipo == "Sintactico"){
                sintactico.push(error[i]);
            }else {
               semantico.push(error[i]);
            }
        }
        res.send({lexico:error });
        
    }

    public ReporteTabla (req:Request,res:Response){
        let tabla = ListaTabla;
        res.send({tabla:tabla }); 
    }

     public ReporteGrafo (req:Request,res:Response){
       
        res.send({grafo:archivodot }); 
    }

    /*
    public  getAST(sentencias:[]) {
    let codigoFinal = 'digraph G { \n principal[label="AST"];\n';
    sentencias.forEach((sentencia) => {
        if(sentencia.getCodigoAST()){
            const codigo = sentencia.getCodigoAST();
        codigoFinal = codigoFinal + `
            ${codigo.codigo}\n
            principal -> ${codigo.nombreNodo};\n`;
        }
        
        });
    codigoFinal = codigoFinal + '}';
    return codigoFinal;
    }*/

    /*public interpretar (req:Request,res:Response){
        var parser = require('./analizador/jpr');

        const text = req.body.entrada;
        console.log("texto de entrada:  "+text)
        try{
            let ast = new Arbol( parser.parse(text) );

            var tabla = new tablaSimbolos();
            ast.setGlobal(tabla);

            for(let m of ast.getInstrucciones()){

                if(m instanceof Excepcion){ // ERRORES SINTACTICOS
                    Errors.push(m);
                    ast.updateConsola((<Excepcion>m).toString());
                }
                var result = m.interpretar(ast, tabla);
                if(result instanceof Excepcion){ // ERRORES SINTACTICOS
                    Errors.push(result);
                    ast.updateConsola((<Excepcion>result).toString());
                }
            }
            res.json({consola:ast.getConsola(), Errores: Errors});
        }
        catch(err){
            console.log(err);
            res.json({
                salida : err,
                errores : err
            });
        }
    }*/
    
}   

export const controller = new rjpController();
