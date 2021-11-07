import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { ListaError } from '../Instruccion/ListaError';

export class DeclararVector extends Instruccion {

    private id: string[];
    private value: Expresion[] |null;
    private tipo1:number;
    private tamaño?:Expresion;  // para vectores
    private tipo2?:number;

    constructor(tipo1:number,id: string[], value: Expresion[], line: number, column: number,tamaño?:Expresion,tipo2?:number) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipo1 = tipo1;
        this.tamaño =tamaño;
        this.tipo2 = tipo2;
    }

    public execute(ambito: Ambito) {
        for (const actual of this.id) {
            // vecotres sin valores
            //   public setVal(id: string, value: any, type: Type, line:number, column:number)
            /*ENTERO = 0,
            CADENA  = 1,
            BOOLEANO = 2,
            DOUBLE = 3,
            CARACTER = 4*/
            if(this.value == null){
                if(this.tipo1 == this.tipo2){
                    let ta = this.tamaño?.execute(ambito);
                    
                    ambito.setVal(actual,[],this.tipo1, this.line, this.column,ta?.value,Type.VECTOR);
                    /*if(this.tipo1 == 0){
                        ambito.setVal(actual,[],this.tipo1, this.line, this.column,this.tamaño);
                    }else if(this.tipo1 == 1){
                        ambito.setVal(actual,[],this.tipo1, this.line, this.column,this.tamaño);
                    }
                    else if(this.tipo1 == 2){}
                    else if(this.tipo1 == 3){}
                    else if(this.tipo1 == 4){}*/
                }
                else {
                    let er = new Error_(this.line, this.column, 'Semantico', 'No error en asignacion de tipos: declarado '+this.tipo1 +' ingresado '+this.tipo2)
                    ListaError.push(er);
                    throw er;
                }
            } else{

                let tam = this.value.length;
                ambito.setVal(actual,this.value,this.tipo1, this.line, this.column,tam,Type.VECTOR);
            }
        }
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
}