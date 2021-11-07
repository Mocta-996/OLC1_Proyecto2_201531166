import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";

export class SwitchCase extends Instruccion {
    //private condicion: { execute: (arg0: Ambito) => any; }
    constructor(private condicion:Expresion, private cuerpo:any, line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const condicionevaluar = this.condicion.execute(ambito)

        // constructor(caso:Expresion, code: Instruccion[], line: number, column: number) {
        for (var i = 0; i < this.cuerpo.length; i++) {
            var bandera_default=false;
            var bandera_break = false;
            const aux = this.cuerpo[i];
            const valorcondicion = aux[0].execute(ambito);
            if(condicionevaluar.value == valorcondicion.value || valorcondicion.type =='Default'){
                const auxval = aux[1];
                const retorno =auxval.execute(ambito);
                if(retorno != undefined || retorno != null){
                if(retorno.type == 'Break'){
                    bandera_break = true;
                }
                } 
            }
            if(bandera_break){
                break;

            }     
        }
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
    

}
