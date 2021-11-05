import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";

export class Return extends Instruccion {
    constructor(line:number, column:number,public retorno?:Expresion) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
       
        if(this.retorno != null || this.retorno != undefined){
            const r = this.retorno?.execute(ambito);
            return {value:r?.value, type: 'Return', tipo:r?.type,line: this.line, column: this.column };
        }
        return{value:undefined, type: 'Return',line: this.line, column: this.column };
        
    }

}