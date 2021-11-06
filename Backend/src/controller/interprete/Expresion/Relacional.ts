import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
import { Ambito } from "../Mas/Ambito";
import { ListaError } from '../Instruccion/ListaError';
export class Relacional extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoRelacional, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito): Retorno {
        const leftValue = this.left.execute(ambito);

        const rightValue = this.right.execute(ambito);
        if (this.tipo == TipoRelacional.IGUALACION) {
            const result = leftValue.value == rightValue.value;
            return { value: result, type: Type.BOOLEANO }
        } else if (this.tipo == TipoRelacional.DIFERENCIACION) {
            const result = leftValue.value != rightValue.value
            return { value: result, type: Type.BOOLEANO }
        } else if (this.tipo == TipoRelacional.MAYORQUE) {
            const result = leftValue.value > rightValue.value
            return { value: result, type: Type.BOOLEANO }
        } else if (this.tipo == TipoRelacional.MAYORIGUAL) {
            const result = leftValue.value >= rightValue.value
            return { value: result, type: Type.BOOLEANO }
        } else if (this.tipo == TipoRelacional.MENORQUE) {
            const result = leftValue.value < rightValue.value
            return { value: result, type: Type.BOOLEANO }
        } else if (this.tipo == TipoRelacional.MENORIGUAL) {
            const result = leftValue.value <= rightValue.value
            return { value: result, type: Type.BOOLEANO }
        } else {
            let er = new Error_(this.line, this.column, 'Semantico', 'Error en operacion Relacional'+ leftValue.type + ' _ ' + rightValue.type);
            ListaError.push(er);
         throw er;
        }

    }
}

export enum TipoRelacional {
    IGUALACION,
    DIFERENCIACION,
    MAYORQUE,
    MENORQUE,
    MAYORIGUAL,
    MENORIGUAL
}