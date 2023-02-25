import { Dispatch, SetStateAction, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface Props {
  position: LatLngExpression | undefined;
  setPosition: Dispatch<SetStateAction<LatLngExpression | undefined>>;
}

export default function Map({ position, setPosition }: Props) {
  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
        }
      },
    }),
    []
  );

  console.log(position);

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={position ? position : [12.3774729, 20.446257]}
        draggable={true}
        eventHandlers={eventHandlers}
        ref={markerRef}
      >
        <Popup>.</Popup>
      </Marker>
    </MapContainer>
  );
}
