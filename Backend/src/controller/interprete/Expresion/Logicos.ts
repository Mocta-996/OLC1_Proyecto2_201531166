import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
import { Ambito } from "../Mas/Ambito";
import { ListaError } from '../Instruccion/ListaError';
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
                let er= new Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos con AND '+ leftValue.type + ' y ' + rightValue.type);
                ListaError.push(er);
                throw er;
            //}
            //throw new Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos con AND '+ leftValue.type + ' y  ' + rightValue.type)
        } else if (this.tipo == TipoLogico.OR) {
            // const rightValue = this.right.execute(ambito);
            return { value: (leftValue.value || rightValue.value), type: Type.BOOLEANO }
        }else {
            let er = new Error_(this.line, this.column, 'Semantico', 'Error en operacion Logica '+ leftValue.type + ' '+this.tipo+' ' + rightValue.type);
            ListaError.push(er);
            throw er;
        }
    }

    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        let op="&&";
        if(this.tipo == TipoLogico.NOT){
            op="!";
        }else if(this.tipo == TipoLogico.OR){
             op="||";
        }
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodologico"+aleatorio.toString();
        const exiz:{codigorama:string ,nombrenodo:string} =this.left.getCodigoAST();
        const exder:{codigorama:string ,nombrenodo:string} =this.right.getCodigoAST();
        const codigorama =` 
        ${nombreNodoP}[label ="LOGICO"];
        nodooperacion${nombreNodoP}[label="${op}"];
        ${exiz.codigorama}
        ${exder.codigorama}
        ${nombreNodoP} ->${exiz.nombrenodo};
        ${nombreNodoP} -> nodooperacion${nombreNodoP};
        ${nombreNodoP} ->${exder.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}

export enum TipoLogico{
    AND,
    OR,
    NOT
}