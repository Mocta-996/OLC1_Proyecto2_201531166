// clase para acceder a las variables

import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';

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
                throw new Error_(this.line, this.column, 'Semantico', 'Indice fuera de limite '+pos.value +'en ' + this.id);
            }
        }
        else{
            throw new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id);
        }
        

    }
}