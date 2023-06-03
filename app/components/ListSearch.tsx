'use client';

import SearchInput from "@/app/components/inputs/SearchInput";
import { useState } from "react";

interface ListSearchProps {
  inputArray: any;
  filteredData: (data: any) => void;
  onReset: () => void;
  keys: string[];
  disabled?: boolean;
  minLength?: number;
}

const ListSearch: React.FC<ListSearchProps> = ({
    inputArray,
    filteredData,
    onReset,
    keys,
    disabled,
    minLength=1
}) => {

    const [value, setValue] = useState('');

    const handleSearch = (keyword: any) => {
    
        if (keyword) {
            //console.log(inputArray);
            const filtered = inputArray.filter((row: any) => {
              let matches = true;
    
              const searchKeys = keys;
    
              let containsQuery = false;
    
              searchKeys.forEach((key) => {
                if (row[key].toString().toLowerCase().includes(keyword.toString().toLowerCase())) {
                  containsQuery = true;
                }
              });
    
              if(!containsQuery) {
                matches = false;
              }
    
              return matches;
    
            });
    
           filteredData(filtered);
        }
    
      }

      const handleClear = () => {
        setValue('');
        onReset();
      }


  return (
    <SearchInput
        id="search"
        label="Buscar dirección"
        value={value}
        disabled={disabled}
        onClear={handleClear}
        onChange={(event: any) => {
            const val = event.target.value;
            setValue(val);

            if (val.length >= minLength) {
                handleSearch(val);
            } else {
                console.log('menos de 3')
                onReset();
            }
            

        }}
        />
   );
}
 
export default ListSearch;