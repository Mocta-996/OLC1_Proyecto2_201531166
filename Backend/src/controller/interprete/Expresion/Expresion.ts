import { Ambito } from "../Mas/Ambito";
import { tipos_suma,tipos_resta,tipos_multiplicacion,tipos_division,tipos_potencia,tipos_modulo, Type, Retorno } from "./Retorno"

export abstract class Expresion {
    public line: number;
    public column: number;
    constructor(line: number, column: number) {
        this.line = line
        this.column = column
    }

    public abstract execute(ambito: Ambito): Retorno;

  
    public tipoDominante(tipo1: Type, tipo2: Type,operacion:number): Type {
        if(operacion ==1){
            return tipos_suma[tipo1][tipo2];
        } else if(operacion ==2){
            return tipos_resta[tipo1][tipo2];
        }
        else if(operacion ==3){
            return tipos_multiplicacion[tipo1][tipo2];
        }
        else if(operacion ==4){
            return tipos_division[tipo1][tipo2];
        }
        else if(operacion ==5){
            return tipos_potencia[tipo1][tipo2];
        }
        else {
            return tipos_modulo[tipo1][tipo2];
        }
    }
}