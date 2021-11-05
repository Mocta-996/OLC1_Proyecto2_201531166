// clase para acceder a las variables

import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';

export class Acceso extends Expresion {

    constructor(public id: string, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let value = ambito.getVal(this.id)
        if (value != null) return { value: value.valor, type: value.type, tamanio:value.tamanio}
        throw new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id)

    }
}