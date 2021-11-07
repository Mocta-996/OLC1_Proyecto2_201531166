import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { ListaError } from '../Instruccion/ListaError';
export class Ternario extends Instruccion {

    private condicion:Expresion;
    private retorno1 :Expresion
    private retorno2 :Expresion

    constructor(condicion: Expresion, retorno1: Expresion,retorno2: Expresion, line: number, column: number) {
        super(line, column);
        this.condicion = condicion;
        this.retorno1 = retorno1;
        this.retorno2 = retorno2;
        
    }
    
    public execute(ambito: Ambito) {

        let resCondicion = this.condicion.execute(ambito);
        let ret1 = this.retorno1.execute(ambito);
        let ret2 = this.retorno2.execute(ambito);
        try{
        if (resCondicion.value){
            return { value: ret1.value,type:ret1.type}
        }else {
            return { value: ret2.value,type:ret2.type} 
        }
        }catch{
            let er =new Error_(this.line, this.column, 'Semantico', 'Operacion Ternaria no valida: ' + this.condicion +'?  '+this.retorno1 +' : '+this.retorno2);
            ListaError.push(er);
                throw er;
        }
        
       
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
}