import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import "./react-datepicker.css";

export default function Datepicker() {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="p-2 border border-neutral-400 rounded-lg shadow-md w-48" onClick={onClick} ref={ref}>
      <div className="flex flex-row items-center justify-between px-2"> 
        <span>{value}</span>
        <span>X</span>
        
      </div>
      
    </div>
  ));

  function onChange(date) {
    setStartDate(date);
  }

  return (
  <DatePicker 
    selected={startDate} 
    onChange={onChange} 
    customInput={<ExampleCustomInput />}
    renderCustomHeader={({
      date,
      changeYear,
      changeMonth,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
    }) => (
      <div
        className="bg-rose-500"
      >
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          {"<"}
        </button>
        

        

        <button onClick={() => {}} disabled={false}>
          {">"}
        </button>
      </div>
    )}
  />
  );
}