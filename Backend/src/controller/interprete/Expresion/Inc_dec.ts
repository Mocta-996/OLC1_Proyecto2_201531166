import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "../Instruccion/Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { Primitivo } from "./Primitivo";
import { Acceso } from "./Acceso";

export class Inc_dec extends Instruccion {


    private value: Expresion ;     // valor a incrementar
    private accion:number;            //  incremento o decremento
    private id?:Acceso;

    constructor(accion:number, value: Expresion, line: number, column: number,id?:Acceso) {
        super(line, column);
        this.value = value;
        this.accion = accion 
        this.id = id;
       }
  
    public execute(ambito: Ambito) {
       
        let identificador = this.id?.id;
        if(identificador !=null){
            let variableOriginal = ambito.getVal(identificador);
            let nuevoValor = this.value.execute(ambito)
            if (variableOriginal != null){
            if(this.accion ==0){
                if(variableOriginal.type == 0 && nuevoValor.type == 3){
                    variableOriginal.type=3;
                    variableOriginal.valor=nuevoValor.value +1;
                    return { value: nuevoValor.value +1 , type: nuevoValor.type}

                } else if(variableOriginal.type == 3 && nuevoValor.type == 0){
                    variableOriginal.type=0;
                    variableOriginal.valor=nuevoValor.value +1;
                    return { value: nuevoValor.value +1 , type: nuevoValor.type}

                }else if(variableOriginal.type ==nuevoValor.type ){
                    variableOriginal.valor=nuevoValor.value +1;
                    return { value: nuevoValor.value +1 , type: nuevoValor.type}
                }
                else{
                    throw new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: tipos no coinciden ' + identificador +' tipo '+ variableOriginal.type + 'tipoN '+nuevoValor.type);
                }
           } else {
                if(variableOriginal.type == 0 && nuevoValor.type == 3){
                    variableOriginal.type=3;
                    variableOriginal.valor=nuevoValor.value -1;
                    return { value: nuevoValor.value -1 , type: nuevoValor.type}

                } else if(variableOriginal.type == 3 && nuevoValor.type == 0){
                    variableOriginal.type=0;
                    variableOriginal.valor=nuevoValor.value -1;
                    return { value: nuevoValor.value -1 , type: nuevoValor.type}

                }else if(variableOriginal.type ==nuevoValor.type ){
                        variableOriginal.valor=nuevoValor.value -1;
                        return { value: nuevoValor.value -1 , type: nuevoValor.type}
                }
            else{
                throw new Error_(this.line, this.column, 'Semantico', 'Error en asignacion: tipos no coinciden ' + identificador +' tipo '+ variableOriginal.type + 'tipoN '+nuevoValor.type);
            }
           }
            
        }else {
            throw new Error_(this.line, this.column, 'Semantico', 'No se encuentra la variable: ' + identificador);
        }

        }
        else{
        let val = this.value.execute(ambito);
       
       
        // incremento
        if(this.accion == 0){
            //  tipo Int , Double
            if(val.type == 3 ){
                let inc = parseFloat(val.value) +1;
                return { value:inc , type:val.type }
            }
            else if( val.type == 0){
                let inc = val.value +1;
                return { value: inc , type:val.type}
            }
            else{
                throw new Error_(this.line, this.column, 'Semantico', 'error en incremento  '+val.type +' a '+ val.type); 
            }
        }
        else {
             //  tipo Int , Double
            if(val.type == 3 ){
                let inc = parseFloat(val.value) -1;
                return { value:inc , type:val.type }
            }
            else if( val.type == 0){
                let inc = val.value -1;
                return { value: inc , type:val.type}
            }
            else{
                throw new Error_(this.line, this.column, 'Semantico', 'error en incremento  '+val.type +' a '+ val.type); 
            }
        }
        }
      
        

       
        
    }
}