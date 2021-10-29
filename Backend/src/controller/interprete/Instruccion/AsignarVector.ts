import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { type } from "os";

export class AsignarVector extends Instruccion {

    private id: string;
    private value: Expresion;
    private posicon:Expresion;
  
    
    constructor(id: string,posicion:Expresion, value: Expresion, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.posicon = posicion;    
        
    }
    public execute(ambito: Ambito) {
        let variableOriginal = ambito.getVal(this.id)
        let nuevoValor = this.value?.execute(ambito)
        let pos = this.posicon.execute(ambito);
        if (variableOriginal != null){
           
            // validar la posicon es menor  al tamaño
            if(pos.value< variableOriginal.tamanio){
                // validar los tipos
                if(nuevoValor.type == variableOriginal.type){
                    variableOriginal.valor[pos.value] = this.value;
                }else {
                    throw new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: tipos no coinciden ' + this.id +' tipo '+ variableOriginal.type + 'tipoN '+nuevoValor.type);
                }
            }
            else {
                throw new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: indice fuera de rango vector ' + this.id +' tamaño: ' +variableOriginal.valor.length +' indice: ' + pos.value);
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