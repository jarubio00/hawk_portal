import { SafePedido } from '@/app/types';
import {logoZpl} from './logoZpl';


export function createZpl(p: SafePedido) {
    let zplData = '';
    zplData+=zplData+=`^XA\n`;
    zplData+=logoZpl+`\n`;
    zplData+=`^FT9,615^BQN,2,4\n`;
    zplData+=`^FH\^FDLA,{"id":${p.id},"pv":${p.precioVenta},"fp":1,"pt":"mini","c":1,"cc":600,"ot":1,"to":1}^FS\n`;
    zplData+=`^BY2,3,50^FT514,256^B3N,N,,N,N\n`;
    zplData+=`^FD1000023^FS\n`;
    zplData+=`^FT147,27^A0N,20,25^FH\^CI28^FD${p.recoleccion.contactoNombre}^FS^CI27\n`;
    zplData+=`^FT147,52^A0N,20,25^FH\^CI28^FD${p.recoleccion.calle} ${p.recoleccion.numero} ${p.recoleccion.numeroInt}^FS^CI27\n`;
    zplData+=`^FT147,77^A0N,20,25^FH\^CI28^FD${p.recoleccion.colonia},Monterrey^FS^CI27\n`;
    zplData+=`^FT147,102^A0N,20,25^FH\^CI28^FD${p.recoleccion.cpId}, Tel. ${p.recoleccion.contactoTel}^FS^CI27\n`;
    zplData+=`^FO680,1^GB138,49,47^FS\n`;
    zplData+=`^LRY^FT703,40^A0N,39,38^FH\^CI28^FD100023^FS^CI27^LRN\n`;
    zplData+=`^FT9,456^A0N,17,18^FH\^CI28^FD14/07/2023  18:43^FS^CI27\n`;
    zplData+=`^FT674,133^A0N,21,20^FH\^CI28^FD17/07/2023^FS^CI27\n`;
    zplData+=`^FO0,189^GB812,0,3^FS\n`;
    zplData+=`^FT9,221^A0N,20,25^FH\^CI28^FDGerardo Ortiz^FS^CI27\n`;
    zplData+=`^FT9,246^A0N,20,25^FH\^CI28^FDPacifica 145^FS^CI27\n`;
    zplData+=`^FT9,271^A0N,20,25^FH\^CI28^FDEl roble, San Nicolás^FS^CI27\n`;
    zplData+=`^FT9,296^A0N,20,25^FH\^CI28^FD67174, Tel. 81 83467832^FS^CI27\n`;
    zplData+=`^FT709,588^A0N,85,86^FH\^CI28^FDEF^FS^CI27\n`;
    zplData+=`^FT162,490^A0N,19,18^FH\^CI28^FDPAQUETE CHICO^FS^CI27\n`;
    zplData+=`^FT162,514^A0N,19,18^FH\^CI28^FD12x20x40CM - 6KG^FS^CI27\n`;
    zplData+=`^FT162,538^A0N,19,18^FH\^CI28^FD|| Ropa para bebe^FS^CI27\n`;
    zplData+=`^FO620,154^GB195,35,33^FS\n`;
    zplData+=`^LRY^FT670,182^A0N,28,28^FH\^CI28^FD   EFECTIVO   ^FS^CI27^LRN\n`;
    zplData+=`^FT775,490^A0N,23,23^FH\^CI28^FDPM^FS^CI27\n`;
    zplData+=`^FT568,300^A0N,28,28^FH\^CI28^FD$1,800^FS^CI27\n`;
    zplData+=`^FT775,135^A0N,23,23^FH\^CI28^FDAM^FS^CI27\n`;
    zplData+=`^FT674,488^A0N,21,20^FH\^CI28^FD18/07/2023^FS^CI27\n`;
    zplData+=`^FT147,128^A0N,20,20^FH\^CI28^FD|| Entre corea y atitlan, pasando el local^FS^CI27\n`;
    zplData+=`^FT147,152^A0N,20,20^FH\^CI28^FD verde.^FS^CI27\n`;
    zplData+=`^FT9,327^A0N,20,20^FH\^CI28^FD|| Entre corea y atitlan, pasando el local^FS^CI27\n`;
    zplData+=`^FT9,348^A0N,20,20^FH\^CI28^FD verde.^FS^CI27\n`;
    zplData+=`^FO514,266^GE50,50,25^FS\n`;
    zplData+=`^FO529,272^GB16,38,14^FS\n`;
    zplData+=`^LRY^FT529,302^A0N,30,30^FH\^CI28^FDC^FS^CI27^LRN\n`;

    zplData+=`^LRY^FO700,511^GB107,0,96^FS^LRN\n`;
    zplData+=`^LRY^FO771,460^GB0,43,39^FS^LRN\n`;
    zplData+=`^LRY^FO771,105^GB0,43,39^FS^LRN\n`;
    zplData+=`^PQ1,0,1,Y\n`;

    return zplData;
    
}