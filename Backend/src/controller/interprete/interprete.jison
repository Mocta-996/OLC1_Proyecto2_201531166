/* Definición Léxica */
%lex

%options case-insensitive
%x string

%%


// simbolos reservados 
";"                 return 'PTCOMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"."                 return 'PUNTO';
":"                 return 'DOSPUNTOS';
","                 return 'COMA';
"["                 return 'CORIZR';
"]"                 return 'CORDER';
"{"                 return 'LLAVEIZQ';
"}"                 return "LLAVEDER";
"?"                 return 'KLEENE';
"="                 return 'IGUAL';

"writeline"          return 'RWRITE';   // funcion de imprimir
"true"              return 'TRUE';
"false"             return 'FALSE';
"new"               return 'NEW';
"dynamiclist"       return 'DYNAMICLIST';
"append"            return 'APPEND';
"getvalue"          return 'GETVALUE';
"setValue"          return 'SETVALUE';
"tolower"           return 'TOLOWER';
"toupper"           return 'TOUPPER';
"length"            return 'LENGTH';
"if"                return 'IF';
"else"              return 'ELSE';
"switch"            return 'SWITCH';
"case"              return 'CASE';
"break"             return 'BREAK';
"default"           return 'DEFAULT';
"while"             return 'WHILE';
"for"               return 'FOR';
"do"                return 'DO';
"void"              return 'VOID';
"continue"          return 'CONTINUE';
"return"            return 'RETURN';
"truncate"          return 'TRUNCATE';
"round"             return 'ROUND';
"typeof"            return 'TYPEOF';
"tostring"          return 'TOSTRING';
"tochararray"       return 'TOCHARARRAY';
"start"             return 'START';
"with"              return 'WITH';
// aritmeticos
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVISION';
"^"                 return 'POTENCIA';
"%"                 return 'MODULO';
// relacionales 
"=="                return 'IGUALACION';
"!="                return 'DIFERENCIACION';
"<"                 return 'MENORQUE';
"<="                return 'MENORIGUAL';
">"                 return 'MAYORQUE';
">="                return 'MAYORIGUAL';
// logicas
"&&"                return 'AND';
"||"                return 'OR';
"!"                 return 'NOT';
// tipos de variables 
"int"               return 'RENTERO';
"string"               return 'RSTRING';
"char"               return 'RCHAR';
"boolean"               return 'RBOOLEAN';
"double"               return 'RDOUBLE';



/* Espacios en blanco */
[ \r\t]+            {}                      // espacio en blanco 
\n                  {}                      // salto
(\/\/).*                             {}     // comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {}     // comentario multilinea

[a-zA-Z][a-zA-Z0-9_]*   return 'ID';
[0-9]+("."[0-9]+)\b     return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
\'((\\\')|[^\n\'])*\'	{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
["]                             {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                   {cadena+="\n";}
<string>"\\t"                   {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                     {yytext=cadena; this.popState(); return 'CADENA';}

//\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); 	return 'CADENA'; }


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
                        let err =new Error_(yylloc.first_line, yylloc.first_column, 'Lexico', "Error Léxico:  "+ yytext +"");
                        ListaError.push(err);
                        }
/lex

%{
    const { Error_ } = require('./Error/Error');
    const {Primitivo,TipoPrimitivo} = require('./Expresion/Primitivo');
    const {Aritmetica, TipoAritmetica} = require('./Expresion/Aritmetica');
    const {Relacional,TipoRelacional} = require('./Expresion/Relacional');
    const {Logicos,TipoLogico} = require('./Expresion/Logicos');
    const {Declarar} = require('./Instruccion/Declarar');
    const {DeclararVector} = require('./Instruccion/DeclararVector');
    const {DeclararLista} = require('./Instruccion/DeclararLista');
    const {Asignar} = require('./Instruccion/Asignar');
    const {AsignarVector} = require('./Instruccion/AsignarVector');
    const {AsignarLista} = require('./Instruccion/AsignarLista');
    const {Ternario} = require('./Instruccion/Ternario');
    const {Acceso} = require('./Expresion/Acceso');
    const {AccesoVector} = require('./Expresion/AccesoVector');
    const {AccesoLista} = require('./Expresion/AccesoLista');
    const {Casteo} = require('./Instruccion/Casteo');
    const {Inc_dec} = require('./Expresion/Inc_dec');
    const {ModificarLista} = require('./Instruccion/ModificarLista');

    const {Writeline} = require('./Instruccion/Writeline');
    const {ToLower} = require('./Instruccion/ToLower');
    const {ToUpper} = require('./Instruccion/ToUpper');
    const {Length} = require('./Instruccion/Length');
    const {Break} = require('./Instruccion/Break');
    const {Continue} = require('./Instruccion/Continue');
    const {Return} = require('./Instruccion/Return');
    const {Truncate} = require('./Instruccion/Truncate');
    const {Round} = require('./Instruccion/Round');
    const {Typeof} = require('./Instruccion/Typeof');
    const {Tostring} = require('./Instruccion/Tostring');
    const {DeclararListaChar} = require('./Instruccion/DeclararListaChar');
    const {AsignarListaChar} = require('./Instruccion/AsignarListaChar');

    const {If} = require('./Instruccion/If');
    const {Statement} = require('./Instruccion/Statement');
    const {SwitchCase} = require('./Instruccion/SwitchCase');
    const {Default} = require('./Instruccion/Default');
    const {While} = require('./Instruccion/While');
    const {DoWhile} = require('./Instruccion/DoWhile');
    const {For} = require('./Instruccion/For');

    const {Funcion} = require('./Instruccion/Funcion');
    const {LlamadaFuncion} = require('./Instruccion/LlamadaFuncion');
    const {StartWith} = require('./Instruccion/StartWith');
    const { ListaError } = require ('./Instruccion/ListaError');

%}
%}

// PRECEDENCIA DE OPERADORES 
%left 'OR'
%left 'AND'
%right 'FCAST'
%left 'IGUALACION' 'DIFERENCIACION'
%left 'MENORQUE' 'MAYORQUE' 'MAYORIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS' 
%left 'POR' 'DIVISION' 'MODULO'
%left 'POTENCIA'
%right 'UMENOS ' 'NOT'

%start INICIO

%% /* Definición de la gramática */

INICIO
	: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES
	: INSTRUCCIONES INSTRUCCION     { $1.push($2); $$ = $1; }
	| INSTRUCCION                   { $$ = [$1]; }
;

INSTRUCCION
	: DEFPRINT          { $$ = $1; }
    | DECLARACION       { $$ = $1; }
    | ASIGNACION        { $$ = $1;}
    | SENTENCIAIF                { $$ =$1; }
    | SENTENCIASWITCH          { $$ =$1; }
    | CICLOWHILE             { $$ =$1; }
    | SENTENCIAFOR          { $$ =$1; }
    | SENTENCIADOWHILE      { $$ =$1; }
    | SENTENCIAFUNCION     { $$ =$1; }
    | LLAMADAFUNCION        { $$ =$1; }
    | RETORNAR PTCOMA        { $$ =$1; }
    | BREAK PTCOMA {$$=new Break(@1.first_line, @1.first_column)}
    | CONTINUE PTCOMA {$$=new Continue(@1.first_line, @1.first_column)}
    | START WITH LLAMADAFUNCION {$$=new StartWith($3,@1.first_line, @1.first_column)}
	| error PTCOMA{ console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
     let err = new Error_(this._$.first_line, this._$.first_column, 'Sintactico', 'Error sintactico: '  + yytext);
      ListaError.push(err);
     }
;

// ====================================================  GRAMATICA IMPRIMIR =================================
DEFPRINT
    : RWRITE PARIZQ LISTAEXPRESION PARDER PTCOMA  { $$ = new Writeline($3,@1.first_line, @1.first_column); }
;
LISTAEXPRESION
    : LISTAEXPRESION COMA EXPRESION  { $1.push($3);$$ = $1;}
    | EXPRESION  {$$ = [$1];}
;
//=================================== DECLARACION DE VARIABLES ===================================
// declaracion de variables con asignacion y sin asignacion
// incluye el casteoo de variables 
// -falta declarar listas, vetores 
DECLARACION
    : TIPOS DECLARAVARIOS PTCOMA { {$$ = new Declarar($1,$2,null,@1.first_line, @1.first_column)}   }
    | TIPOS DECLARAVARIOS  IGUAL EXPRESION  PTCOMA  { {$$ = new Declarar($1,$2,$4,@1.first_line, @1.first_column)} }
    | TIPOS DECLARAVARIOS  IGUAL TERNARIO  PTCOMA  { {$$ = new Declarar($1,$2,$4,@1.first_line, @1.first_column)} }
    | TIPOS DECLARAVARIOS  IGUAL CASTEO PTCOMA  { {$$ = new Declarar($1,$2,$4,@1.first_line, @1.first_column)} }
    | TIPOS DECLARAVARIOS  IGUAL LLAMADAFUNCION  { {$$ = new Declarar($1,$2,$4,@1.first_line, @1.first_column)} }
    //constructor(tipo1:number,id: string[], value: Expresion[], line: number, column: number,tamaño?:number,tipo2?:number)
    | TIPOS DECLARAVARIOS  CORIZR CORDER IGUAL NEW TIPOS CORIZR  EXPRESION CORDER PTCOMA { {$$ = new DeclararVector($1,$2,null,@1.first_line, @1.first_column,$9,$7)} } // vector sin datos iniciales 
    | TIPOS DECLARAVARIOS  CORIZR CORDER IGUAL LLAVEIZQ  LISTAVALORES LLAVEDER PTCOMA { {$$ = new DeclararVector($1,$2,$7,@1.first_line, @1.first_column,null,null)} } // vector con datos iniciales
    //constructor(tipo1:number,id: string[],tipo2:number, line: number, column: number,)
    | DYNAMICLIST MENORQUE TIPOS MAYORQUE DECLARAVARIOS  IGUAL NEW DYNAMICLIST MENORQUE TIPOS MAYORQUE PTCOMA { {$$ = new DeclararLista($3,$5,$10,[],@1.first_line, @1.first_column)} }
    //constructor(tipo1:number,id: string[],value:Expresion, line: number, column: number,)
    | DYNAMICLIST MENORQUE TIPOS MAYORQUE DECLARAVARIOS  IGUAL TOCHARARRAY PARIZQ EXPRESION PARDER PTCOMA { {$$ = new DeclararListaChar($3,$5,$9,@1.first_line, @1.first_column)} }
   
   
;
DECLARAVARIOS
    : DECLARAVARIOS COMA ID  { $1.push($3); $$ = $1;}
    | ID                            { $$ = [$1]; }                
;

LISTAVALORES
    :LISTAVALORES COMA EXPRESION    { $1.push($3); $$ = $1;}
    | EXPRESION                     { $$ = [$1]; }  
;

// ===================================== ASIGNACION DE VARIABLES YA DECLARADAS ==============================
ASIGNACION
    : ID IGUAL EXPRESION PTCOMA { {$$ = new Asignar($1,$3,@1.first_line, @1.first_column)}  }
    | ID IGUAL TERNARIO  PTCOMA  { {$$ = new Asignar($1,$3,@1.first_line, @1.first_column)} }
    | ID IGUAL CASTEO  PTCOMA  { {$$ = new Asignar($1,$3,@1.first_line, @1.first_column)} }
    | ID IGUAL LLAMADAFUNCION { {$$ = new Asignar($1,$3,@1.first_line, @1.first_column)} }
    | EXPRESION  PTCOMA 
    //constructor(id: string,posicion:Expresion, value: Expresion, line: number, column: number) {
    | ID CORIZR EXPRESION CORDER  IGUAL EXPRESION PTCOMA  { {$$ = new AsignarVector($1,$3,$6,@1.first_line, @1.first_column)} }
    // constructor(id: string, value: Expresion, line: number, column: number) {
    | APPEND PARIZQ ID COMA EXPRESION PARDER PTCOMA  { {$$ = new AsignarLista($3,$5,@1.first_line, @1.first_column)} }
     //constructor(id: string,indice:Expresion, value: Expresion, line: number, column: number)
    | SETVALUE PARIZQ ID COMA EXPRESION COMA EXPRESION PARDER PTCOMA  { {$$ = new ModificarLista($3,$5,$7,@1.first_line, @1.first_column)} }
    | ID CORIZR CORIZR  EXPRESION CORDER CORDER IGUAL  EXPRESION PTCOMA  { {$$ = new ModificarLista($1,$4,$8,@1.first_line, @1.first_column)} }
    // constructor(id: string, value: Expresion, line: number, column: number)
    | ID IGUAL TOCHARARRAY PARIZQ  EXPRESION PARDER PTCOMA  { {$$ = new AsignarListaChar($1,$5,@1.first_line, @1.first_column)} }
;

ASIGNACION2
    : ID IGUAL EXPRESION  { {$$ = new Asignar($1,$3,@1.first_line, @1.first_column)}  }
    | ID IGUAL TERNARIO    { {$$ = new Asignar($1,$3,@1.first_line, @1.first_column)} }
    | ID IGUAL CASTEO   { {$$ = new Asignar($1,$3,@1.first_line, @1.first_column)} }
;
// ====================================== INCREMENTO Y DECREMENTO ======================================

// ===================================== CASTEO DE VALORES O VARIABLES ==============================
CASTEO  
    : PARIZQ TIPOCASTEO PARDER EXPRESION { {$$ = new Casteo($2,$4,@1.first_line, @1.first_column,null)} } 
;
TIPOCASTEO
    :RENTERO                 {$$ = 0;}
    |RDOUBLE                 {$$ =3;}
    |RCHAR                 {$$ = 4;}
;
TIPOS
    :RENTERO                 {$$ = 0;}
    |RSTRING                 {$$ = 1;}
    |RDOUBLE                 {$$ =3;}
    |RCHAR                     {$$ = 4;}
    |RBOOLEAN                 {$$ = 2;}
    
;

// ====================================== OPERACION TERNARIA ================================================
TERNARIO
    : EXPRESION KLEENE EXPRESION DOSPUNTOS EXPRESION                  {$$ = new Ternario($1,$3,$5,@1.first_line, @1.first_column)} 
    //| Exp error PTCOMA                        {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;


// ========================================= SENTENCIA IF =================================================

SENTENCIAIF 
    :IF PARIZQ EXPRESION PARDER STATEMENT SENTENCIAELSE {$$ = new If($3, $5, $6, @1.first_line, @1.first_column)}
;

SENTENCIAELSE
    :ELSE STATEMENT     {$$ =$2}
    |ELSE SENTENCIAIF   {$$ = $2}
    | {$$ = null}
;

STATEMENT
    : LLAVEIZQ INSTRUCCIONES LLAVEDER         { $$ = new Statement($2, @1.first_line, @1.first_column)}
    | LLAVEIZQ LLAVEDER                       {$$ = new Statement([], @1.first_line, @1.first_column)}
    | error LLAVEDER { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
     let err = new Error_(this._$.first_line, this._$.first_column, 'Sintactico', 'Error sintactico: '  + yytext);
      ListaError.push(err);
     }
;

// ========================================= SENTENCIA SWITCH CASE  ==============================
//constructor(private condicion:Expresion, private cuerpo: Instruccion, private elsE: Instruccion, line: number, column: number) {
SENTENCIASWITCH
    : SWITCH PARIZQ EXPRESION PARDER LLAVEIZQ LISTACASOS  LLAVEDER  {$$ = new SwitchCase($3,$6,@1.first_line, @1.first_column)}
    | error LLAVEDER{ console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
     let err = new Error_(this._$.first_line, this._$.first_column, 'Sintactico', 'Error sintactico: '  + yytext);
      ListaError.push(err);
     }
;

LISTACASOS
    :CASE EXPRESION     DOSPUNTOS CASESTATEMENT                {$$=[];$$.push([$2,$4]);}
    |LISTACASOS CASE EXPRESION  DOSPUNTOS CASESTATEMENT    {$$=$1;$$.push([$3,$5]);}
    |DEFAULT DOSPUNTOS CASESTATEMENT                    {$$.push([new Default(@1.first_line, @1.first_column),$3]);}
    |LISTACASOS DEFAULT DOSPUNTOS CASESTATEMENT         {$$=$1;$$.push([new Default(@1.first_line, @1.first_column),$4]);}
    //|Rcase error PARDER                   {console.log("Se recupero en ",yytext," (", this._$.last_line,", ", this._$.last_column,")");}
;

CASESTATEMENT 
    :INSTRUCCIONES                      { $$ = new Statement($1, @1.first_line, @1.first_column)}
    |                                   {$$ = new Statement([], @1.first_line, @1.first_column)}
;

// ========================================= SENTENCIA WHILE ============================
CICLOWHILE
    : WHILE PARIZQ EXPRESION PARDER STATEMENT  { $$ = new While($3, $5,  @1.first_line, @1.first_column)}
;


// ========================================= SENTENCIA FOR ============================

SENTENCIAFOR
    : FOR PARIZQ DECLARACION   EXPRESION PTCOMA EXPRESION PARDER STATEMENT { $$ = new For($3, $4,$6,$8, @1.first_line,@1.first_column);}
    | FOR PARIZQ ASIGNACION   EXPRESION PTCOMA EXPRESION PARDER STATEMENT { $$ = new For($3, $4,$6,$8, @1.first_line,@1.first_column);}
    | FOR PARIZQ DECLARACION   EXPRESION PTCOMA ASIGNACION2 PARDER STATEMENT { $$ = new For($3, $4,$6,$8, @1.first_line,@1.first_column);}
    | FOR PARIZQ ASIGNACION   EXPRESION PTCOMA ASIGNACION2 PARDER STATEMENT { $$ = new For($3, $4,$6,$8, @1.first_line,@1.first_column);}

;
// ========================================= SENTENCIA DO WHILE ============================

SENTENCIADOWHILE
    : DO STATEMENT WHILE PARIZQ EXPRESION PARDER PTCOMA { $$ = new DoWhile($5, $2,  @1.first_line, @1.first_column)}
;   


// ========================================= FUNCIONES ======================================================

SENTENCIAFUNCION 
    : TIPOS ID PARIZQ PARAMETROS PARDER STATEMENT {$$ = new Funcion( $2, $6,$4,7, @1.first_line, @1.first_column,$1);}
    | TIPOS ID PARIZQ  PARDER STATEMENT {$$ = new Funcion( $2, $5,[],7, @1.first_line, @1.first_column,$1);}
    | VOID ID PARIZQ PARAMETROS PARDER STATEMENT {$$ = new Funcion( $2, $6,$4,8, @1.first_line, @1.first_column,null);}
    | VOID ID PARIZQ  PARDER STATEMENT {$$ = new Funcion( $2, $5,[],8, @1.first_line, @1.first_column,null);}
;

PARAMETROS
    :PARAMETROS  COMA TIPOS ID { $1.push([$3,$4]); $$ =$1 }
    |TIPOS ID  {$$ =[];$$.push([$1,$2])}
;

// ======================================== LLAMADA DE FUNCIONES ===========================================
LLAMADAFUNCION
    : ID PARIZQ PARDER PTCOMA   {$$ = new LlamadaFuncion($1, [], @1.first_line, @1.first_column);}
    | ID PARIZQ LISTAPARAMETROS PARDER PTCOMA  { $$ = new LlamadaFuncion($1, $3, @1.first_line, @1.first_column);}
;
LISTAPARAMETROS
    : LISTAPARAMETROS COMA EXPRESION { $1.push($3);$$ = $1;}
    | EXPRESION  {$$ = [$1];}
;

RETORNAR
    : RETURN      {$$=new Return(@1.first_line, @1.first_column,null)}
    | RETURN EXPRESION   {$$=new Return(@1.first_line, @1.first_column,$2)}
;

EXPRESION
    : EXPRESION MAS EXPRESION           { $$= new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column); }
    | EXPRESION MENOS EXPRESION         { $$= new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column); }
    | EXPRESION POR EXPRESION           { $$= new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column); }
    | EXPRESION DIVISION EXPRESION      { $$= new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column); }
    | EXPRESION POTENCIA EXPRESION      { $$= new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column); }
    | EXPRESION MODULO EXPRESION        { $$= new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column); }
    | MENOS EXPRESION %prec UMENOS      {$$= new Aritmetica($2,new Primitivo("-1",TipoPrimitivo.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column); }
    
    | EXPRESION IGUALACION EXPRESION         {$$= new Relacional($1,$3,TipoRelacional.IGUALIGUALACION, @1.first_line, @1.first_column)}
    | EXPRESION DIFERENCIACION EXPRESION   {$$= new Relacional($1,$3,TipoRelacional.DIFERENCIACION, @1.first_line, @1.first_column)}
    | EXPRESION MENORQUE EXPRESION         {$$= new Relacional($1,$3,TipoRelacional.MENORQUE, @1.first_line, @1.first_column)}
    | EXPRESION MAYORQUE EXPRESION         {$$= new Relacional($1,$3,TipoRelacional.MAYORQUE, @1.first_line, @1.first_column)}
    | EXPRESION MENORQUE IGUAL EXPRESION        {$$= new Relacional($1,$4,TipoRelacional.MENORIGUAL, @1.first_line, @1.first_column)}
    | EXPRESION MAYORQUE IGUAL EXPRESION        {$$= new Relacional($1,$4,TipoRelacional.MAYORIGUAL, @1.first_line, @1.first_column)}

    | EXPRESION AND EXPRESION         { $$ = new Logicos($1,$3, TipoLogico.AND, @1.first_line, @1.first_column); }
    | EXPRESION OR EXPRESION         { $$ = new Logicos( $1,$3,TipoLogico.OR, @1.first_line, @1.first_column); }
    | NOT EXPRESION %prec NOT         { $$ = new Logicos($2,$2, TipoLogico.NOT, @1.first_line, @1.first_column); }

    | EXPRESION MAS MAS                      { $$ = new Inc_dec(0,$1, @1.first_line, @1.first_column,$1); }
    | EXPRESION MENOS MENOS                  { $$ = new Inc_dec(1,$1, @1.first_line, @1.first_column,$1); }
    
    | PARIZQ EXPRESION PARDER           {$$ = $2}
    | ENTERO                            { $$ = new Primitivo($1,TipoPrimitivo.ENTERO, @1.first_line, @1.first_column); }
    | DECIMAL                           { $$ = new Primitivo( $1,TipoPrimitivo.DOUBLE, @1.first_line, @1.first_column); }
    | CADENA                            { $$ = new Primitivo( $1,TipoPrimitivo.CADENA, @1.first_line, @1.first_column); }
    | CARACTER                          { $$ = new Primitivo( $1,TipoPrimitivo.CARACTER, @1.first_line, @1.first_column); }
    | TRUE                              { $$ = new Primitivo( $1,TipoPrimitivo.BOOLEANO, @1.first_line, @1.first_column); }
    | FALSE                             { $$ = new Primitivo( $1,TipoPrimitivo.BOOLEANO, @1.first_line, @1.first_column); }

    | ID                                 {$$= new Acceso($1, @1.first_line, @1.first_column)}
    | ID CORIZR EXPRESION CORDER         {$$= new AccesoVector($1,$3, @1.first_line, @1.first_column)}
    | GETVALUE PARIZQ ID COMA EXPRESION PARDER   { {$$ = new AccesoLista($3,$5,@1.first_line, @1.first_column)} }

    | TOLOWER PARIZQ EXPRESION PARDER       {$$ = new ToLower($3,@1.first_line, @1.first_column)} 
    | TOUPPER PARIZQ EXPRESION PARDER        {$$ = new ToUpper($3,@1.first_line, @1.first_column)} 
    | LENGTH PARIZQ EXPRESION PARDER         {$$ = new Length($3,@1.first_line, @1.first_column)} 
    | TRUNCATE PARIZQ EXPRESION PARDER         {$$ = new Truncate($3,@1.first_line, @1.first_column)} 
    | ROUND PARIZQ EXPRESION PARDER         {$$ = new Round($3,@1.first_line, @1.first_column)} 
    | TYPEOF PARIZQ EXPRESION PARDER         {$$ = new Typeof($3,@1.first_line, @1.first_column)} 
    | TOSTRING PARIZQ EXPRESION PARDER         {$$ = new Tostring($3,@1.first_line, @1.first_column)} 
    

;


