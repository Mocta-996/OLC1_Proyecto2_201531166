import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";
import { ListaError } from '../Instruccion/ListaError';

export class Break extends Instruccion {
    constructor(line:number, column:number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        return { type: 'Break', line: this.line, column: this.column }
    }

    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
      
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodobreak"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="BREAK"];
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}