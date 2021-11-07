// clase para acceder a las variables

import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';
import { ListaError } from '../Instruccion/ListaError';

export class Acceso extends Expresion {
    public valor:string;
    constructor(public id: string, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let value = ambito.getVal(this.id)
        if (value != null) 
        {
            this.valor=value.valor.toString();
            return { value: value.valor, type: value.type, tamanio:value.tamanio,edd:value.edd}
        }
        else{
            let er = new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id);
            ListaError.push(er);
            throw er;
        }
       

    }
    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoacceso"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="ACCESO"];
        nodoval${nombreNodoP}[label="${this.valor}"];
        ${nombreNodoP} -> nodoval${nombreNodoP};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}