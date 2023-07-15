'use client';
import Button from "@/app/components/Button";
import * as JSPM from "jsprintmanager";
import { useEffect } from "react";

interface PrintManagerProps {

}

const PrintManager: React.FC<PrintManagerProps> = ({


}) => {

useEffect(() => {
    let jspmDevice = null;

    JSPM.JSPrintManager.auto_reconnect = true;
    JSPM.JSPrintManager.start();
    
    //@ts-ignore
    JSPM.JSPrintManager.WS.onStatusChanged = function () {
    if (jspmWSStatus()) {
        //get scanners
        JSPM.JSPrintManager.getPrinters().then(function(printersList) {
            console.log(printersList)
        });
  }
};
},[])

function jspmWSStatus() {
    if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open) return true;
    else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Closed) {
      console.warn(
        "JSPrintManager (JSPM) is not installed or not running! Download JSPM Client App from https://neodynamic.com/downloads/jspm"
      );
      return false;
    } else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Blocked) {
      alert("JSPM has blocked this website!");
      return false;
    }
  }

  const print = () => {
    if (jspmWSStatus()) {
        var cpj = new JSPM.ClientPrintJob();
        cpj.clientPrinter = new JSPM.InstalledPrinter("LMTP1");
        var cmds = "^XA";
            cmds += "^FO20,30^GB750,1100,4^FS";
            cmds += "^FO20,30^GB750,200,4^FS";
            cmds += "^FO20,30^GB750,400,4^FS";
            cmds += "^FO20,30^GB750,700,4^FS";
            cmds += "^FO20,226^GB325,204,4^FS";
            cmds += "^FO30,40^ADN,36,20^FDShip to:^FS";
            cmds += "^FO30,260^ADN,18,10^FDPart number #^FS";
            cmds += "^FO360,260^ADN,18,10^FDDescription:^FS";
            cmds += "^FO30,750^ADN,36,20^FDFrom:^FS";
            cmds += "^FO150,125^ADN,36,20^FDAcme Printing^FS";
            cmds += "^FO60,330^ADN,36,20^FD14042^FS";
            cmds += "^FO400,330^ADN,36,20^FDScrew^FS";
            cmds += "^FO70,480^BY4^B3N,,200^FD12345678^FS";
            cmds += "^FO150,800^ADN,36,20^FDMacks Fabricating^FS";
            cmds += "^XZ";
            cpj.printerCommands = cmds;
            cpj.sendToClient();
    }
  }


  return ( 
    <div className="my-4 flex flex-col">
        <p className="font-lg my-1">Print ZPL test</p>
        <p>
            <pre>
            {JSON.stringify({
                id: 100001,
                pv: 58,
                fp: 1,
                pt: 'mini',
                c: 1,
                cc: 600,
                ot: 1,
                to: 1
                })}
            </pre>
        </p>
        <Button 
            label="Print"
            onClick={() => print()}
            />
    </div>
   );
}
 
export default PrintManager;