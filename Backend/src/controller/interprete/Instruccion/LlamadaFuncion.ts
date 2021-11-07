import { Instruccion } from '../Instruccion/Instruccion';
import { Ambito } from '../Mas/Ambito';
import { Expresion } from '../Expresion/Expresion';
import { Error_ } from '../Error/Error';
import { ListaError } from '../Instruccion/ListaError';

export class LlamadaFuncion extends Instruccion {

    constructor(private id: string, private expresiones: Array<Expresion>, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito) {
        var bandera = false;
        const func = ambito.getFuncion(this.id);
        if (func == undefined){
            let er = new Error_(this.line, this.column, 'Semantico', `Funcion ${this.id} no encontrada`);
            ListaError.push(er);
            throw er;
        }
        if (this.expresiones.length != func.parametros.length){
            let er = new Error_(this.line, this.column, 'Semantico', "Numero de parametros no coinciden");
            ListaError.push(er);
                throw er;
        }

        const newEnv = new Ambito(ambito.getGlobal());
        if(this.expresiones.length !=0 && func.parametros.length !=0){
            for (let i = 0; i < this.expresiones.length; i++) {
                const value = this.expresiones[i].execute(ambito);
                const auxval = func.parametros[i];
                if(parseInt(auxval[0]) == value.type || (auxval[0]== 0 &&  value.type ==3) || (auxval[0]== 3 &&  value.type ==0 ) ){
                    newEnv.createVar(auxval[1], value.value, value.type, this.line, this.column,null);
                }else{
                    let er = new Error_(this.line, this.column, 'Semantico', "tipo de parametros no coinciden");
                    ListaError.push(er);
                    throw er;
                }
                
            }
        }
        
        
        const  retornar = func.statment.execute(newEnv);
        if( retornar !=undefined ){
            if(retornar.type =='Return' ){
                //const r = retornar.expresion.execute(ambito);
                bandera = true;
                if(func.subrutina == 8){
                    let er = new Error_(this.line, this.column, 'Semantico', `El metodo  ${this.id} es de tipo Void, no retorna ningun valor `);
                    ListaError.push(er);
                    throw er;
                }else {
                    return {value:retornar.value , type:retornar.tipo};
                }
               
            }    
        }

        if(bandera == false){
            if(func.subrutina == 7){
                let er = new Error_(this.line, this.column, 'Semantico', `Es necesario un retorno para la Funcion  ${this.id} `);
                ListaError.push(er);
                throw er;
            }
        }
    }

     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
}

/*
Int suma(int num1, int num2)
{
 WriteLine("Aquí puede venir cualquier sentencia :D");
 return num1 + num2;
}

suma(2,3);

suma(1,2);
*/