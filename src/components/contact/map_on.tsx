import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import AbsoluteLoading from "../markdown/absolute_loading";

export default function MapOn() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  if (!isLoaded) return <AbsoluteLoading />;
  return <Map />;
}

function Map() {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  const center = useMemo(() => ({ lat: 23.790626, lng: 90.408972 }), []);

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
    []
  );

  const lightMapOptions = useMemo(
    () => ({
      styles: [],
    }),
    []
  );

  const mapOptions = isLight ? lightMapOptions : darkMapOptions;

  return (
    <>
      <div className="p-card mx-auto mb-2 flex h-fit w-fit items-center gap-2">
        <MapPinIcon className="h-5 w-5" /> Dhaka, Bangladesh
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
