// clase para acceder a las variables

import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';
import { ListaError } from '../Instruccion/ListaError';

export class AccesoVector extends Expresion {

    constructor(public id: string,public posicion:Expresion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let value = ambito.getVal(this.id)
        if (value != null) {
            // comprobando que el tamaño sea menor 
            let pos = this.posicion.execute(ambito);
            if(pos.value < value.tamanio){
                if(value.valor !=null){
                    let v = value.valor[pos.value].execute(ambito);
                    let va=v.value;
                    return { value: va, type: value.type }
                }
                else {
                    return { value: null, type: value.type }
                }
            }
            else{
   
            let er = new Error_(this.line, this.column, 'Semantico', 'Indice fuera de limite '+pos.value +'en ' + this.id);
            ListaError.push(er);
            throw er;
            }
        }
        else{
           
            let er = new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id);
            ListaError.push(er);
            throw er;
        }
        

    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        /*const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoacceso"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="ACCESO"];
        nodoval${nombreNodoP}[label="${this.valor}"];
        ${nombreNodoP} -> nodoval${nombreNodoP};
        `;*/
        return {codigorama:"vector" , nombrenodo:"accesovector"}
    }
}