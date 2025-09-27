"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Transition } from "@headlessui/react";
import useLoader from "@/app/hooks/useLoader";
import GlobalLoader from "../GlobalLoader";
import useSidebar from "@/app/hooks/useSidebar";

const useMediaQuery = (width: any) => {
  const loader = useLoader();

  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: any) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  useEffect(() => {
    if (loader.isOpen) {
      loader.onClose();
    }
  }, []);

  return targetReached;
};

interface PortalLayoutProps {
  children: React.ReactNode;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  const sidebar = useSidebar();
  const isBreakpoint = useMediaQuery(768);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    setLoaded(false);
    if (isBreakpoint) {
      sidebar.onClose();
      setIsMobile(true);
      setLoaded(true);
    } else {
      sidebar.onOpen();
      setIsMobile(false);
      setLoaded(true);
    }
  }, [isBreakpoint]);

  return (
    <>
      {!loaded ? (
        <div className="mx-auto pl-96 pt-36 ">Loading...</div>
      ) : (
        <div className="pt-0">
          <GlobalLoader />
          <Transition
            as={Fragment}
            show={sidebar.isOpen}
            enter="transform transition duration-\[400ms]"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform duration-\[400ms] transition ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Sidebar showNav={sidebar.isOpen} />
          </Transition>
          <main
            className={`transition-all duration-\[400ms] ${
              sidebar.isOpen && !isMobile ? "pl-56" : ""
            }`}
          >
            <div className="p-2 md:p-4 pt-1 md:pt-2  bg-gray-50 min-h-[98vh] overflow-y-auto">
              <div className=" bg-white rounded-lg pb-4 shadow-md">
                {children}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default PortalLayout;
