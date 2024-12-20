"use client";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import { useThemeStore } from "~/app_state/theme_mode";
import AbsoluteLoading from "../markdown/absolute_loading";
import { env } from "../../env.mjs";

export default function MapOn() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <AbsoluteLoading />;
  return <Map />;
}

function Map() {
  const { isLight } = useThemeStore();

  const center = useMemo(
    () => ({
      lat: env.NEXT_PUBLIC_GOOGLE_MAP_LAT,
      lng: env.NEXT_PUBLIC_GOOGLE_MAP_LNG,
    }),
    [],
  );

  const darkMapOptions = useMemo(
    () => ({
      styles: [
        {
          featureType: "all",
          elementType: "all",
          stylers: [
            {
              invert_lightness: true,
            },
            {
              saturation: 10,
            },
            {
              lightness: 30,
            },
            {
              gamma: 0.5,
            },
            {
              hue: "#5e6b7b",
            },
          ],
        },
      ],
    }),
    [],
  );

  const lightMapOptions = useMemo(
    () => ({
      styles: [],
    }),
    [],
  );

  const mapOptions = isLight ? lightMapOptions : darkMapOptions;

  return (
    <>
      <div className="p-card mx-auto mb-2 flex h-fit w-fit items-center gap-2">
        <MapPinIcon className="m-1 h-5 w-5" />
        <span>{env.NEXT_PUBLIC_GOOGLE_MAP_LOCATION_NAME}</span>
      </div>
      <div className="mx-4 overflow-hidden rounded-xl">
        <GoogleMap
          zoom={3}
          center={center}
          mapContainerClassName="h-96 w-full"
          options={mapOptions}
        >
          <MarkerF position={center} />
        </GoogleMap>
      </div>
    </>
  );
}
