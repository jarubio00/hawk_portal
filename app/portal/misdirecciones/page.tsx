
import ClientOnly from "@/app/components/ClientOnly";

import getDirecciones from "@/app/actions/getDirecciones";
import MisdireccionesClient from "./Misdirecciones";


const Misdirecciones  = async () => {


  const direcciones = await getDirecciones();

  //console.log(direcciones);
  



    return (
      <ClientOnly>
        <MisdireccionesClient  data={direcciones}/>

      </ClientOnly>
    )
  }

  const direccion = {
    clienteId : 1, 
    nombreDireccion: "Casa", 
    contactoNombre: "Catalina Rubio", 
    contactoTel: "8115995194", 
    cpId: 64850, 
    calle: "Vascongadas", 
    numero: "3505", 
    numeroInt: "", 
    colonia: "Torremolinos", 
    municipioId: 1, 
    empresa: "Xinet Solutions", 
    referencias: "Entre revolición y parsimonios"  
  }
  
export default Misdirecciones;