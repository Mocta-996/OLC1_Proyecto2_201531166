import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Error_ } from "../Error/Error";
import { Ambito } from "../Mas/Ambito";
import { ListaError } from '../Instruccion/ListaError';

export class Aritmetica extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoAritmetica, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        const leftValue = this.left.execute(ambito);

        const rightValue = this.right.execute(ambito);
        // SUMA
        if (this.tipo == TipoAritmetica.SUMA) {
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value + rightValue.value), type: Type.ENTERO };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) + rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.BOOLEANO){
                if(rightValue.value==='true'){return { value: (leftValue.value + 1), type: Type.DOUBLE };}
                else {
                    return { value: (leftValue.value + 0), type: Type.ENTERO };
                }
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CARACTER){
                let ascii =  rightValue.value.charCodeAt(0);
                return { value: (leftValue.value + ascii), type: Type.ENTERO }; 
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CADENA){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) + parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) + parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.BOOLEANO){
                if(rightValue.value==='true'){return { value: (parseFloat(leftValue.value) + 1), type: Type.DOUBLE };}
                else {
                    return { value: (leftValue.value + 0), type: Type.DOUBLE };
                }
            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CARACTER){
                let ascii = rightValue.value.charCodeAt(0);
                return { value: (leftValue.value + parseFloat(ascii)), type:  Type.DOUBLE }; 
            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CADENA){
                
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            } 
            // OPERADOR 1 BOOLEAN
            else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.ENTERO){
                if(leftValue.value==='true'){return { value: 1 + rightValue.value , type: Type.ENTERO };}
                else {
                    return { value: 0 + rightValue.value, type: Type.ENTERO};
                }
            } else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.DOUBLE){
                if(leftValue.value==='true'){return { value: 1 + rightValue.value , type: Type.DOUBLE };}
                else {
                    return { value: 0 + rightValue.value, type: Type.DOUBLE};
                }
            } else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.CADENA){
                
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            } 
            // OPERADOR 1 CARACTER 
            else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.ENTERO){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (rightValue.value + ascii), type: Type.ENTERO }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.DOUBLE){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (rightValue.value + parseFloat(ascii)), type: Type.DOUBLE }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.CARACTER){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA};

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.CADENA){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            }
             // OPERADOR 1 CADENA
            else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 

            } else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.DOUBLE){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 

            } else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.BOOLEANO){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            } else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.CARACTER){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 

            } else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.CADENA){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            }else {
                let er= new Error_(this.line, this.column, 'Semantico', 'No se puede operar Suma: ' + leftValue.type + ' _ ' + rightValue.type);
                ListaError.push(er);
                throw er;
            }

        } else if (this.tipo == TipoAritmetica.RESTA) {
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value - rightValue.value), type: Type.ENTERO };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) - rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.BOOLEANO){
                if(rightValue.value==='true'){return { value: (leftValue.value - 1), type: Type.DOUBLE };}
                else {
                    return { value: (leftValue.value - 0), type: Type.ENTERO };
                }
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CARACTER){
                let ascii =  rightValue.value.charCodeAt(0);
                return { value: (leftValue.value - ascii), type: Type.ENTERO }; 
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) - parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) - parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.BOOLEANO){
                if(rightValue.value==='true'){return { value: (parseFloat(leftValue.value) - 1), type: Type.DOUBLE };}
                else {
                    return { value: (leftValue.value - 0), type: Type.DOUBLE };
                }
            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CARACTER){
                let ascii = rightValue.value.charCodeAt(0);
                return { value: (leftValue.value - parseFloat(ascii)), type:  Type.DOUBLE }; 
            } 
            // OPERADOR 1 BOOLEAN
            else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.ENTERO){
                if(leftValue.value==='true'){return { value: 1 - rightValue.value , type: Type.ENTERO };}
                else {
                    return { value: 0 - rightValue.value, type: Type.ENTERO};
                }
            } else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.DOUBLE){
                if(leftValue.value==='true'){return { value: 1 - rightValue.value , type: Type.DOUBLE };}
                else {
                    return { value: 0 - rightValue.value, type: Type.DOUBLE};
                }
            } 
            // OPERADOR 1 CARACTER 
            else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.ENTERO){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (ascii - rightValue.value  ), type: Type.ENTERO }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.DOUBLE){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: ( parseFloat(ascii)-rightValue.value ), type: Type.DOUBLE }; 
            }
            else {
                let er =  new Error_(this.line, this.column, 'Semantico', 'No se puede operar resta: ' + leftValue.type + ' _ ' + rightValue.type);
                ListaError.push(er);
                throw er;   
            } 
        }
        // MULTIPLICACION 
        else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value * rightValue.value), type: Type.ENTERO };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) * rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CARACTER){
                let ascii =  rightValue.value.charCodeAt(0);
                return { value: (leftValue.value * ascii), type: Type.ENTERO }; 
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) * parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) * parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CARACTER){
                let ascii = rightValue.value.charCodeAt(0);
                return { value: (leftValue.value * parseFloat(ascii)), type:  Type.DOUBLE }; 
            } 
            // OPERADOR 1 CARACTER 
            else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.ENTERO){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (ascii * rightValue.value  ), type: Type.ENTERO }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.DOUBLE){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: ( parseFloat(ascii)*rightValue.value ), type: Type.DOUBLE }; 
            }
            else {
                let er=  new Error_(this.line, this.column, 'Semantico', 'No se puede operar Multiplicacion: ' + leftValue.type + ' _ ' + rightValue.type);
                ListaError.push(er);
                throw er;
            } 
        }
        // DIVISION 
        else if (this.tipo == TipoAritmetica.DIVISION) {
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value  /rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) / rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CARACTER){
                let ascii =  rightValue.value.charCodeAt(0);
                return { value: (leftValue.value / ascii), type: Type.DOUBLE }; 
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) / parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) / parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CARACTER){
                let ascii = rightValue.value.charCodeAt(0);
                return { value: (leftValue.value / parseFloat(ascii)), type:  Type.DOUBLE }; 
            } 
            // OPERADOR 1 CARACTER 
            else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.ENTERO){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (ascii / rightValue.value  ), type: Type.DOUBLE }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.DOUBLE){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: ( parseFloat(ascii) / rightValue.value ), type: Type.DOUBLE }; 
            }
            else {
                let er= new Error_(this.line, this.column, 'Semantico', 'No se puede operar Division: ' + leftValue.type + ' _ ' + rightValue.type);
                ListaError.push(er);
                throw er;
            } 
        // POTENCIA 
        }else if (this.tipo == TipoAritmetica.POTENCIA) {
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: Math.pow(leftValue.value ,rightValue.value), type: Type.ENTERO };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: Math.pow(parseFloat(leftValue.value) , rightValue.value), type: Type.DOUBLE };
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: Math.pow(parseFloat(leftValue.value) , parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: Math.pow(parseFloat(leftValue.value) , parseFloat(rightValue.value)), type: Type.DOUBLE };

            } 
            else {
                let er =  new Error_(this.line, this.column, 'Semantico', 'No se puede operar Potencia: ' + leftValue.type + ' _ ' + rightValue.type);
                ListaError.push(er);
                throw er;
            } 
        }
        // MODULO 
        else if (this.tipo == TipoAritmetica.MODULO){
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value  %rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) % rightValue.value), type: Type.DOUBLE };
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) % parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) % parseFloat(rightValue.value)), type: Type.DOUBLE };

            } 
            else {
                let er=  new Error_(this.line, this.column, 'Semantico', 'No se puede operar Division: ' + leftValue.type + ' _ ' + rightValue.type);
                ListaError.push(er);
                throw er;
            } 
        }else {
            let er = new Error_(this.line, this.column, 'Semantico', 'No se puede realizar la operacion: ' + leftValue.type + ' _ ' + rightValue.type); 
            ListaError.push(er);
            throw er;
        }
    }
}

export enum TipoAritmetica {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MENOSUNARIO,
    POTENCIA,
    MODULO
}