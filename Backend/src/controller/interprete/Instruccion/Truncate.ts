import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';
import { Type } from '../Expresion/Retorno';
import { ListaError } from '../Instruccion/ListaError';
export class Truncate extends Instruccion {
    private value: Expresion;

    constructor(value: Expresion, line: number, column: number) {
        super(line, column)
        this.value = value
    }
    public execute(ambito: Ambito): any {
        let trun = this.value.execute(ambito);
        try {
            if(trun!= null && trun != undefined){
                if(trun.type == 0 ||trun.type == 3 ){
                     return { value: Math.trunc(trun.value),type:Type.ENTERO}
                }
                else{
                let er = new Error_(this.line, this.column, 'Semantico', 'error truncate, no es posible para la variable  '+ trun.value +' '+ trun.type );
                ListaError.push(er);
                throw er;
                }
           
            }
            else {
               // let er = new Error_(this.line, this.column, 'Semantico', 'error truncate, no es posible para la variable  '+ trun.value +' '+ trun.type );
            }
        } catch (error) {
                let er = new Error_(this.line, this.column, 'Semantico', 'Error con la funcion Truncate  '+ trun.value +' '+ trun.type );
                ListaError.push(er);
                throw er;
        }

     
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
}