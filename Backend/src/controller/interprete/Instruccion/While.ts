import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";
import { ListaError } from '../Instruccion/ListaError';

export class While extends Instruccion {
    constructor(private condicion: Expresion, private cuerpo: Instruccion, line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        let value = this.condicion.execute(ambito)

        if (value.type != Type.BOOLEANO){ let er = new Error_(this.line, this.column, 'Semantico', "La condicion a evaluar no es de tipo boolean");
                ListaError.push(er);
                throw er;
        }
        let limit =0;
        while (value.value) {
            const retorno = this.cuerpo.execute(ambito)
            if (retorno != null && retorno != undefined) {
                if (retorno.type == 'Break') {
                    break
                } else if (retorno.type == 'Continue') {
                    continue
                }else if(retorno.type == 'Return' && retorno.value == undefined){
                    break
                }
                else if(retorno.type == 'Return' && retorno.value != undefined){
                    return {value:retorno.value, type:retorno.type};
                    break;
                   
                }else if(retorno.type == 'Return' && retorno.value == undefined){
                    break;
                }
            }
            value = this.condicion.execute(ambito)
            if(limit == 10000){
                break;
            }
        }
        if(limit == 10000){
            let er = new Error_(this.line, this.column, 'Semantico', "limite de iteraciones While");
            ListaError.push(er);
            throw er;
        }

    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
}