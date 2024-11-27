"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MuiDatePicker from "../../crear/components/MuiDatePicker";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";
import esLocale from "date-fns/locale/es";
import { dateString, namedDate } from "@/app/components/utils/helpers";

interface CotizarDatePickupProps {
  data?: string;
}

const CotizarDatePickup: React.FC<CotizarDatePickupProps> = ({ data }) => {
  const {
    datetime,
    datePickerOpen,
    dateSelected,
    updateDatePickerOpen,
    updateDateSelected,
  } = useNacionalCrearStore();

  const handleDateChange = (value: any) => {
    updateDateSelected(value);
  };
  return (
    <div className="flex flex-row items-center justify-between">
      <p className="text-blue-500">
        {dateSelected ? namedDate(dateSelected) : ""}
      </p>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={esLocale}
      >
        <MuiDatePicker
          dpOpen={datePickerOpen}
          setDpOpen={(val) => updateDatePickerOpen(!datePickerOpen)}
          value={dateSelected}
          onChange={(newValue) => handleDateChange(newValue)}
          bloqued={[]}
          datetime={datetime}
          disabled={false}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CotizarDatePickup;
