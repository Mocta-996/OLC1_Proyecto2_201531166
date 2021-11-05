import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';
import { Type } from '../Expresion/Retorno';
export class Round extends Instruccion {
    private value: Expresion;

    constructor(value: Expresion, line: number, column: number) {
        super(line, column)
        this.value = value
    }
    public execute(ambito: Ambito): any {
        let round = this.value.execute(ambito);
        try {
            if(round!= null && round != undefined){
                if(round.type == 0 ||round.type == 3 ){
                     return { value: Math.round(round.value),type:Type.DOUBLE}
                }
                else{
                throw new Error_(this.line, this.column, 'Semantico', 'error en redondeo, no es posible para la variable  '+ round.value +' '+ round.type );
                }
           
            }
            else {
               // throw new Error_(this.line, this.column, 'Semantico', 'error roundcate, no es posible para la variable  '+ round.value +' '+ round.type );
            }
        } catch (error) {
                throw new Error_(this.line, this.column, 'Semantico', 'Error con la funcion Round  '+ round.value +' '+ round.type );
        }

     
    }
}