

export  async function checkIfBlockedRec(date: any, bloque: number, blocked: any[]) {

    
    const fecha = date.toISOString().slice(0, 10);
    const blockedRec = blocked.filter(function (item) {
      return item.tipo == 'REC' || 
        item.tipo == 'AMBOS'
    });

    let result = false;
    //console.log(blockedRec);

    blockedRec.map((val) => {
      const valFecha = val.fecha.toISOString().slice(0, 10);
      //console.log(valFecha);
      //console.log(fecha);

      if (bloque == 1) {
        if ((val.bloque == "AM" || val.bloque == "DIA") && valFecha == fecha) {
          //console.log('match am')
          result = true
        }
        
      } else if (bloque == 2) {
        if ((val.bloque == "PM" || val.bloque == "DIA") && valFecha == fecha) {
          result = true
        }  
      }
    })
    console.log(date+' -- '+bloque+' -- '+result);
    return result;
  }

  export  async function getNewDate(date: any, bloque: number, blocked: any[]) {
    const fecha = date.toISOString().slice(0, 10);

  }