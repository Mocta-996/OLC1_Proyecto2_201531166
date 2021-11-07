import { type } from "os";
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";
import { ListaError } from '../Instruccion/ListaError';

export class For extends Instruccion {
    //private condicion: { execute: (arg0: Ambito) => any; }
    private Declaracion1:Expresion;
    private condicion:Expresion;
    private incremento:Expresion;
    private cuerpo: Instruccion;

    constructor( Declaracion1:Expresion, condicion:Expresion, incremento:Expresion, cuerpo: Instruccion,  line: number, column: number) {
        super(line, column);
        this.Declaracion1 = Declaracion1;
        this.condicion = condicion;
        this.incremento = incremento;
        this.cuerpo = cuerpo;
    }

    public execute(ambito: Ambito) {
        this.Declaracion1.execute(ambito);
        const valorcondicion = this.condicion.execute(ambito);
        let contador =0;
        if(valorcondicion.type != Type.BOOLEANO){
            let er =new Error_(this.line, this.column, 'Semantico', "La condicion a evaluar no es de tipo boolean");
            ListaError.push(er);
                throw er;
        }
        while (true) {
            // comprobacion de tipos
            const valorcondicion = this.condicion.execute(ambito)
            if(valorcondicion !=null && valorcondicion != undefined){
                if (!valorcondicion.value ) {
                    break;
                }
            }   
            const retorno = this.cuerpo.execute(ambito)
            if (retorno != null && retorno != undefined) {
                if (retorno.type == 'Break') {
                    break
                } else if (retorno.type == 'Continue') {
                    continue
                }
                else if(retorno.type == 'Return'){

                }
            }
            if (contador == 1000)
            { 
                break 
            
            }; // condicion para parar evitar ciclos infinitos

            // ejecutar incremento
            this.incremento.execute(ambito);
            contador++;
        }   

    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }

}
