import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Error_ } from '../Error/Error';
import { Type } from '../Expresion/Retorno';
import { ListaError } from '../Instruccion/ListaError';
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
                 let er = new Error_(this.line, this.column, 'Semantico', 'error no es posible convertir en cadena la variable: '+ to_cadena.value +'  de tipo  '+ to_cadena.type );
                ListaError.push(er);
                throw er;
            }
            
            
        } catch (error) {
                let er = new Error_(this.line, this.column, 'Semantico', 'error funcion ToString() con la variable:  '+ to_cadena.value +' tipo = '+ to_cadena.type );
                ListaError.push(er);
                throw er;
        }
       
     
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
}