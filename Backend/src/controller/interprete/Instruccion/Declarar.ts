import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion"
import { Ambito } from '../Mas/Ambito';
import { Error_ } from "../Error/Error";
import { ListaError } from '../Instruccion/ListaError';

export class Declarar extends Instruccion {

    private id: string[];
    private value: Expresion |null;
    private tipo:number;
    private tamaño?:number;  // para vectores

    constructor(tipo:number,id: string[], value: Expresion, line: number, column: number,tamaño?:number) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipo = tipo;
        this.tamaño =tamaño;
    }

  
    public execute(ambito: Ambito) {
        for (const actual of this.id) {
            // para asignar variables  normales
            let val = this.value?.execute(ambito)
            if(this.value == null){
                //ambito.setVal(actual, val?.value,this.tipo, this.line, this.column,null)
                ambito.createVar(actual, val?.value,this.tipo, this.line, this.column,null)
            }else if(this.tipo == 0 && val?.type == 3){
                //ambito.setVal(actual, val?.value,val?.type, this.line, this.column,null)
                ambito.createVar(actual, val?.value,val?.type, this.line, this.column,null);
            }else if(this.tipo == 3 && val?.type == 0){
                //ambito.setVal(actual, val?.value,val?.type, this.line, this.column,null)
                ambito.createVar(actual, val?.value,val?.type, this.line, this.column,null);
            }
            else if(this.tipo == val?.type){
                //ambito.setVal(actual, val?.value,val?.type, this.line, this.column,null);
                ambito.createVar(actual, val?.value,val?.type, this.line, this.column,null);
            }else{
                let er =new Error_(this.line, this.column, 'Semantico', 'No error en asignacion de tipos: declarado '+this.tipo +' ingresado '+val?.type );
                ListaError.push(er);
                throw er;
            }
        }
    }

    public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        let tipo = "BOOLEANO";
        if (this.tipo == 1){
            tipo ="CADENA";
        }else if (this.tipo == 0) {
            tipo ="ENTERO";
        } else if (this.tipo == 3) {
            tipo ="DOULBE";
        } else if (this.tipo == 4) {
            tipo ="CARACTER";
        }
        let ids ="";
        let declaraciones="";
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nododeclarar"+aleatorio.toString();
       var val = {codigorama:"nodo",nombrenodo:"nodo[label =\"sinvalor\"]"}
        if(this.value){
            val  =this.value.getCodigoAST();
        }
        //const val:{codigorama:string ,nombrenodo:string} =this.value?.getCodigoAST();
        for (const actual of this.id) {
            //const val:{codigorama:string,nombrenodo:string}=this.value.getCodigoAST();
            ids += "nodoauxdeclarar"+actual+"[label =\"DECLARAR\"];\n";
            ids += "nodotipo"+nombreNodoP+actual+"[label=\"TIPO\"];\n";
            ids += "nodotipos"+nombreNodoP+actual+"[label="+tipo+"];\n";
            ids +="nodosis"+nombreNodoP+actual+"[label=\"ID\"];\n";
            ids +="nodosids"+nombreNodoP+actual+"[label="+actual+"];";
            ids += val.codigorama+"\n";

            declaraciones +=nombreNodoP +"-> nodoauxdeclarar"+actual+";\n";
            declaraciones +="nodoauxdeclarar"+actual+"-> nodotipo"+nombreNodoP+actual+";\n";
            declaraciones +="nodotipo"+nombreNodoP+actual+"->nodotipos"+nombreNodoP+actual+";\n";
            declaraciones +="nodotipos"+nombreNodoP+actual+" -> nodosis"+nombreNodoP+actual+";\n";
            declaraciones +="nodosis"+nombreNodoP+actual+"-> nodosids"+nombreNodoP+actual+";\n";
            declaraciones +="nodoauxdeclarar"+actual+" ->"+ val.nombrenodo+";\n";
        }

        const codigorama =` 
        ${nombreNodoP}[label ="DECLARAR"];
        ${ids}
        ${declaraciones}
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
        
    }
}