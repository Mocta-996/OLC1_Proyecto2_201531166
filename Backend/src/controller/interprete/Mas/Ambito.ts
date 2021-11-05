import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Simbolo } from "./Simbolo"
import { Funcion } from "../Instruccion/Funcion";
import { Metodo } from "../Instruccion/Metodo";
export class Ambito {
    private variables: Map<string, Simbolo>
    public funciones: Map<string, Funcion>;
    public metodo: Map<string, Metodo>;
    

    constructor(public anterior: Ambito | null) {
        this.variables = new Map();
        this.funciones = new Map();
    }

    public setVal(id: string, value: any, type: Type, line:number, column:number,tamanio:any,edd?:Type) {
        let env: Ambito | null = this;
        let tamo = tamanio;
        //let bandera = false;
        while (env != null) {
            if (env.variables.has(id.toLowerCase())) {
                const val = env.variables.get(id.toLowerCase())
                if (val?.type == type) {
                    env.variables.set(id.toLowerCase(), new Simbolo(value, id, type,tamo,edd))
                    //bandera = true;
                    //break;
                } else {
                    throw new Error_(line, column, 'Semantico', 'No se puede asignar: ' + value + ' a ' + id)
                }
            }
            env = env.anterior
        }
        /*if(bandera == false){
            throw new Error_(line, column, 'Semantico', 'ya existe la variable: ' + id);
        }*/
        this.variables.set(id.toLowerCase(), new Simbolo(value,id.toLowerCase(), type,tamanio,edd))
    }

    public getVal(id: string): Simbolo {
        let env: Ambito | null = this;
        let retorno = null;

        while (env != null) {
            if (env.variables.has(id.toLowerCase())) {
                retorno = env.variables.get(id.toLowerCase());
                break;
               // return env.variables.get(id);
            }
            env = env.anterior
        }
        // ! para indicar que es posible que no sea nulo
        return retorno!;
    }

    public guardarFuncion(id: string, funcion: Funcion) {
        //TODO ver si la funcion ya existe, reportar error
        this.funciones.set(id, funcion);
    }
    public guardarMetodo(id: string, metodo:Metodo) {
        //TODO ver si la funcion ya existe, reportar error
        this.metodo.set(id, metodo);
    }

    public getFuncion(id: string): Funcion | undefined {
        let env: Ambito | null = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }


    public getGlobal(): Ambito {
        let env: Ambito | null = this;
        while (env?.anterior != null) {
            env = env.anterior;
        }
        return env;
    }

   

}
