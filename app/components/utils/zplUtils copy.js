import {logoZpl} from './logoZpl';


export function createZpl(p) {
    let zplData = '';
    zplData+=zplData+='^XA\n';
    zplData+=logoZpl+'\n';
    zplData+='^FT9,615^BQN,2,4\n'
    zplData+='^FH\^FDLA,{"id":100001,"pv":58,"fp":1,"pt":"mini","c":1,"cc":600,"ot":1,"to":1}^FS\n'
    zplData+='^BY2,3,50^FT514,256^B3N,N,,N,N\n'
    zplData+='^FD1000023^FS\n'
    zplData+='^FT147,27^A0N,20,25^FH\^CI28^FDPedro Méndez^FS^CI27\n'
    zplData+='^FT147,52^A0N,20,25^FH\^CI28^FDVascongadas 3505^FS^CI27\n'
    zplData+='^FT147,77^A0N,20,25^FH\^CI28^FDTorremolinos,Monterrey^FS^CI27\n'
    zplData+='^FT147,102^A0N,20,25^FH\^CI28^FD64850, Tel. 8132508250^FS^CI27\n'
    zplData+='^FT695,53^A0N,39,38^FH\^CI28^FD100023^FS^CI27\n'
    zplData+='^FT9,456^A0N,17,18^FH\^CI28^FD14/07/2023  18:43^FS^CI27\n'
    zplData+='^FT674,133^A0N,21,20^FH\^CI28^FD17/07/2023^FS^CI27\n'
    zplData+='^FO0,189^GB587,0,3^FS\n'
    zplData+='^FT9,221^A0N,20,20^FH\^CI28^FDGerardo Ortiz^FS^CI27\n'
    zplData+='^FT9,246^A0N,20,20^FH\^CI28^FDPacifica 145^FS^CI27\n'
    zplData+='^FT9,271^A0N,20,20^FH\^CI28^FDEl roble, San Nicolás^FS^CI27\n'
    zplData+='^FT9,296^A0N,20,20^FH\^CI28^FD67174, Tel. 81 83467832^FS^CI27\n'    
    zplData+='^FT162,490^A0N,19,18^FH\^CI28^FDPAQUETE CHICO^FS^CI27\n'
    zplData+='^FT162,514^A0N,19,18^FH\^CI28^FD12x20x40CM - 6KG^FS^CI27\n'
    zplData+='^FT162,538^A0N,19,18^FH\^CI28^FD|| Ropa para bebe^FS^CI27\n'
    zplData+='^FT690,191^A0N,28,28^FH\^CI28^FDEFECTIVO^FS^CI27\n'
    zplData+='^FT568,300^A0N,28,28^FH\^CI28^FD$1,800^FS^CI27\n'
    zplData+='^FT674,488^A0N,21,20^FH\^CI28^FD18/07/2023^FS^CI27\n'
    zplData+='^FT147,121^A0N,20,25^FH\^CI28^FDEntre atitlan y cananea, al lado de casa^FS^CI27\n'
    zplData+='^FT147,141^A0N,16,23^FH\^CI28^FD verde.^FS^CI27\n'
    zplData+='^FO514,266^GE50,50,25^FS\n'
    zplData+='^FO529,272^GB16,38,14^FS\n'
    zplData+='^LRY^FT531,309^A0N,30,30^FH\^CI28^FDC^FS^CI27^LRN\n'
    zplData+='^LRY^FO664,7^GB145,0,50^FS^LRN\n'
    zplData+='^FT709,612^A0N,85,86^FH\^CI28^FDEF^FS^CI27\n'
    zplData+='^LRY^FO700,511^GB107,0,96^FS^LRN\n'
    zplData+='^LRY^FO588,157^GB224,0,35^FS^LRN\n'
    zplData+='^FT775,135^A0N,23,23^FH\^CI28^FDAM^FS^CI27\n'
    zplData+='^LRY^FO771,105^GB0,43,39^FS^LRN\n'
    zplData+='^FT775,490^A0N,23,23^FH\^CI28^FDPM^FS^CI27\n'
    zplData+='^LRY^FO771,450^GB0,43,39^FS^LRN\n'
    zplData+='^PQ1,0,1,Y\n'
    zplData+='^XZ\n'

    return zplData;
    
}