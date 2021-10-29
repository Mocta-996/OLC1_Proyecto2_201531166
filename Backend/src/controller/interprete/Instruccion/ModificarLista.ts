import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { type } from "os";

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
                    throw new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: tipos no coinciden ' + this.id +' tipo '+ variableOriginal.type + 'tipoN '+nuevoValor.type);
                }
            }
            else {
                throw new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: indice fuera de rango vector ' + this.id +' tamaño: ' +variableOriginal.valor.length +' indice: ' + ind.value);
            } 
        }else {
            throw new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id)
        }
    }
}

export enum tiposvalidos{
    DOUBLE,
    ENTERO

}