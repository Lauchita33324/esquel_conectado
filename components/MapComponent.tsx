"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { dbService, Location } from "../services/database";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const eventIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const searchIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Componente para actualizar el centro del mapa cuando cambia la prop
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center && typeof center[0] === 'number' && typeof center[1] === 'number') {
      map.setView(center, 15, { animate: true });
    }
  }, [center, map]);
  return null;
}

interface MapComponentProps {
  center: [number, number];
  searchQuery?: string;
  searchMarker?: { lat: number; lng: number; title: string } | null;
}

export default function MapComponent({ center, searchQuery = "", searchMarker }: MapComponentProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [events, setEvents] = useState<any[]>([]); // Usamos any para simplificar el tipo aquí

  useEffect(() => {
    async function fetchData() {
      const locData = await dbService.getLocations();
      const eventData = await dbService.getEvents();
      setLocations(locData);
      setEvents(eventData);
    }
    fetchData();
  }, []);

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (loc.address && loc.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredEvents = events.filter(ev =>
    ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ev.locationName && ev.locationName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl z-0"
      >
        <MapUpdater center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcador de Búsqueda Específica por Dirección o Calle */}
        {searchMarker && (
          <Marker position={[searchMarker.lat, searchMarker.lng]} icon={searchIcon}>
            <Popup>
              <div className="text-center">
                <strong className="text-amber-700 block">📍 Resultado de Búsqueda</strong>
                <span className="text-slate-700 text-xs font-semibold">{searchMarker.title}</span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcadores de Lugares */}
        {filteredLocations.map((loc) => (
          <Marker key={`loc-${loc.id}`} position={[loc.lat, loc.lng]} icon={customIcon}>
            <Popup>
              <div className="text-center">
                <strong className="text-blue-600 block">{loc.name}</strong>
                <span className="text-slate-600 text-sm">{loc.description}</span>
                <span className="text-xs text-slate-400 block mt-1 capitalize">{loc.type}</span>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Marcadores de Eventos */}
        {filteredEvents.map((ev) => (
          <Marker key={`event-${ev.id}`} position={[ev.lat, ev.lng]} icon={eventIcon}>
            <Popup>
              <div className="text-center">
                <strong className="text-red-600 block">📅 {ev.title}</strong>
                <span className="text-slate-600 text-sm">{ev.time}</span>
                <span className="text-xs text-slate-400 block mt-1">{ev.locationName}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
