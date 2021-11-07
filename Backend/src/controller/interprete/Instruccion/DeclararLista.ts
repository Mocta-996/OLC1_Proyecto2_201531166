import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { ListaError } from '../Instruccion/ListaError';

export class DeclararLista extends Instruccion {

    private id: string[];
    private value: Expresion[];
    private tipo1:number;
    private tipo2:number;

    constructor(tipo1:number,id: string[],tipo2:number,value:Expresion[], line: number, column: number,) {
        super(line, column);
        this.id = id;
        this.tipo1 = tipo1;
        this.tipo2 = tipo2;
        this.value = value;
    }

    public execute(ambito: Ambito) {
        for (const actual of this.id) {
            /*ENTERO = 0,
            CADENA  = 1,
            BOOLEANO = 2,
            DOUBLE = 3,
            CARACTER = 4*/
            if(this.value == null){
                if(this.tipo1 == this.tipo2){
                    ambito.setVal(actual,this.value,this.tipo1, this.line, this.column,null,Type.LISTA);
                }
                else {
                    let er = new Error_(this.line, this.column, 'Semantico', 'No error en asignacion de tipos: declarado '+this.tipo1 +' ingresado '+this.tipo2)
                    ListaError.push(er);
                    throw er;
                }
            } else{
                ambito.setVal(actual,this.value,this.tipo1, this.line, this.column,null,Type.LISTA);
            }
        }
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
}