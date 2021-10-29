import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';
import { Type } from '../Expresion/Retorno';
export class Length extends Instruccion {
    private value: Expresion;

    constructor(value: Expresion, line: number, column: number) {
        super(line, column)
        this.value = value
    }
    public execute(ambito: Ambito): any {
        let len = this.value.execute(ambito);

        if(len.type == Type.CADENA){
            let lenret = len.value.length;
            return { value: lenret,type:Type.ENTERO}
        } 
        else if(len.type == Type.VECTOR){
            let lenret = ambito.getVal(len.value);
            return { value: lenret.tamanio,type:Type.ENTERO}
        }
        else if(len.type == Type.LISTA){
            let lenret = ambito.getVal(len.value);  
            return { value: lenret.valor.length,type:Type.ENTERO}
        }
        else 
        {
            throw new Error_(this.line, this.column, 'Semantico', 'error length: '+ len.value +' '+ len.type );
     
        }
     
    }
}