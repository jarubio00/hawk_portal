
export   function calcularTipoPaquete(props: any) {
      let tipo = {};
      
      const pesoMax = props.pesoVol > props.pesoPaq ? props.pesoVol : props.pesoPaq;

      switch(true) {
        case (pesoMax*1000 <= 3000):
          tipo = {tipo: 'MINI', id: 1, pesoMax: pesoMax}
          break;
        case (pesoMax*1000 > 3000 && pesoMax*1000 <= 5000):
          tipo = {tipo: 'CHICO', id: 2, pesoMax: pesoMax}
          break;
        case (pesoMax*1000 > 5000 && pesoMax*1000 <= 10000):
          tipo = {tipo: 'MEDIANO', id: 3, pesoMax: pesoMax}
          break;
        case (pesoMax*1000 > 10000 && pesoMax*1000 <= 15000):
          tipo = {tipo: 'GRANDE', id: 4, pesoMax: pesoMax}
          break;
        default: 
          tipo = {tipo: 'INVALIDO', id: 0, pesoMax: pesoMax}
      }


      return tipo;
}

