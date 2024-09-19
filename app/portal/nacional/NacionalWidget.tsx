"use client";
import React, { useEffect, useState, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";

import { Input } from "@/components/ui/input";

const libraries: any[] = ["places"];

interface NacionalWidgetProps {
  data?: string;
}

const NacionalWidget: React.FC<NacionalWidgetProps> = ({ data }) => {
  const [input, setInput] = useState({});
  //const inputRef = useRef(document.createElement("input"));
  const inputRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCaguwbXRMYip8y2w04TISgKN90tdu24-M",
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || loadError) return;

    const options = {
      componentRestrictions: { country: "mx" },
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
      city: componentMap.administrative_area_level_2,
      state: componentMap.administrative_area_level_1,
      latitude: latitude,
      longitude: longitude,
    }));

    console.log({
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: componentMap.postal_code,
      city: componentMap.administrative_area_level_2,
      state: componentMap.administrative_area_level_1,
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="p-4 w-[400px]">
        <div className="flex flex-col w-full">
          <label className="text-md">Dirección</label>
          <Input
            ref={inputRef}
            className="w-[340px]"
            type="text"
            name="direccion"
            onChange={handleChange}
            placeholder="Escribe la dirección"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default NacionalWidget;
