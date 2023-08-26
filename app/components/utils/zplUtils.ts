import { SafePedido } from '@/app/types';
import { IPedido } from '@/app/types/pedido';
import {logoZpl} from './logoZpl';
import {logoZplv2} from './logoZplv2';


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
    zplData+=`^LRY^FT703,40^A0N,39,38^FH\^CI28^FD${pedidoId}^FS^CI27^LRN`;
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
    zplData+=`^LRY^FT703,40^A0N,39,38^FH\^CI28^FD${pedidoId}^FS^CI27^LRN`;
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



export function createZplv2(p: IPedido, pedidoId: number) {
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
    zplData+=logoZplv2+``;

    zplData+=`^FT12,1210^BQN,2,6`;
    zplData+=`^FH\^FDLA,{"id":100001,"pv":58,"fp":1,"pt":"mini","c":1,"cc":600,"ot":1,"to":1}^FS`;
    zplData+=`^BY2,3,84^FT511,285^B3N,N,,N,N`;
    zplData+=`^FD1000023^FS`;
    zplData+=`^FT12,304^A0N,29,35^FH\^CI28^FDPedro Méndez^FS^CI27`;
    zplData+=`^FT12,340^A0N,29,35^FH\^CI28^FDVascongadas 3505^FS^CI27`;
    zplData+=`^FT12,376^A0N,29,35^FH\^CI28^FDTorremolinos,Monterrey^FS^CI27`;
    zplData+=`^FT12,412^A0N,29,35^FH\^CI28^FD64850, Tel. 8132508250^FS^CI27`;
    zplData+=`^FT198,28^A0N,24,23^FH\^CI28^FD14/07/2023  18:43^FS^CI27`;
    zplData+=`^FT660,354^A0N,24,23^FH\^CI28^FD17/07/2023^FS^CI27`;
    zplData+=`^FO0,189^GB812,0,3^FS`;
    zplData+=`^FT12,777^A0N,29,28^FH\^CI28^FDGerardo Ortiz^FS^CI27`;
    zplData+=`^FT12,813^A0N,29,28^FH\^CI28^FDPacifica 145^FS^CI27`;
    zplData+=`^FT12,849^A0N,29,28^FH\^CI28^FDEl roble, San Nicolás^FS^CI27`;
    zplData+=`^FT12,885^A0N,29,28^FH\^CI28^FD67174, Tel. 81 83467832^FS^CI27`;
    zplData+=`^FT198,63^A0N,25,23^FH\^CI28^FDPAQUETE CHICO^FS^CI27`;
    zplData+=`^FT198,94^A0N,25,23^FH\^CI28^FD12x20x40CM - 6KG^FS^CI27`;
    zplData+=`^FT198,125^A0N,25,23^FH\^CI28^FD|| Ropa para bebe^FS^CI27`;
    zplData+=`^FT769,1048^A0N,30,28^FH\^CI28^FDPM^FS^CI27`;
    zplData+=`^FT672,131^A0N,50,51^FH\^CI28^FD$1,800^FS^CI27`;
    zplData+=`^FT773,355^A0N,27,25^FH\^CI28^FDAM^FS^CI27`;
    zplData+=`^FT660,1045^A0N,24,23^FH\^CI28^FD18/07/2023^FS^CI27`;
    zplData+=`^FT12,446^A0N,23,23^FH\^CI28^FD|| Entre corea y atitlan, pasando el local verde.^FS^CI27`;
    zplData+=`^FO606,73^GE66,64,33^FS`;
    zplData+=`^FO629,87^GB20,48,18^FS`;
    zplData+=`^LRY^FT629,125^A0N,38,38^FH\^CI28^FDC^FS^CI27^LRN`;
    zplData+=`^FT12,475^A0N,23,23^FH\^CI28^FDlinea 2^FS^CI27`;
    zplData+=`^FT12,922^A0N,23,23^FH\^CI28^FD|| Entre corea y atitlan, pasando el local verde.^FS^CI27`;
    zplData+=`^FT12,951^A0N,23,23^FH\^CI28^FDlinea 2^FS^CI27`;
    zplData+=`^FO0,979^GB811,0,7^FS`;
    zplData+=`^FT630,185^A0N,27,25^FH\^CI28^FDTRANSFERENCIA^FS^CI27`;
    zplData+=`^FT617,516^A0N,95,106^FH\^CI28^FDGPE^FS^CI27`;
    zplData+=`^FT664,44^A0N,33,43^FH\^CI28^FD1009890^FS^CI27`;
    zplData+=`^FT609,1193^A0N,95,106^FH\^CI28^FDMTY^FS^CI27`;
    zplData+=`^FT17,252^A0N,27,25^FH\^CI28^FDOrigen^FS^CI27`;
    zplData+=`^FT17,734^A0N,27,28^FH\^CI28^FDDestino^FS^CI27`;
    zplData+=`^FO0,540^GB812,0,6^FS`;
    zplData+=`^FO0,683^GB812,0,6^FS`;
    zplData+=`^LRY^FO624,157^GB188,0,29^FS^LRN`;
    zplData+=`^LRY^FO764,1006^GB0,49,47^FS^LRN`;
    zplData+=`^LRY^FO768,317^GB0,50,43^FS^LRN`;
    zplData+=`^LRY^FO597,389^GB214,0,147^FS^LRN`;
    zplData+=`^LRY^FO656,0^GB156,0,50^FS^LRN`;
    zplData+=`^LRY^FO597,1070^GB214,0,147^FS^LRN`;
    zplData+=`^LRY^FO12,222^GB84,0,29^FS^LRN`;
    zplData+=`^LRY^FO12,706^GB102,0,31^FS^LRN`;
    zplData+=`^PQ1,0,1,Y`;
    zplData+=`^XZ`;

    pdfZpl = zplData;

    return pdfZpl;
    
}