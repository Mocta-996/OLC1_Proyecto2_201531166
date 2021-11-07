import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { type } from "os";
import { ListaError } from '../Instruccion/ListaError';

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
                    let er = new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: tipos no coinciden ' + this.id +' tipo '+ variableOriginal.type + 'tipoN '+nuevoValor.type);
                    ListaError.push(er);
                    throw er;
                }
            }
            else {
                let er = new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: indice fuera de rango vector ' + this.id +' tamaño: ' +variableOriginal.valor.length +' indice: ' + pos.value);
                ListaError.push(er);
                throw er;
            }
        }else {
            let er = new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id);
            ListaError.push(er);
                throw er;
        }
    }
    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoasignacionvector"+aleatorio.toString();
        const val:{codigorama:string ,nombrenodo:string} =this.value.getCodigoAST();
        const indice:{codigorama:string ,nombrenodo:string} =this.posicon.getCodigoAST();
        const codigorama =` 
        ${nombreNodoP}[label ="ASIGNAR VECTOR"];
        nodoIDS${nombreNodoP}[label="IDLISTA"];
        nodoid${nombreNodoP}[label="${this.id}"];
        nodpos${nombreNodoP}[label="INDICE"];
        ${val.codigorama}
        ${indice.codigorama}
        ${nombreNodoP} ->nodoIDS${nombreNodoP} ->nodoid${nombreNodoP};
        ${nombreNodoP}->${val.nombrenodo};
        nodoid${nombreNodoP} -> nodpos${nombreNodoP} ->  ${indice.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
        
    }
}

export enum tiposvalidos{
    DOUBLE,
    ENTERO

}