'use client';

import { forwardRef, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BiSearch } from 'react-icons/bi';

import {
    BsPlus,
    BsSearch,
    BsEyeFill,
    BsBookmarkFill,
    BsFillArrowLeftSquareFill,
    BsPeopleFill,
    BsTerminalFill,
    BsFillArrowRightSquareFill
  } from 'react-icons/bs'
  
  import { AiFillFire, AiFillMessage, } from 'react-icons/ai'
  import { IoMdArrowRoundUp } from 'react-icons/io'
  import { MdNightlightRound, MdFeedback } from 'react-icons/md'
  import { FaCog } from 'react-icons/fa'
  import { AiOutlineMenu } from "react-icons/ai";


interface SidebarProps {
    showNav: boolean;
}

export type Ref = HTMLButtonElement;

const SideBar = forwardRef<Ref, SidebarProps>((showNav, ref) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    // @ts-ignore
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
        <div className="flex flex-col h-5/6 pt-8 justify-between">    
            <div className='grow my-0'>
                {data.map((group,index) => (
                    <div key={index} className='my-2' >
                        <div className="pl-4 mb-2 text-sm text-gray-500">
                            {group.name}
                        </div>
                        <hr className="mb-3"></hr>

                        {group.items.map((item, index2) => (
                            <div
                                key={index2}
                                onClick={() => router.push(`${item.route}`)}
                                className={`pl-4 py-1 mx-5  rounded text-center cursor-pointer mb-1 flex items-center transition-colors ${
                                pathname == `${item.route}`
                                    ? "text-black-800 font-bold text-md"
                                    : "text-gray-800 hover:bg-gray-100 hover:text-gray-600 text-md"
                                }`}
                                >
                                    <div className="mr-2">
                                        <div 
                                            className={`
                                                p-1 
                                                mr-1
                                                ${pathname == `${item.route}`
                                                        ? "bg-rose-500 "
                                                        : "text-gray-800 hover:bg-gray-200 hover:text-gray-600"
                                                    }
                                                rounded-full 
                                                text-white
                                            `}
                                            >
                                            <BiSearch size={18} />
                                        </div>
                                    </div>
                                    
                                    <span>{item.title}</span>
                                    
                            </div>

                        ))}
                    </div>
                ))}
            </div>
            <div className="flex mx-auto  w-full justify-center mb-2 rounded-lg">
                <img
                    onClick={() => router.push('/portal/mispedidos')}
                    className="block w-32 md:w-44  cursor-pointer" 
                    src="/images/plat-hawk3.png" 
                />
            </div>
        </div>
    </div>
  );

  
});

const data = [
    {
      name: 'Discover',
      items: [
        {
          title: 'Mis envíos',
          icon: AiFillFire,
          route: '/portal/mispedidos'
        },
        {
          title: 'Cotizar',
          icon: IoMdArrowRoundUp,
          route: '/portal/cotizar'
        },
        {
          title: 'Cobertura',
          icon: AiFillMessage,
          route: '/portal/cobertura'
        },
        {
          title: 'Rastreo',
          icon: BsSearch,
          route: '/portal/otro'
        },
      ]
    },
    {
      name: 'Manage',
      items: [
        {
          title: 'Bookmarks',
          icon: BsBookmarkFill,
          route: '/portal/mispedidos2'
        },
        {
          title: 'Reading history',
          icon: BsEyeFill,
          route: '/portal/mispedidos2'
        },
        {
          title: 'Focus Mode',
          icon: MdNightlightRound,
          route: '/portal/mispedidos2'
        },
        {
          title: 'Customize',
          icon: FaCog,
          route: '/portal/mispedidos2'
        },
      ]
    },
  ]

SideBar.displayName = "SideBar";

export default SideBar;