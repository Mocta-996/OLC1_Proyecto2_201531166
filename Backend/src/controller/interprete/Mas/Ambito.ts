import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Simbolo } from "./Simbolo"
import { Funcion } from "../Instruccion/Funcion";
import { Metodo } from "../Instruccion/Metodo";
import { ListaError } from '../Instruccion/ListaError';
import {ListaTabla} from './ListaTabla';
import {TablaSimbolos} from './TablaSimbolos';
export class Ambito {
    private variables: Map<string, Simbolo>;
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
                    env.variables.set(id.toLowerCase(), new Simbolo(value, id, type,tamo,edd));
                    //constructor(public id:string, public tipo1: string, public tipo2: string, public ambito:string, public linea: number, public columna: number) 
                    
                    //bandera = true;
                    //break;
                } else {
                    let er = new Error_(line, column, 'Semantico', 'No se puede asignar: ' + value + ' a ' + id);
                    ListaError.push(er);
                    throw er;
                }
            }
            env = env.anterior
        }
        /*if(bandera == false){
            let er = new Error_(line, column, 'Semantico', 'ya existe la variable: ' + id);
        }*/
        //this.variables.set(id.toLowerCase(), new Simbolo(value,id.toLowerCase(), type,tamanio,edd))
    }

    public createVar(id: string, value: any, type: Type, line:number, column:number,tamanio:any,edd?:Type) {
        let env: Ambito | null = this;
        let tamo = tamanio;       
        if (!(env.variables.has(id.toLowerCase())) ) {
            env.variables.set(id.toLowerCase(), new Simbolo(value, id, type,tamo,edd)); 
            if(edd != undefined){
                this.guardarlistatabla( id, type, edd,"ambito", line, column); 
            } else {
                this.guardarlistatabla( id, type, 10,"ambito", line, column); 
            }
                 
            
        }
        else {
            let er = new Error_(line, column, 'Semantico', 'ya existe la variable: ' + id);
            ListaError.push(er);
            throw er;
        }
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

    public guardarFuncion(id: string, funcion: Funcion, line:number ,column:number,subr:number,type: Type) {
        //TODO ver si la funcion ya existe, reportar error
        let env: Ambito | null = this;
        if(!env.funciones.has(id.toLowerCase())){
            this.funciones.set(id.toLowerCase(), funcion);
            this.guardarlistatabla( id, type, subr,"--", line, column);

        }
        else {
            
            let er = new Error_(line, column, 'Semantico', 'ya existe la funcion: ' + id);
            ListaError.push(er);
            throw er;
        }
        //this.funciones.set(id.toLowerCase(), funcion);
    }
    public guardarMetodo(id: string, metodo:Metodo) {
        //TODO ver si la funcion ya existe, reportar error
        this.metodo.set(id.toLowerCase(), metodo);
    }

    public getFuncion(id: string): Funcion | undefined {
        let env: Ambito | null = this;
        while (env != null) {
            if (env.funciones.has(id.toLowerCase())) {
                return env.funciones.get(id.toLowerCase());
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

    public guardarlistatabla( id:string, tipo1: number, tipo2: number, ambito:string, linea: number, columna: number){

        if(tipo2 ==5 ){
            if(tipo1==1){
                ListaTabla.push(new TablaSimbolos(id,"CADENA","VECTOR",ambito,linea,columna ));
            }else if(tipo1 == 2){
                ListaTabla.push(new TablaSimbolos(id,"BOOLEANO","VECTOR",ambito,linea,columna ));
            }else if(tipo1==3){
                ListaTabla.push(new TablaSimbolos(id,"DOUBLE","VECTOR",ambito,linea,columna ));
            }else if(tipo1==4){
                ListaTabla.push(new TablaSimbolos(id,"CARACTER","VECTOR",ambito,linea,columna ));
            }else {
                ListaTabla.push(new TablaSimbolos(id,"ENTERO","VECTOR",ambito,linea,columna ));
            }
        }else if(tipo2 ==6 ){
            if(tipo1==1){
                ListaTabla.push(new TablaSimbolos(id,"CADENA","LISTA",ambito,linea,columna ));
            }else if(tipo1 == 2){
                ListaTabla.push(new TablaSimbolos(id,"BOOLEANO","LISTA",ambito,linea,columna ));
            }else if(tipo1==3){
                ListaTabla.push(new TablaSimbolos(id,"DOUBLE","LISTA",ambito,linea,columna ));
            }else if(tipo1==4){
                ListaTabla.push(new TablaSimbolos(id,"CARACTER","LISTA",ambito,linea,columna ));
            }else {
                ListaTabla.push(new TablaSimbolos(id,"ENTERO","LISTA",ambito,linea,columna ));
            }
        }else if(tipo2 ==7 ){
            if(tipo1==1){
                ListaTabla.push(new TablaSimbolos(id,"CADENA","FUNCION",ambito,linea,columna ));
            }else if(tipo1 == 2){
                ListaTabla.push(new TablaSimbolos(id,"BOOLEANO","FUNCION",ambito,linea,columna ));
            }else if(tipo1==3){
                ListaTabla.push(new TablaSimbolos(id,"DOUBLE","FUNCION",ambito,linea,columna ));
            }else if(tipo1==4){
                ListaTabla.push(new TablaSimbolos(id,"CARACTER","FUNCION",ambito,linea,columna ));
            }else {
                ListaTabla.push(new TablaSimbolos(id,"ENTERO","FUNCION",ambito,linea,columna ));
            }
        }else if(tipo2 ==8 ){
                ListaTabla.push(new TablaSimbolos(id,"VOID","METODO",ambito,linea,columna ));
        }else {
            if(tipo1==1){
                ListaTabla.push(new TablaSimbolos(id,"CADENA","VARIABLE",ambito,linea,columna ));
            }else if(tipo1 == 2){
                ListaTabla.push(new TablaSimbolos(id,"BOOLEANO","VARIABLE",ambito,linea,columna ));
            }else if(tipo1==3){
                ListaTabla.push(new TablaSimbolos(id,"DOUBLE","VARIABLE",ambito,linea,columna ));
            }else if(tipo1==4){
                ListaTabla.push(new TablaSimbolos(id,"CARACTER","VARIABLE",ambito,linea,columna ));
            }else {
                ListaTabla.push(new TablaSimbolos(id,"ENTERO","VARIABLE",ambito,linea,columna ));
            }
        }
    }

   

}
