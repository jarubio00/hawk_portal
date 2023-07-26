import { SafePedido } from '@/app/types';
import { IPedido } from '@/app/types/pedido';
import {logoZpl} from './logoZpl';


export function createZpl(p: IPedido, pedidoId: number) {
    let zplData = '';
    zplData+=zplData+=`^XA`;
    zplData+=logoZpl+``;
    zplData+=`^FT9,615^BQN,2,4`;
    zplData+=`^FH\^FDLA,{"id":${pedidoId},"pv":${p.cotizacion?.precio},"fp":1,"pt":"mini","c":1,"cc":600,"ot":1,"to":1}^FS`;
    zplData+=`^BY2,3,50^FT514,256^B3N,N,,N,N`;
    zplData+=`^FD1000023^FS`;
    zplData+=`^FT147,27^A0N,20,25^FH\^CI28^FD${p.recoleccion?.contactoNombre}^FS^CI27`;
    zplData+=`^FT147,52^A0N,20,25^FH\^CI28^FD${p.recoleccion?.calle} ${p.recoleccion?.numero} ${p.recoleccion?.numeroInt}^FS^CI27`;
    zplData+=`^FT147,77^A0N,20,25^FH\^CI28^FD${p.recoleccion?.colonia},Monterrey^FS^CI27`;
    zplData+=`^FT147,102^A0N,20,25^FH\^CI28^FD${p.recoleccion?.cpId}, Tel. ${p.recoleccion?.contactoTel}^FS^CI27`;
    zplData+=`^FO680,1^GB138,49,47^FS`;
    zplData+=`^LRY^FT703,40^A0N,39,38^FH\^CI28^FD100023^FS^CI27^LRN`;
    zplData+=`^FT9,456^A0N,17,18^FH\^CI28^FD14/07/2023  18:43^FS^CI27`;
    zplData+=`^FT674,133^A0N,21,20^FH\^CI28^FD17/07/2023^FS^CI27`;
    zplData+=`^FO0,189^GB812,0,3^FS`;
    zplData+=`^FT9,221^A0N,20,25^FH\^CI28^FD${p.destino?.contactoNombre}^FS^CI27`;
    zplData+=`^FT9,246^A0N,20,25^FH\^CI28^FD${p.destino?.calle} ${p.destino?.numero} ${p.destino?.numeroInt}^FS^CI27`;
    zplData+=`^FT9,271^A0N,20,25^FH\^CI28^FD${p.destino?.colonia}, ${p.destino?.municipio?.municipio}^FS^CI27`;
    zplData+=`^FT9,296^A0N,20,25^FH\^CI28^FD67174, Tel. ${p.destino?.contactoTel}^FS^CI27`;
    zplData+=`^FT709,588^A0N,85,86^FH\^CI28^FDMP^FS^CI27`;
    zplData+=`^FT162,490^A0N,19,18^FH\^CI28^FDPAQUETE ${p.paquete?.tipo?.tipo}^FS^CI27`;
    zplData+=`^FT162,514^A0N,19,18^FH\^CI28^FD${p.paquete?.paqAlto}x${p.paquete?.paqAncho}x${p.paquete?.paqLargo}CM - ${p.paquete?.paqPeso}KG^FS^CI27`;
    zplData+=`^FT162,538^A0N,19,18^FH\^CI28^FD${p.paquete?.paqContenido}^FS^CI27`;
    zplData+=`^FO570,154^GB245,35,33^FS`;
    zplData+=`^LRY^FT590,182^A0N,28,28^FH\^CI28^FD${p.metodoPago?.formaPagoId == 1 ? '     EFECTIVO' : 'TRANSFERENCIA'}^FS^CI27^LRN`;
    zplData+=`^FT775,490^A0N,23,23^FH\^CI28^FD${p.programa?.bloqueEntrega == 1 ? 'AM' : 'PM'}^FS^CI27`;
    zplData+= p.cobro ? `^FT568,300^A0N,28,28^FH\^CI28^FD$${p.cobroCantidad}^FS^CI27` : ``;
    zplData+=`^FT775,135^A0N,23,23^FH\^CI28^FD${p.programa?.bloqueRecoleccion == 1 ? 'AM' : 'PM'}^FS^CI27`;
    zplData+=`^FT674,488^A0N,21,20^FH\^CI28^FD18/07/2023^FS^CI27`;
    zplData+=`^FT147,128^A0N,20,20^FH\^CI28^FD${p.recoleccion?.referencias}^FS^CI27`;
    zplData+=`^FT147,152^A0N,20,20^FH\^CI28^FD --^FS^CI27`;
    zplData+=`^FT9,327^A0N,20,20^FH\^CI28^FD${p.destino?.referencias}^FS^CI27`;
    zplData+=`^FT9,348^A0N,20,20^FH\^CI28^FD --^FS^CI27`;
    zplData+=`^FO514,266^GE50,50,25^FS`;
    zplData+=`^FO529,272^GB16,38,14^FS`;
    zplData+= p.cobro ? `^LRY^FT529,302^A0N,30,30^FH\^CI28^FDC^FS^CI27^LRN` : ``;

    zplData+=`^LRY^FO700,511^GB107,0,96^FS^LRN`;
    zplData+=`^LRY^FO771,460^GB0,43,39^FS^LRN`;
    zplData+=`^LRY^FO771,105^GB0,43,39^FS^LRN`;
    zplData+=`^PQ1,0,1,Y`;
    zplData+=`^XZ`;

    return zplData;
    
}

export function createPdfZpl(p: IPedido, pedidoId: number) {
    let pdfZpl = '';

    let blank = `^XA
        ^MMT
        ^PW812
        ^LL609
        ^LS0
        ^FT0,605^A0N,17,18^FH\^CI28^FD-^FS^CI27
        ^PQ1,0,1,Y
        ^XZ`;

    let zplData = '';
    zplData+=zplData+=`^XA`;
    zplData+=logoZpl+``;
    zplData+=`^FT9,615^BQN,2,4`;
    zplData+=`^FH\^FDLA,{"id":${pedidoId},"pv":${p.cotizacion?.precio},"fp":1,"pt":"mini","c":1,"cc":600,"ot":1,"to":1}^FS`;
    zplData+=`^BY2,3,50^FT514,256^B3N,N,,N,N`;
    zplData+=`^FD1000023^FS`;
    zplData+=`^FT147,27^A0N,20,25^FH\^CI28^FD${p.recoleccion?.contactoNombre}^FS^CI27`;
    zplData+=`^FT147,52^A0N,20,25^FH\^CI28^FD${p.recoleccion?.calle} ${p.recoleccion?.numero} ${p.recoleccion?.numeroInt}^FS^CI27`;
    zplData+=`^FT147,77^A0N,20,25^FH\^CI28^FD${p.recoleccion?.colonia},Monterrey^FS^CI27`;
    zplData+=`^FT147,102^A0N,20,25^FH\^CI28^FD${p.recoleccion?.cpId}, Tel. ${p.recoleccion?.contactoTel}^FS^CI27`;
    zplData+=`^FO680,1^GB138,49,47^FS`;
    zplData+=`^LRY^FT703,40^A0N,39,38^FH\^CI28^FD100023^FS^CI27^LRN`;
    zplData+=`^FT9,456^A0N,17,18^FH\^CI28^FD14/07/2023  18:43^FS^CI27`;
    zplData+=`^FT674,133^A0N,21,20^FH\^CI28^FD17/07/2023^FS^CI27`;
    zplData+=`^FO0,189^GB812,0,3^FS`;
    zplData+=`^FT9,221^A0N,20,25^FH\^CI28^FD${p.destino?.contactoNombre}^FS^CI27`;
    zplData+=`^FT9,246^A0N,20,25^FH\^CI28^FD${p.destino?.calle} ${p.destino?.numero} ${p.destino?.numeroInt}^FS^CI27`;
    zplData+=`^FT9,271^A0N,20,25^FH\^CI28^FD${p.destino?.colonia}, ${p.destino?.municipio?.municipio}^FS^CI27`;
    zplData+=`^FT9,296^A0N,20,25^FH\^CI28^FD67174, Tel. ${p.destino?.contactoTel}^FS^CI27`;
    zplData+=`^FT709,588^A0N,85,86^FH\^CI28^FDMP^FS^CI27`;
    zplData+=`^FT162,490^A0N,19,18^FH\^CI28^FDPAQUETE ${p.paquete?.tipo?.tipo}^FS^CI27`;
    zplData+=`^FT162,514^A0N,19,18^FH\^CI28^FD${p.paquete?.paqAlto}x${p.paquete?.paqAncho}x${p.paquete?.paqLargo}CM - ${p.paquete?.paqPeso}KG^FS^CI27`;
    zplData+=`^FT162,538^A0N,19,18^FH\^CI28^FD${p.paquete?.paqContenido}^FS^CI27`;
    zplData+=`^FO620,154^GB195,35,33^FS`;
    zplData+=`^LRY^FT670,182^A0N,28,28^FH\^CI28^FD   ${p.metodoPago?.formaPagoId == 1 ? 'EFECTIVO' : 'TRANSFERENCIA'}   ^FS^CI27^LRN`;
    zplData+=`^FT775,490^A0N,23,23^FH\^CI28^FD${p.programa?.bloqueEntrega == 1 ? 'AM' : 'PM'}^FS^CI27`;
    zplData+= p.cobro ? `^FT568,300^A0N,28,28^FH\^CI28^FD$${p.cobroCantidad}^FS^CI27` : ``;
    zplData+=`^FT775,135^A0N,23,23^FH\^CI28^FD${p.programa?.bloqueRecoleccion == 1 ? 'AM' : 'PM'}^FS^CI27`;
    zplData+=`^FT674,488^A0N,21,20^FH\^CI28^FD18/07/2023^FS^CI27`;
    zplData+=`^FT147,128^A0N,20,20^FH\^CI28^FD${p.recoleccion?.referencias}`;
    //zplData+=`^FT147,152^A0N,20,20^FH\^CI28^FD verde.^FS^CI27`;
    zplData+=`^FT9,327^A0N,20,20^FH\^CI28^FD${p.destino?.referencias}`;
    //zplData+=`^FT9,348^A0N,20,20^FH\^CI28^FD verde.^FS^CI27`;
    zplData+=`^FO514,266^GE50,50,25^FS`;
    zplData+=`^FO529,272^GB16,38,14^FS`;
    zplData+= p.cobro ? `^LRY^FT529,302^A0N,30,30^FH\^CI28^FDC^FS^CI27^LRN` : ``;

    zplData+=`^LRY^FO700,511^GB107,0,96^FS^LRN`;
    zplData+=`^LRY^FO771,460^GB0,43,39^FS^LRN`;
    zplData+=`^LRY^FO771,105^GB0,43,39^FS^LRN`;
    zplData+=`^PQ1,0,1,Y`;
    zplData+=`^XZ`;

    pdfZpl = zplData+blank+zplData;

    return pdfZpl;
    
}