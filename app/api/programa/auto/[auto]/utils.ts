

export  async function checkIfBlockedRec(date: any, bloque: number, blocked: any[], hoyHora: number) {
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
    if (date.getDay() == 0) {
      result=true;
    }

    if (date.getDay() == 6 && hoyHora >= 10) {
      result=true;
    }
    console.log(date+' -- '+bloque+' -- '+result);
    return result;
  }

export  async function checkIfBlockedEnt(date: any, bloque: number, blocked: any[]) {
  const fecha = date.toISOString().slice(0, 10);
  const blockedRec = blocked.filter(function (item) {
    return item.tipo == 'ENT' || 
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
  if (date.getDay() == 0) {
    result=true;
  }

  if (date.getDay() == 6 && bloque == 2) {
    result=true;
  }
  console.log(date+' -- '+bloque+' -- '+result);
  return result;
}

  export  async function getNewDate(date: any, bloque: number, blocked: any[]) {
    const fecha = date.toISOString().slice(0, 10);

  }