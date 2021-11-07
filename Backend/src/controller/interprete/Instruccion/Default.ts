import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";
import { ListaError } from '../Instruccion/ListaError';

export class Default extends Instruccion {
    constructor(line:number, column:number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        return { type: 'Default', line: this.line, column: this.column }
    }

    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }

}