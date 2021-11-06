import {lista_errores} from '../Error/lista_errores';
export class Error_ {

    constructor(public linea: number, public columna: number, public tipo: string, public mensaje: string) {
        var error = "Linea: "+this.linea +"  Columna: "+ this.columna +"  Tipo: " + this.tipo + "  error: " +this.mensaje;
        lista_errores.push(error);
    }

    


}