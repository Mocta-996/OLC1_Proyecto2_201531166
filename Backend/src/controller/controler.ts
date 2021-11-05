import {Request,Response} from 'express';
import { Ambito } from './interprete/Mas/Ambito';
import {ListaWriteline} from './interprete/Instruccion/ListaWriteline';
import { ListaError } from './interprete/Instruccion/ListaError';
import { Funcion } from './interprete/Instruccion/Funcion';
//import Excepcion from './analizador/Excepciones/Excepcion';
//import Arbol from './analizador/tablaSimbolos/Arbol';
//import tablaSimbolos from './analizador/tablaSimbolos/tablaSimbolos';


//var Errors:Array<Excepcion> = new Array<Excepcion>();

class rjpController{

    public helloWorld (req:Request,res:Response){
        res.send("hola soy yo de nuevo");
    }

    
    public interpretar (req:Request,res:Response){
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
                    if(!(inst instanceof Funcion)){
                        const retornar = inst.execute(ambito);
                    }
                   

                }
            }catch(error){
                console.log(error);
            }
            let resultado =  ListaWriteline;
            let errores = ListaError;
            let mensaje= resultado.join("\n") +"\n"+errores.join("\n");
           
            res.send({consola:mensaje});
            ListaWriteline.splice(0,ListaWriteline.length);
            ListaError.splice(0,ListaError.length);
        }
        catch(err){
            console.log(err);
            res.json({
                salida : err,
                errores : err
            });
        }
    }



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
