import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";
import { ListaError } from '../Instruccion/ListaError';

export class Caso  {
    public linea:number;
    public column:number;
    public instrucciones:Instruccion[];
    public expresion:Expresion;
    constructor(caso:Expresion, code: Instruccion[], line: number, column: number) {
        this.linea = line;
        this.column = column;
        this.instrucciones = code;
        this.expresion = caso;
    }

    public getInstruccion():Instruccion[]{
        return this.instrucciones;
    }
    public getexpresion():Expresion{
        return this.expresion;
    }

    
    /*public execute(ambito: Ambito) {
        const nuevoambito = new Ambito(ambito)
        for (const inst of this.code) {
            try {
                const element = inst.execute(nuevoambito)

                if (element != null && element != undefined)
                { return element}

            } catch (error) {
                console.log(error)
            }
        }
    }*/
}