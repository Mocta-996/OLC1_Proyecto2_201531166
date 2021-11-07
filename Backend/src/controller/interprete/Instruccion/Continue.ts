import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";
import { ListaError } from '../Instruccion/ListaError';
export class Continue extends Instruccion {
    constructor(line:number, column:number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        return { type: 'Continue', line: this.line, column: this.column }
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
      
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodocontinue"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="CONTINUE"];
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }

}