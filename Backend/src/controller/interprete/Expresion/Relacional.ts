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


    /*if (this.tipo == TipoRelacional.IGUALACION) {

        } else if (this.tipo == TipoRelacional.DIFERENCIACION) {
            
        } else if (this.tipo == TipoRelacional.MAYORQUE) {
            
        } else if (this.tipo == TipoRelacional.MAYORIGUAL) {
           
        } else if (this.tipo == TipoRelacional.MENORQUE) {
            
        } else if (this.tipo == TipoRelacional.MENORIGUAL) {*/

    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoaritmetica"+aleatorio.toString();
        const exiz:{codigorama:string ,nombrenodo:string} =this.left.getCodigoAST();
        const exder:{codigorama:string ,nombrenodo:string} =this.right.getCodigoAST();
        const codigorama =` 
        ${nombreNodoP}[label ="RELACIONAL"];
        nodooperacion${nombreNodoP}[label="${this.tipo.toString()}"];
        ${exiz.codigorama}
        ${exder.codigorama}
        ${nombreNodoP} ->${exiz.nombrenodo};
        ${nombreNodoP} -> nodooperacion${nombreNodoP};
        ${nombreNodoP} ->${exder.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
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