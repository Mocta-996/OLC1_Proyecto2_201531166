import { Instruccion } from '../Instruccion/Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import {ListaWriteline} from '../Instruccion/ListaWriteline';
export class Writeline extends Instruccion {
    private value: Expresion[]

    constructor(value: Expresion[], line: number, column: number) {
        super(line, column)
        this.value = value
    }

    public execute(ambito: Ambito): any {
        for (const actual of this.value) {
            const val = actual.execute(ambito)
            console.log(val.value)
            ListaWriteline.push(val.value);
        }
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "writeline"+aleatorio.toString();
        let valores = "";
        let valores2 = "";
        for (const actual of this.value) {
            const exiz:{codigorama:string ,nombrenodo:string} = actual.getCodigoAST();
            valores +=exiz.codigorama+"\n";
            valores2+=nombreNodoP+ "->"+exiz.nombrenodo+";\n"
        }
       
        const codigorama =` 
        ${nombreNodoP}[label ="WRITELINE"];
        ${valores}
        ${valores2}
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
        
       
    }
}