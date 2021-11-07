import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { type } from "os";
import { ListaError } from '../Instruccion/ListaError';
export class Asignar extends Instruccion {

    private id: string;
    private value: Expresion;
  
    
    constructor(id: string, value: Expresion, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.value = value;
     
        
    }
    public execute(ambito: Ambito) {
        let variableOriginal = ambito.getVal(this.id)
        let nuevoValor = this.value?.execute(ambito)
        if (variableOriginal != null){
           
            if(variableOriginal.type == 0 && nuevoValor.type == 3){
                variableOriginal.type=3;
                variableOriginal.valor=nuevoValor.value;

            } else if(variableOriginal.type == 3 && nuevoValor.type == 0){
                variableOriginal.type=0;
                variableOriginal.valor=nuevoValor.value;

            }else if(variableOriginal.type ==nuevoValor.type ){
                    variableOriginal.valor=nuevoValor.value;
            }
            else{
                let er= new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: tipos no coinciden ' + this.id +' tipo '+ variableOriginal.type + 'tipoN '+nuevoValor.type);
                ListaError.push(er);
                throw er;
            }
        }else {
            let er = new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + this.id)
            ListaError.push(er);
                throw er;
        }
    }

   
    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoasignacion"+aleatorio.toString();
        const val:{codigorama:string ,nombrenodo:string} =this.value.getCodigoAST();
        const codigorama =` 
        ${nombreNodoP}[label ="ASIGNAR"];
        nodoIDS${nombreNodoP}[label="ID"];
        nodoid${nombreNodoP}[label="${this.id}"];
        ${val.codigorama}
        ${nombreNodoP} ->nodoIDS${nombreNodoP} ->nodoid${nombreNodoP};
        ${nombreNodoP}->${val.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
        
    }
}

export enum tiposvalidos{
    DOUBLE,
    ENTERO

}