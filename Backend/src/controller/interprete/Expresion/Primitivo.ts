import { Ambito } from "../Mas/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from './Retorno';
import { ListaError } from '../Instruccion/ListaError';

export class Primitivo extends Expresion {

    constructor(private value: any, private tipo: TipoPrimitivo, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito): Retorno {
        if (this.tipo == 1) {
            return { value: this.value.toString(), type: Type.CADENA };
        } else if (this.tipo == 0) {
            return { value: Number(this.value), type: Type.ENTERO };
        } else if (this.tipo == 3) {
            return { value:parseFloat(this.value), type: Type.DOUBLE }
        }else if(this.tipo == 4){
            return { value: this.value, type: Type.CARACTER }
        } else {
            if (this.value.toString().toLowerCase() == "true") {
                return { value: true, type: Type.BOOLEANO }
            }
            return { value: false, type: Type.BOOLEANO }
        }
    }
}

export enum TipoPrimitivo {
    ENTERO = 0,
    CADENA  = 1,
    BOOLEANO = 2,
    DOUBLE = 3,
    CARACTER = 4
}