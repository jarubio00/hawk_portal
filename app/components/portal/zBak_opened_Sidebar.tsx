'use client';

import { forwardRef, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BiSearch, BiCurrentLocation } from 'react-icons/bi';

import {
  BsFillBoxSeamFill
  } from 'react-icons/bs'
  
  import { AiFillFire, AiFillMessage, } from 'react-icons/ai'
  import { IoMdArrowRoundUp,IoMdPricetag } from 'react-icons/io'
  import { MdNightlightRound, MdLocationOn, MdViewInAr } from 'react-icons/md'
  import { FaCog, FaPlus, FaHome, FaMapMarkedAlt, } from 'react-icons/fa'
  import { AiOutlineMenu } from "react-icons/ai";
  import { GoPackage } from "react-icons/go";
import Button from "../Button";


interface SidebarProps {
    showNav: boolean;
}

export type Ref = HTMLButtonElement;

const SideBar = forwardRef<Ref, SidebarProps>((showNav, ref) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-[92vh] pt-8 justify-between">    
        <div className='grow my-0'>
          <div className="flex mx-auto px-6 w-full justify-center items-end mb-6 rounded-lg">
          <Link href={`/portal/crear`}>
              <Button 
                label="Programar envío"
                onClick={() => {}}
                icon={FaPlus}
                />
          </Link>
          </div>
            {data.map((group,index) => (
                <div key={index} className='my-2' >
                    <div className="pl-4 mb-2 text-sm text-gray-500">
                        {group.name}
                    </div>
                    <hr className="mb-3"></hr>
                    <div className="mb-4">
                        {group.items.map((item, index2) => (
                            <div key={index2}>
                                <Link href={`${item.route}`}>
                                    <div
                                        key={index2}
                                        className={`pl-2 py-1 mx-2  rounded text-center text-sm cursor-pointer mb-1 flex items-center transition-colors ${
                                        pathname == `${item.route}`
                                            ? "text-black-800 font-bold text-sm"
                                            : "text-neutral-600 hover:bg-gray-100 hover:text-gray-600 text-md"
                                        }`}
                                        >
                                            <div className="mr-2">
                                                <div 
                                                    className={`
                                                        p-1 
                                                        mr-1
                                                        ${pathname == `${item.route}`
                                                                ? "bg-rose-500 "
                                                                : "text-neutral-600 hover:bg-gray-200 hover:text-gray-600"
                                                            }
                                                        rounded-full 
                                                        text-white
                                                    `}
                                                    >
                                                    <item.icon size={20} />
                                                </div>
                                            </div>
                                            
                                            <span>{item.title}</span>
                                            
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div className="flex mx-auto  w-full justify-center items-end mb-2 rounded-lg">
            <img
                onClick={() => router.push('/portal/mispedidos')}
                className="block w-20 md:w-32  cursor-pointer" 
                src="/images/plat-hawk3.png" 
            />
        </div>
    </div>

  );

  
});

const data = [
    {
      name: 'Operaciones',
      items: [
        {
          title: 'Mis envíos',
          icon: BsFillBoxSeamFill,
          route: '/portal/adm/mispedidos'
        },
        {
          title: 'Cotizar',
          icon: IoMdPricetag,
          route: '/portal/adm/cotizar'
        },
        {
          title: 'Cobertura',
          icon: FaMapMarkedAlt,
          route: '/portal/adm/cobertura'
        },
        {
          title: 'Rastreo',
          icon: BiCurrentLocation,
          route: '/portal/adm/rastreo'
        },
      ]
    },
    {
      name: 'Administrar',
      items: [
        {
          title: 'Mis direcciones',
          icon: FaHome,
          route: '/portal/adm/misdirecciones'
        },
        {
          title: 'Destinos',
          icon: MdLocationOn,
          route: '/portal/adm/destinos'
        },
        {
          title: 'Paquetes',
          icon: MdViewInAr,
          route: '/portal/adm/paquetes'
        }
      ]
    },
  ]

SideBar.displayName = "SideBar";

export default SideBar;