"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLoadScript } from "@react-google-maps/api";

import { Input } from "@/components/ui/input";
import useLoader from "@/app/hooks/useLoader";
import { MdClear } from "react-icons/md";
import { useNacionalCrearStore } from "../store/nacional/nacionalCrear/nacional-crear";

const libraries: any[] = ["places"];

interface AutocompleteWidgetProps {
  data?: string;
}

const AutocompleteWidget: React.FC<AutocompleteWidgetProps> = ({ data }) => {
  const {
    direccionesLoading,
    cpValue,
    municipioValue,
    updateCpValue,
    updateMunicipioValue,
  } = useNacionalCrearStore();
  const [input, setInput] = useState({});
  const [cpInput, setCpInput] = useState("");
  const [municipioInput, setMunicipioInput] = useState("");

  const loader = useLoader();
  //const inputRef = useRef(document.createElement("input"));
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCaguwbXRMYip8y2w04TISgKN90tdu24-M",
    libraries,
  });

  useEffect(() => {
    if (loader.isOpen) {
      loader.onClose();
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || loadError) return;

    const options = {
      componentRestrictions: { country: "mx" },
      //types: ["locality", "political"],
      fields: ["address_components", "geometry"],
    };

    if (inputRef.current !== null) {
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      autocomplete.addListener("place_changed", () =>
        handlePlaceChanged(autocomplete)
      );
    }

    // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
  }, [isLoaded, loadError]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handlePlaceChanged = async (address: any) => {
    if (!isLoaded) return;
    const place = address.getPlace();

    if (!place || !place.geometry) {
      setInput({});
      return;
    }
    console.log(place);
    formData(place);
  };

  const formData = (data: any) => {
    const addressComponents = data?.address_components;

    const componentMap: any = {
      subPremise: "",
      premise: "",
      street_number: "",
      route: "",
      country: "",
      postal_code: "",
      administrative_area_level_2: "",
      administrative_area_level_1: "",
      locality: "",
    };

    for (const component of addressComponents) {
      const componentType = component.types[0];
      if (componentMap.hasOwnProperty(componentType)) {
        componentMap[componentType] = component.long_name;
      }
    }

    const formattedAddress =
      `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
    const latitude = data?.geometry?.location?.lat();
    const longitude = data?.geometry?.location?.lng();

    setInput((values) => ({
      ...values,
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: componentMap.postal_code,
      city: componentMap.locality,
      state: componentMap.administrative_area_level_1,
      latitude: latitude,
      longitude: longitude,
    }));

    updateCpValue(componentMap.postal_code);
    updateMunicipioValue(componentMap.locality);

    console.log({
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: componentMap.postal_code,
      city: componentMap.locality,
      state: componentMap.administrative_area_level_1,
      latitude: latitude,
      longitude: longitude,
    });
  };

  const clearValue = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 bg-neutral-100 rounded-lg">
      <div className="w-[480px] relative">
        <Input
          ref={inputRef}
          className=" h-12 pr-8"
          type="text"
          name="direccion"
          onChange={handleChange}
          placeholder="Escribe la ciudad destino"
          required
          disabled={direccionesLoading}
        />
        <div className="absolute top-3 right-1" onClick={() => clearValue()}>
          <MdClear size={22} className="text-neutral-500" />
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Input
          value={cpValue}
          className=" h-8"
          type="text"
          name="direccion"
          onChange={(e) => updateCpValue(e.target.value)}
          placeholder="cp"
          required
          disabled={direccionesLoading}
        />
        <Input
          value={municipioValue}
          className=" h-8"
          type="text"
          name="direccion"
          onChange={(e) => updateMunicipioValue(e.target.value)}
          placeholder="Municipio"
          required
          disabled={direccionesLoading}
        />
      </div>
    </div>
  );
};

export default AutocompleteWidget;
