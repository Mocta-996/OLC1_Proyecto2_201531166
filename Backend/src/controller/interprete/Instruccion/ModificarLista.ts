import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { type } from "os";
import { ListaError } from '../Instruccion/ListaError';

export class ModificarLista extends Instruccion {

    private id: string;
    private value: Expresion;
    private indice :Expresion;
    
    
    constructor(id: string,indice:Expresion, value: Expresion, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.indice = indice;
    }

    public execute(ambito: Ambito) {
        let variableOriginal = ambito.getVal(this.id)
        let nuevoValor = this.value?.execute(ambito)
        if (variableOriginal != null){
            // validar la posicon es menor  al tamaño
            let ind = this.indice.execute(ambito);
            if(ind.value < variableOriginal.valor.length){
                // validar los tipos
                if(nuevoValor.type == variableOriginal.type){
                    variableOriginal.valor[ind.value] = this.value;
                }else {
                    let er = new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: tipos no coinciden ' + this.id +' tipo '+ variableOriginal.type + 'tipoN '+nuevoValor.type);
                    ListaError.push(er);
                    throw er;
                }
            }
            else {
                if(nuevoValor.type == variableOriginal.type){
                    variableOriginal.valor.splice(ind.value ,0,this.value);
                }else {
                    let er = new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: tipos no coinciden ' + this.id +' tipo '+ variableOriginal.type + 'tipoN '+nuevoValor.type);
                    ListaError.push(er);
                    throw er;
                }
               // let er = new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: indice fuera de rango vector ' + this.id +' tamaño: ' +variableOriginal.valor.length +' indice: ' + ind.value);
            } 
        }else {
            let er = new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id);
            ListaError.push(er);
            throw er;
        }
    }

    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
}

export enum tiposvalidos{
    DOUBLE,
    ENTERO

}