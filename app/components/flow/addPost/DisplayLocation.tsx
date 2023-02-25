import { LatLngExpression } from "leaflet";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

export default function DisplayLocation() {
  const Map = dynamic(() => import("./Map"), { ssr: false });

  const [position, setPosition] = useState<LatLngExpression | undefined>(
    undefined
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return location ? (
    <div className="location">
      <Map position={position} setPosition={setPosition} />
    </div>
  ) : null;
}
