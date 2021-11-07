import { Ambito } from "../Mas/Ambito";
import { Instruccion } from "./Instruccion";

export class Statement extends Instruccion {
    constructor(private code: Instruccion[], line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const nuevoambito = new Ambito(ambito)
        for (const inst of this.code) {
            try {
                const element = inst.execute(nuevoambito)

                if (element != null && element != undefined)
                { return element}

            } catch (error) {
                console.log(error)
            }
        }
    }
     public getCodigoAST(): { codigorama: string, nombrenodo: string }{
        
        return {codigorama:"" , nombrenodo:""};
    }
}