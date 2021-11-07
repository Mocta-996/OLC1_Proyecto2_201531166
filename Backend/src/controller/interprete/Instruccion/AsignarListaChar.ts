import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { type } from "os";
import {Primitivo,TipoPrimitivo}  from "../Expresion/Primitivo";
import { Type } from "../Expresion/Retorno";
import { ListaError } from '../Instruccion/ListaError';

export class AsignarListaChar extends Instruccion {

    private id: string;
    private value: Expresion;
    
    
    constructor(id: string, value: Expresion, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public execute(ambito: Ambito) {
        const variableOriginal = ambito.getVal(this.id)
        const nuevoValor = this.value?.execute(ambito)
        if (variableOriginal != null){
            // validar los tipos
            if( variableOriginal.type == 4 && nuevoValor.type == 1 && variableOriginal.edd == 6){
                const varaux = nuevoValor.value.split('');
                for(let i=0;i<varaux.length;i++){
                    var aux = new Primitivo( varaux[i],TipoPrimitivo.CARACTER,this.line, this.column);
                     variableOriginal.valor.push( aux);
                }
               
            }else {
                let er = new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: tipos no coinciden ' + this.id +' tipo '+ variableOriginal.type + 'tipoN '+nuevoValor.type);
                ListaError.push(er);
                throw er;
            }
           
        }else {
            let er = new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id);
            ListaError.push(er);
            throw er;
        }
    }

    
    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoasignacionlistachar"+aleatorio.toString();
        const val:{codigorama:string ,nombrenodo:string} =this.value.getCodigoAST();
        const codigorama =` 
        ${nombreNodoP}[label ="ASIGNARLISTA"];
        nodoIDS${nombreNodoP}[label="IDLISTA"];
        nodoid${nombreNodoP}[label="${this.id}"];
        ${val.codigorama}
        ${nombreNodoP} ->nodoIDS${nombreNodoP} ->nodoid${nombreNodoP};
        ${nombreNodoP}->${val.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
        
    }
}

export enum tiposvalidos{
    DOUBLE,
    ENTERO

}