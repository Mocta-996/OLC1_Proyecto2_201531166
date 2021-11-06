import { Ambito } from "../Mas/Ambito";
import { Type } from "../Expresion/Retorno";
import { Instruccion } from "./Instruccion";
import { ListaError } from '../Instruccion/ListaError';

export class Funcion extends Instruccion {

    constructor(public id: string, public statment: Instruccion, public parametros: [],public subrutina:number, line: number, column: number,public tipo?:Type) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        if(this.tipo == null ||this.tipo == undefined){
             ambito.guardarFuncion(this.id, this,this.line ,this.column,this.subrutina,10);

        }else{
            ambito.guardarFuncion(this.id, this,this.line ,this.column,this.subrutina,this.tipo);
        }
       
    }
}