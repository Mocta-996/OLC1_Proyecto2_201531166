import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";

export class Default extends Instruccion {
    constructor(line:number, column:number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        return { type: 'Default', line: this.line, column: this.column }
    }

}