import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";
import { ListaError } from '../Instruccion/ListaError';

export class If extends Instruccion {
    //private condicion: { execute: (arg0: Ambito) => any; }
    constructor(private condicion:Expresion, private cuerpo: Instruccion, private elsE: Instruccion, line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const value = this.condicion.execute(ambito)

        if (value.type != Type.BOOLEANO) 
        {      // true - false
            let er = new Error_(this.line, this.column, 'Semantico', 'La condicion a evaluar en el if no es de tipo boolean');
            ListaError.push(er);
                throw er;
        }
        if (value.value) {
            return this.cuerpo.execute(ambito)

        } else if (this.elsE != null) {
            return this.elsE.execute(ambito)
        }

    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }

}

//1. ejecutar la condicion
//2. verificar que la condicion sea de tipo booleana
//3. validar que la condicion se verdadera o falsa
//4. ejecutar las instrucciones si en caso fuese verdadera
//5. si en caso fuese falsa ejectura else si es diferente de nulo
/*



int edad = 18;
switch( edad ) {
 Case 10:
 	WriteLine("Tengo 10 anios.");
 	Break;
 	Case 18:
 WriteLine("Tengo 18 anios.");
   Case 25:
   WriteLine("Tengo 25 anios.");
 	Break;
 Default:
 	WriteLine("No se que edad tengo. :(");
    Break;
}
*/