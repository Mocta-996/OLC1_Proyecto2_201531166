import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { ListaError } from '../Instruccion/ListaError';

export class Casteo extends Instruccion {


    private value: Expresion |null; // valor 
    private cast:number;            // tipo de casteo

    constructor(cast:number, value: Expresion, line: number, column: number) {
        super(line, column);
        this.value = value;
        this.cast = cast;
    }
   /*
    ENTERO = 0,
    CADENA  = 1,
    BOOLEANO = 2,
    DOUBLE = 3,
    CARACTER = 4
    
    */
  
    public execute(ambito: Ambito) {
        let val = this.value?.execute(ambito);
        //Int a double
        // Char a double
        if(this.cast == 3){
            if(val?.type == 0 || val?.type == 4){
                if( val?.type == 4){
                    return {value:parseFloat(val?.value.charCodeAt(0)),type:this.cast}
                }else{
                     return { value:parseFloat(val?.value) , type:this.cast }
                }
               
            }else{
                let er = new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+this.cast )
                ListaError.push(er);
                throw er;
            }
        }
        // Double a Int 
        // Char a int
        else if(this.cast == 0){
            if(val?.type == 3 || val?.type == 4){
                if( val?.type == 4){
                    return {value: parseInt(val?.value.charCodeAt(0)),type:this.cast}
                }
                else{
                    return { value: parseInt(val?.value) , type:this.cast }
                }
               
            }else{
                let er = new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+this.cast );
                ListaError.push(er);
                throw er;
            }
        }
        // Int a String
        // Double a String
        else if(this.cast == 1){
            if(val?.type == 0 || val?.type == 3){
                return { value: (val?.value).toString() , type:this.cast }
                }else{
                   let er = new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+this.cast );
                    ListaError.push(er);
                    throw er;
                }
            }
        // Int a Char
        else if( this.cast == 4){
            if(val?.type == 0 ){
                return { value: String.fromCharCode(val?.value).toString() , type:this.cast }
            }else{
                let er = new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+this.cast );
                ListaError.push(er);
                throw er;
            }
        }
        /*
        for (const actual of this.id) {

            if(this.tipo !=null){
            // cuando se declara un nuevo valor
            let val = this.value?.execute(ambito);
            // Int a double
            // Char a double
            if(this.tipo == 3 && this.cast == 3 ){
                if(val?.type == 0 || val?.type == 4){
                    ambito.setVal(actual, parseFloat(val?.value),this.tipo, this.line, this.column)
                }else{
                    throw new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+this.tipo )
                }
            // Double a Int 
            // Char a int
            }else if(this.tipo == 0 && this.cast == 0){
                if(val?.type == 3 || val?.type == 4){
                    ambito.setVal(actual, parseInt(val?.value),this.tipo, this.line, this.column)
                }else{
                    throw new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+this.tipo )
                }
            }
            // Int a String
            // Double a String
            else if(this.tipo == 1 && this.cast == 1){
                if(val?.type == 0 || val?.type == 3){
                    ambito.setVal(actual, (val?.value).toString(),this.tipo, this.line, this.column)
                }else{
                    throw new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+this.tipo )
                }
            }
            // Int a Char
            else if(this.tipo == 4 && this.cast == 4){
                if(val?.type == 0 ){
                    ambito.setVal(actual, String.fromCharCode(val?.value).toString(),this.tipo, this.line, this.column)
                }else{
                    throw new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+this.tipo )
                }
            }
            // cuando no se declara un nuevo valor 
            }else{
                let val = this.value?.execute(ambito)
                let variableOriginal = ambito.getVal(actual)
                if(variableOriginal != null){
                    // Int a double
                    // Char a double
                    if(variableOriginal.type == 3 && this.cast == 3 ){
                        if(val?.type == 0 || val?.type == 4){
                            variableOriginal.valor=parseFloat(val?.value);
                        }else{
                            throw new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+variableOriginal.type );
                        }
                    // Double a Int 
                    // Char a int
                    }else if(variableOriginal.type == 0 && this.cast == 0){
                        if(val?.type == 3 || val?.type == 4){
                            variableOriginal.valor=parseInt(val?.value);
                        }else{
                            throw new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+variableOriginal.type );
                        }
                    }
                    // Int a String
                    // Double a String
                    else if(variableOriginal.type == 1 && this.cast == 1){
                        if(val?.type == 0 || val?.type == 3){
                            variableOriginal.valor=(val?.value).toString();
                        }else{
                            throw new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+variableOriginal.type );
                        }
                    }
                    // Int a Char
                    else if(variableOriginal.type == 4 && this.cast == 4){
                        if(val?.type == 0 ){
                            variableOriginal.valor=String.fromCharCode(val?.value);
                        }else{
                            throw new Error_(this.line, this.column, 'Semantico', 'Error en casteo: no es posible  '+val?.type +' a '+variableOriginal.type );
                        }
                    }
                }
                throw new Error_(this.line, this.column, 'Semantico', 'Error en casteo: variable no encotrado ' + actual )
            }
       
        }*/
    }
}