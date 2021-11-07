import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import {Primitivo,TipoPrimitivo}  from "../Expresion/Primitivo";
import { ListaError } from '../Instruccion/ListaError';

export class DeclararListaChar extends Instruccion {

    private id: string[];
    private value: Expresion;
    private tipo1:number;

    constructor(tipo1:number,id: string[],value:Expresion, line: number, column: number,) {
        super(line, column);
        this.id = id;
        this.tipo1 = tipo1;
        this.value = value;
    }

    public execute(ambito: Ambito) {
        for (const actual of this.id) {
            /*ENTERO = 0,
            CADENA  = 1,
            BOOLEANO = 2,
            DOUBLE = 3,
            CARACTER = 4*/
            if(this.tipo1 == 4){
                const listacaracter = this.value.execute(ambito);
                if(listacaracter.type == 1){
                    ambito.setVal(actual,[],this.tipo1, this.line, this.column,null,Type.LISTA);
                    //listacaracter.value.split('')
                    const variableOriginal = ambito.getVal(actual);
                    const varaux = listacaracter.value.split('');
                    for(let i=0;i<varaux.length;i++){
                        var aux = new Primitivo( varaux[i],TipoPrimitivo.CARACTER,this.line, this.column);
                        variableOriginal.valor.push(aux);
                    }

                }
                else {
                    let er = new Error_(this.line, this.column, 'Semantico', 'Error en asignacion de lista, valor no es de tipo cadena:  '+this.id +' tipo de valor '+listacaracter.type);
                    ListaError.push(er);
                    throw er;
                }
            } else{
                 let er = new Error_(this.line, this.column, 'Semantico', 'Error en asignacion de lista, la lista no es de tipo caracter:  '+this.id +' tipo  '+ this.tipo1);
                ListaError.push(er);
                throw er;
            }
        }
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"nodedeclararlistachar[label=\"LISTA\"]" , nombrenodo:"nodedeclararlistachar"};
    }
}