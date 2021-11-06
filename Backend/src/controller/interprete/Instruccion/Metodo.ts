import { Ambito } from "../Mas/Ambito";
import { Type } from "../Expresion/Retorno";
import { Instruccion } from "./Instruccion";
import { ListaError } from '../Instruccion/ListaError';

export class Metodo extends Instruccion {

    constructor(public id: string, public statment: Instruccion, public parametros: [],public subrutina:string, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
       // ambito.guardarFuncion(this.id, this);
    }
}