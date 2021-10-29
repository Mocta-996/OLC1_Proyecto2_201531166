import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
import { Ambito } from "../Mas/Ambito";
export class Logicos extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoLogico, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito): Retorno {
        const leftValue = this.left.execute(ambito);
        const rightValue =this.right.execute(ambito);
        if (this.tipo == TipoLogico.NOT) {
            return { value: !(leftValue.value), type: Type.BOOLEANO }
        } else if (this.tipo == TipoLogico.AND) {
            //if (leftValue.value == Type.BOOLEANO) {
                //const rightValue = this.right.execute(ambito);
                return { value: (leftValue.value && rightValue.value), type: Type.BOOLEANO }
                //if (rightValue.type === Type.BOOLEANO) {
                   
                //}
                throw new Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos con AND '+ leftValue.type + ' y ' + rightValue.type)
            //}
            //throw new Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos con AND '+ leftValue.type + ' y  ' + rightValue.type)
        } else if (this.tipo == TipoLogico.OR) {
            // const rightValue = this.right.execute(ambito);
            return { value: (leftValue.value || rightValue.value), type: Type.BOOLEANO }
        }else {
            throw new Error_(this.line, this.column, 'Semantico', 'Error en operacion Logica '+ leftValue.type + ' '+this.tipo+' ' + rightValue.type);
        }
    }
}

export enum TipoLogico{
    AND,
    OR,
    NOT
}