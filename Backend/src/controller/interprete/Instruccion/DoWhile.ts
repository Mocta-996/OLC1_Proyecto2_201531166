import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";

export class DoWhile extends Instruccion {
    constructor(private condicion: Expresion, private cuerpo: Instruccion, line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        let value = this.condicion.execute(ambito)

        if (value.type != Type.BOOLEANO) throw new Error_(this.line, this.column, 'Semantico', "La condicion a evaluar no es de tipo boolean")
        let limit =0;
        while (true) {
            const retorno = this.cuerpo.execute(ambito)
            if (retorno != null && retorno != undefined) {
                if (retorno.type == 'Break') {
                    break
                } else if (retorno.type == 'Continue') {
                    continue
                }
            }
            value = this.condicion.execute(ambito)
            limit ++;
            if(limit == 10000 || !value.value ){
                break;
            }
        }
        if(limit == 10000){
            throw new Error_(this.line, this.column, 'Semantico', "limite de iteraciones While")
        }

    }
}