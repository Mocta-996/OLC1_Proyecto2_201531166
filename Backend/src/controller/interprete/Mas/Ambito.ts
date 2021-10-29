import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Simbolo } from "./Simbolo"

export class Ambito {
    private variables: Map<string, Simbolo>

    constructor(public anterior: Ambito | null) {
        this.variables = new Map();
    }

    public setVal(id: string, value: any, type: Type, line:number, column:number,tamanio:any,edd?:Type) {
        let env: Ambito | null = this;
        let tamo = tamanio;
        //let bandera = false;
        while (env != null) {
            if (env.variables.has(id.toLowerCase())) {
                const val = env.variables.get(id.toLowerCase())
                if (val?.type == type) {
                    env.variables.set(id, new Simbolo(value, id, type,tamo,edd))
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
        this.variables.set(id, new Simbolo(value, id, type,tamanio,edd))
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

   

}
