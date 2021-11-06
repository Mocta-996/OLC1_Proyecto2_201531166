import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';
import { Type } from '../Expresion/Retorno';
import { ListaError } from '../Instruccion/ListaError';
export class Length extends Instruccion {
    private value: Expresion;

    constructor(value: Expresion, line: number, column: number) {
        super(line, column)
        this.value = value
    }
    public execute(ambito: Ambito): any {
        let len = this.value.execute(ambito);
                
        try {
            let lenret = len.value.length;
            //len.tamanio !=null || len.tamanio != undefined
            if(len.tamanio != null || len.tamanio != undefined){
                return { value: len.tamanio,type:Type.ENTERO}
           
            }
            else if(lenret != undefined){
                return { value: lenret,type:Type.ENTERO}
            }
            else {
                let er = new Error_(this.line, this.column, 'Semantico', 'error funcion length: '+ len.value +' '+ len.type );
                ListaError.push(er);
                throw er;
            }
            
            
        } catch (error) {
               let er = new Error_(this.line, this.column, 'Semantico', 'error funcion length: variable =  '+ len.value +' tipo = '+ len.type );
               ListaError.push(er);
                throw er;
        }
     
    }
}