import prisma from "@/app/libs/prismadb";

/* 
1	registro	Resgistro sistema	El cliente se registro en el sistema
2	firstLogin	Inicio sesión inicial	El cliente inicio sesión por primera vez
3	login	Inicio sesión	El cliente inicio sesión en el sistema
4	cambioPass	Cambio contrasaña	El cliente cambio la contraseña
5	cambioCel	Cambio número celular	El cliente cambió y verificó un nuevo celular
6	addDireccion	Agregar dirección	El cliente agregó una nueva dirección de recolección
7	editDireccion	Editar dirección	El cliente edito una dirección de recolección
8	delDireccion	Eliminar dirección	El cliente elimino una dirección de recolección
9	addDestino	Agregar destino	El cliente agregó una nueva dirección de destino
10	editDestino	Editar destino	El cliente edito una dirección de destino
11	delDestino	Eliminar destino	El cliente elimino una dirección de destino
12	addPaquete	Agregar paquete	El cliente agregó un nuevo paquete favorito
13	editPaquete	Editar paquete	El cliente edito un paquete favorito
14	delPaquete	Eliminar paquete	El cliente elimino un paquete favorito
15	addEnvio	Generar envío	El cliente generó un nuevo envío
16	editNombre	Editar nombre	"El cliente editó su nombre 
17	editEmpresa	Editar empresa	El cliente edito su nombre 

*/

export async function userActivityRegister(clienteId: number, tipoId: number) {
  //console.log("actividad info");
  //console.log(clienteId, tipoId);

  try {
    const addActivity = await prisma.actividadPlataformaClientes.create({
      data: {
        clienteId: clienteId,
        tipoId: tipoId,
      },
    });
    if (addActivity) {
      return { error: false, statusMessage: "OK" };
    } else {
      return { error: true, statusMessage: "ERROR al insertar la actividad" };
    }
  } catch (err) {
    console.log(err);
  }
}
