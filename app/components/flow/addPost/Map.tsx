import { useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface Props {
  position: LatLngExpression | undefined;
  dispatch: React.Dispatch<any>;
}

export default function Map({ position, dispatch }: Props) {
  const markerRef = useRef<any>(null);

  console.log(position);

  var icon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          dispatch({
            type: "SAVE_POSITION",
            payload: [newPosition.lat, newPosition.lng],
          });
        }
      },
    }),
    []
  );

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      preferCanvas
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
        icon={icon}
      >
        <Popup>.</Popup>
      </Marker>
    </MapContainer>
  );
}
