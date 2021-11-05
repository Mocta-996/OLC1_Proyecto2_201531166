import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';
import { Type } from '../Expresion/Retorno';
export class Typeof extends Instruccion {
    private value: Expresion;

    constructor(value: Expresion, line: number, column: number) {
        super(line, column)
        this.value = value
    }
    public execute(ambito: Ambito): any {
        let tipo = this.value.execute(ambito);
        try {
            if(tipo!= null && tipo != undefined){
                if(tipo.edd ==Type.VECTOR ){
                    return { value:"vector",type:Type.CADENA}
           
                }else if(tipo.edd == Type.LISTA){
                     return { value: "lista",type:Type.CADENA}
                }else if(tipo.type == 0){
                     return { value: "int",type:Type.CADENA}
                }else if(tipo.type == 1){
                     return { value: "cadena",type:Type.CADENA}
                }else if(tipo.type == 2){
                     return { value: "booleano",type:Type.CADENA}
                }else if(tipo.type== 3){
                     return { value: "double",type:Type.CADENA}
                }else if(tipo.type == 4){
                     return { value: "caracter",type:Type.CADENA}
                }
                else{
                throw new Error_(this.line, this.column, 'Semantico', 'error en recuperacion de tipo, no es posible para la variable  '+ tipo.value +' '+ tipo.type );
                }
           
            }
            else {
               // throw new Error_(this.line, this.column, 'Semantico', 'error typeofcate, no es posible para la variable  '+ typeof.value +' '+ typeof.type );
            }
        } catch (error) {
                throw new Error_(this.line, this.column, 'Semantico', 'error en funcion Typeof:  no es posible para la variable  '+ tipo.value +' '+ tipo.type );
               
       }

     
    }
}