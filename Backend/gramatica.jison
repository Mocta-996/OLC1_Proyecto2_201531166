/* Definición Léxica */
%lex

%options case-insensitive
%x string

%%


// simbolos reservados 
";"                  'PTCOMA';
"("                  'PARIZQ';
")"                  'PARDER';
"."                  'PUNTO';
":"                  'DOSPUNTOS';
","                  'COMA';
"["                  'CORIZR';
"]"                  'CORDER';
"{"                  'LLAVEIZQ';
"}"                  "LLAVEDER";
"?"                  'KLEENE';
"="                  'IGUAL';

"writeline"           'RWRITE';   
"true"               'TRUE';
"false"              'FALSE';
"new"                'NEW';
"dynamiclist"        'DYNAMICLIST';
"append"             'APPEND';
"getvalue"           'GETVALUE';
"setValue"           'SETVALUE';
"tolower"            'TOLOWER';
"toupper"            'TOUPPER';
"length"             'LENGTH';
"if"                 'IF';
"else"               'ELSE';
"switch"             'SWITCH';
"case"               'CASE';
"break"              'BREAK';
"default"            'DEFAULT';
"while"              'WHILE';
"for"                'FOR';
"do"                 'DO';
"void"               'VOID';
"continue"           'CONTINUE';
""             '';
"truncate"           'TRUNCATE';
"round"              'ROUND';
"typeof"             'TYPEOF';
"tostring"           'TOSTRING';
"tochararray"        'TOCHARARRAY';
"start"              'START';
"with"               'WITH';

"+"                  'MAS';
"-"                  'MENOS';
"*"                  'POR';
"/"                  'DIVISION';
"^"                  'POTENCIA';
"%"                  'MODULO';

"=="                 'IGUALACION';
"!="                 'DIFERENCIACION';
"<"                  'MENORQUE';
"<="                 'MENORIGUAL';
">"                  'MAYORQUE';
">="                 'MAYORIGUAL';

"&&"                 'AND';
"||"                 'OR';
"!"                  'NOT';

"int"                'RENTERO';
"string"                'RSTRING';
"char"                'RCHAR';
"boolean"                'RBOOLEAN';
"double"                'RDOUBLE';



/* Espacios en blanco */
[ \r\t]+            {}                      // espacio en blanco 
\n                  {}                      // salto
(\/\/).*                             {}     // comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {}     // comentario multilinea

[a-zA-Z][a-zA-Z0-9_]*    'ID';
[0-9]+("."[0-9]+)\b      'DECIMAL';
[0-9]+\b                 'ENTERO';
\'((\\\')|[^\n\'])*\'	{ yytext = yytext.substr(1,yyleng-2);  'CARACTER'; }
["]                             {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                   {cadena+="\n";}
<string>"\\t"                   {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                     {yytext=cadena; this.popState();  'CADENA';}

//\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); 	 'CADENA'; }


<<EOF>>                  'EOF';

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
    const {} = require('./Instruccion/');
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
 'OR'
 'AND'
 'FCAST'
 'IGUALACION' 'DIFERENCIACION'
 'MENORQUE' 'MAYORQUE' 'MAYORIGUAL' 'MENORIGUAL'
 'MAS' 'MENOS' 
 'POR' 'DIVISION' 'MODULO'
 'POTENCIA'
 'UMENOS ' 'NOT'

%start INICIO

%% /* Definición de la gramática */

INICIO
	: INSTRUCCIONES EOF 
;

INSTRUCCIONES
	: INSTRUCCIONES INSTRUCCION     
	| INSTRUCCION                   
;

INSTRUCCION
	: DEFPRINT         
    | DECLARACION      
    | ASIGNACION       
    | SENTENCIAIF               
    | SENTENCIASWITCH         
    | CICLOWHILE            
    | SENTENCIAFOR         
    | SENTENCIADOWHILE     
    | SENTENCIAFUNCION    
    | LLAMADAFUNCION       
    | RETORNAR PTCOMA       
    | BREAK PTCOMA 
    | CONTINUE PTCOMA 
    | START WITH LLAMADAFUNCION 
	| error PTCOMA
;

// ====================================================  GRAMATICA IMPRIMIR =================================
DEFPRINT
    : RWRITE PARIZQ LISTAEXPRESION PARDER PTCOMA  
;
LISTAEXPRESION
    : LISTAEXPRESION COMA EXPRESION 
    | EXPRESION  
;
//=================================== DECLARACION DE VARIABLES ===================================
DECLARACION
    : TIPOS DECLARAVARIOS PTCOMA 
    | TIPOS DECLARAVARIOS  IGUAL EXPRESION  PTCOMA  
    | TIPOS DECLARAVARIOS  IGUAL TERNARIO  PTCOMA  
    | TIPOS DECLARAVARIOS  IGUAL CASTEO PTCOMA  
    | TIPOS DECLARAVARIOS  IGUAL LLAMADAFUNCION  
    | TIPOS DECLARAVARIOS  CORIZR CORDER IGUAL NEW TIPOS CORIZR  EXPRESION CORDER PTCOMA  
    | TIPOS DECLARAVARIOS  CORIZR CORDER IGUAL LLAVEIZQ  LISTAVALORES LLAVEDER PTCOMA 
    | DYNAMICLIST MENORQUE TIPOS MAYORQUE DECLARAVARIOS  IGUAL NEW DYNAMICLIST MENORQUE TIPOS MAYORQUE PTCOMA 
    | DYNAMICLIST MENORQUE TIPOS MAYORQUE DECLARAVARIOS  IGUAL TOCHARARRAY PARIZQ EXPRESION PARDER PTCOMA 
   
   
;
DECLARAVARIOS
    : DECLARAVARIOS COMA ID  
    | ID                                            
;

LISTAVALORES
    :LISTAVALORES COMA EXPRESION    
    | EXPRESION                       
;

// ===================================== ASIGNACION DE VARIABLES YA DECLARADAS ==============================
ASIGNACION
    : ID IGUAL EXPRESION PTCOMA   
    | ID IGUAL TERNARIO  PTCOMA  
    | ID IGUAL CASTEO  PTCOMA   
    | ID IGUAL LLAMADAFUNCION  
    | EXPRESION  PTCOMA 
    | ID CORIZR EXPRESION CORDER  IGUAL EXPRESION PTCOMA 
    | APPEND PARIZQ ID COMA EXPRESION PARDER PTCOMA 
    | SETVALUE PARIZQ ID COMA EXPRESION COMA EXPRESION PARDER PTCOMA  
    | ID CORIZR CORIZR  EXPRESION CORDER CORDER IGUAL  EXPRESION PTCOMA  
    | ID IGUAL TOCHARARRAY PARIZQ  EXPRESION PARDER PTCOMA  
;

ASIGNACION2
    : ID IGUAL EXPRESION    
    | ID IGUAL TERNARIO     
    | ID IGUAL CASTEO    
;

// ===================================== CASTEO DE VALORES O VARIABLES ==============================
CASTEO  
    : PARIZQ TIPOCASTEO PARDER EXPRESION 
;
TIPOCASTEO
    :RENTERO                 
    |RDOUBLE                 
    |RCHAR                 
;
TIPOS
    :RENTERO                
    |RSTRING                
    |RDOUBLE                
    |RCHAR                  
    |RBOOLEAN                
    
;

// ====================================== OPERACION TERNARIA ================================================
TERNARIO
    : EXPRESION KLEENE EXPRESION DOSPUNTOS EXPRESION                  
;


// ========================================= SENTENCIA IF =================================================

SENTENCIAIF 
    :IF PARIZQ EXPRESION PARDER STATEMENT SENTENCIAELSE 
;

SENTENCIAELSE
    :ELSE STATEMENT     
    |ELSE SENTENCIAIF   
    | 
;

STATEMENT
    : LLAVEIZQ INSTRUCCIONES LLAVEDER         
    | LLAVEIZQ LLAVEDER                      
    | error LLAVEDER 
;

// ========================================= SENTENCIA SWITCH CASE  ==============================
SENTENCIASWITCH
    : SWITCH PARIZQ EXPRESION PARDER LLAVEIZQ LISTACASOS  LLAVEDER  
    | error LLAVEDER
;

LISTACASOS
    :CASE EXPRESION     DOSPUNTOS CASESTATEMENT                
    |LISTACASOS CASE EXPRESION  DOSPUNTOS CASESTATEMENT    
    |DEFAULT DOSPUNTOS CASESTATEMENT                    
    |LISTACASOS DEFAULT DOSPUNTOS CASESTATEMENT         
;

CASESTATEMENT 
    :INSTRUCCIONES                      
    |                                   
;

// ========================================= SENTENCIA WHILE ============================
CICLOWHILE
    : WHILE PARIZQ EXPRESION PARDER STATEMENT  
;


// ========================================= SENTENCIA FOR ============================

SENTENCIAFOR
    : FOR PARIZQ DECLARACION   EXPRESION PTCOMA EXPRESION PARDER STATEMENT 
    | FOR PARIZQ ASIGNACION   EXPRESION PTCOMA EXPRESION PARDER STATEMENT 
    | FOR PARIZQ DECLARACION   EXPRESION PTCOMA ASIGNACION2 PARDER STATEMENT 
    | FOR PARIZQ ASIGNACION   EXPRESION PTCOMA ASIGNACION2 PARDER STATEMENT 

;
// ========================================= SENTENCIA DO WHILE ============================

SENTENCIADOWHILE
    : DO STATEMENT WHILE PARIZQ EXPRESION PARDER PTCOMA 
;   

// ========================================= FUNCIONES ======================================================

SENTENCIAFUNCION 
    : TIPOS ID PARIZQ PARAMETROS PARDER STATEMENT 
    | TIPOS ID PARIZQ  PARDER STATEMENT 
    | VOID ID PARIZQ PARAMETROS PARDER STATEMENT 
    | VOID ID PARIZQ  PARDER STATEMENT 
;
PARAMETROS
    :PARAMETROS  COMA TIPOS ID 
    |TIPOS ID 
;

// ======================================== LLAMADA DE FUNCIONES ===========================================
LLAMADAFUNCION
    : ID PARIZQ PARDER PTCOMA   
    | ID PARIZQ LISTAPARAMETROS PARDER PTCOMA  
;
LISTAPARAMETROS
    : LISTAPARAMETROS COMA EXPRESION 
    | EXPRESION  
;

RETORNAR
    :       
    |  EXPRESION  
;

EXPRESION
    : EXPRESION MAS EXPRESION           
    | EXPRESION MENOS EXPRESION         
    | EXPRESION POR EXPRESION           
    | EXPRESION DIVISION EXPRESION      
    | EXPRESION POTENCIA EXPRESION     
    | EXPRESION MODULO EXPRESION        
    
    | EXPRESION IGUALACION EXPRESION         
    | EXPRESION DIFERENCIACION EXPRESION   
    | EXPRESION MENORQUE EXPRESION         
    | EXPRESION MAYORQUE EXPRESION         
    | EXPRESION MENORQUE IGUAL EXPRESION        
    | EXPRESION MAYORQUE IGUAL EXPRESION       
    | EXPRESION AND EXPRESION        
    | EXPRESION OR EXPRESION         
    | NOT EXPRESION %prec NOT        

    | EXPRESION MAS MAS                     
    | EXPRESION MENOS MENOS                  
    | PARIZQ EXPRESION PARDER          
    | ENTERO                           
    | DECIMAL                           
    | CADENA                           
    | CARACTER                         
    | TRUE                             
    | FALSE                             

    | ID                                 
    | ID CORIZR EXPRESION CORDER         
    | GETVALUE PARIZQ ID COMA EXPRESION PARDER z

    | TOLOWER PARIZQ EXPRESION PARDER      
    | TOUPPER PARIZQ EXPRESION PARDER       
    | LENGTH PARIZQ EXPRESION PARDER         
    | TRUNCATE PARIZQ EXPRESION PARDER         
    | ROUND PARIZQ EXPRESION PARDER         
    | TYPEOF PARIZQ EXPRESION PARDER        
    | TOSTRING PARIZQ EXPRESION PARDER         
    

;


