import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';
import { Type } from '../Expresion/Retorno';
export class Tostring extends Instruccion {
    private value: Expresion;

    constructor(value: Expresion, line: number, column: number) {
        super(line, column)
        this.value = value
    }
    public execute(ambito: Ambito): any {
        let to_cadena = this.value.execute(ambito);
                
        try {

            if(to_cadena.type  == 0 || to_cadena.type  == 2){
                return { value: to_cadena.value.toString(),type:Type.CADENA}
           
            }
            else {
                 throw new Error_(this.line, this.column, 'Semantico', 'error no es posible convertir en cadena la variable: '+ to_cadena.value +'  de tipo  '+ to_cadena.type );
            }
            
            
        } catch (error) {
                throw new Error_(this.line, this.column, 'Semantico', 'error funcion ToString() con la variable:  '+ to_cadena.value +' tipo = '+ to_cadena.type );
        }
       
     
    }
}