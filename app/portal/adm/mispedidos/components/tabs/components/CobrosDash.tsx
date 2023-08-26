'use client';

import StatCard from "@/app/components/StatCard";
import {currencyFormat} from "@/app/components/utils/helpers";
import { FaHandHoldingDollar, FaMagnifyingGlassDollar, FaSackDollar } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi";

interface CobrosDashProps {
 data: any;
}

const CobrosDash: React.FC<CobrosDashProps> = ({
 data
}) => {

  const cobrados = data?.cobrados ? data.cobrados : 0;
  const porcobrar = data?.porcobrar ? data.porcobrar : 0;
  const total = data?.porcobrar && data.cobrados ? (data.porcobrar+data.cobrados) : 0
  const retorno = data?.porcobrar && data.cobrados ? (data.porcobrar+data.cobrados) * .965 : 0

 return (
  <div className="w-full px-4 md:px-2 xl:w-4/6 mx-auto md:mx-0 my-2 mt-4">
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard title="Cobrados" value={currencyFormat(cobrados) || '0'} icon={FaHandHoldingDollar}/>
        <StatCard title="Por cobrar" value={currencyFormat(porcobrar) || '0'}  icon={FaMagnifyingGlassDollar}/>
        <StatCard title="Total cobros" value={currencyFormat(total)} icon={HiCurrencyDollar}/>
        <StatCard title="Total retorno " value={currencyFormat(retorno)}  icon={FaSackDollar}/>
      </div>
  </div>
 );
}

export default CobrosDash;