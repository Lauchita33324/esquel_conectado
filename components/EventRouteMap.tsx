"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { AlertTriangle, MapPin, Calendar, Car, Bike, Footprints } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const eventMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapCentering({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center && typeof center[0] === "number" && typeof center[1] === "number") {
      map.setView(center, 14, { animate: true });
    }
  }, [center, map]);
  return null;
}

interface EventRouteMapProps {
  eventLat: number;
  eventLng: number;
  eventTitle: string;
  locationName: string;
}

export default function EventRouteMap({
  eventLat,
  eventLng,
  eventTitle,
  locationName,
}: EventRouteMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [travelMode, setTravelMode] = useState<"driving" | "bicycling" | "walking">("driving");
  const [geoError, setGeoError] = useState<string | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  // Esquel centro por defecto para cálculo si no hay GPS
  const defaultOrigin: [number, number] = [-42.914, -71.318];

  // Cálculo de distancia en línea recta / haversine
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2));
  };

  const getUserGPS = () => {
    if (!navigator.geolocation) {
      setGeoError("La geolocalización no está soportada por tu navegador.");
      return;
    }
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;
        setUserLocation([uLat, uLng]);
        const dist = calculateDistance(uLat, uLng, eventLat, eventLng);
        setDistanceKm(dist);
      },
      () => {
        setGeoError("No se pudo obtener la ubicación en tiempo real. Usando centro urbano de Esquel.");
        setUserLocation(defaultOrigin);
        const dist = calculateDistance(defaultOrigin[0], defaultOrigin[1], eventLat, eventLng);
        setDistanceKm(dist);
      }
    );
  };

  useEffect(() => {
    // Calculamos por defecto desde el centro de Esquel
    const initialDist = calculateDistance(defaultOrigin[0], defaultOrigin[1], eventLat, eventLng);
    setDistanceKm(initialDist);
  }, [eventLat, eventLng]);

  const originCoords = userLocation || defaultOrigin;

  // Tiempos estimados según modo
  const getTravelTimeMinutes = (dist: number, mode: "driving" | "bicycling" | "walking") => {
    if (mode === "driving") return Math.max(1, Math.round((dist / 35) * 60));
    if (mode === "bicycling") return Math.max(1, Math.round((dist / 14) * 60));
    return Math.max(1, Math.round((dist / 4.2) * 60));
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originCoords[0]},${originCoords[1]}&destination=${eventLat},${eventLng}&travelmode=${travelMode}`;

  return (
    <div className="space-y-4">
      {/* Selector de Modo de Transporte y Ubicación GPS */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
              Modo de Viaje:
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTravelMode("driving")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                travelMode === "driving"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Car className="w-3.5 h-3.5 stroke-[2]" /> Auto
            </button>
            <button
              type="button"
              onClick={() => setTravelMode("bicycling")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                travelMode === "bicycling"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Bike className="w-3.5 h-3.5 stroke-[2]" /> Bici
            </button>
            <button
              type="button"
              onClick={() => setTravelMode("walking")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                travelMode === "walking"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Footprints className="w-3.5 h-3.5 stroke-[2]" /> A pie
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-slate-200">
          <button
            type="button"
            onClick={getUserGPS}
            className="w-full sm:w-auto text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {userLocation ? "Ubicación GPS Actualizada" : "Usar mi ubicación GPS actual"}
          </button>

          {distanceKm !== null && (
            <div className="text-xs font-bold text-slate-800 flex flex-wrap items-center gap-1.5 text-center sm:text-left">
              <span>Distancia: <strong className="text-blue-700">{distanceKm} km</strong></span>
              <span className="text-slate-400">•</span>
              <span>Tiempo estimado: <strong className="text-emerald-700">{getTravelTimeMinutes(distanceKm, travelMode)} min</strong></span>
            </div>
          )}
        </div>

        {geoError && (
          <p className="text-[11px] text-amber-700 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 stroke-[2] flex-shrink-0" /> {geoError}
          </p>
        )}
      </div>

      {/* Mapa Interactivo Leaflet */}
      <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-200 relative z-0">
        <MapContainer
          center={[eventLat, eventLng]}
          zoom={14}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <MapCentering center={[eventLat, eventLng]} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marcador del Evento */}
          <Marker position={[eventLat, eventLng]} icon={eventMarkerIcon}>
            <Popup>
              <div className="text-center font-sans">
                <strong className="text-red-600 block text-xs flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" /> {eventTitle}
                </strong>
                <span className="text-slate-600 text-xs">{locationName}</span>
              </div>
            </Popup>
          </Marker>

          {/* Marcador de Origen si está activado GPS */}
          {userLocation && (
            <Marker position={userLocation} icon={userMarkerIcon}>
              <Popup>
                <div className="text-center font-sans">
                  <strong className="text-blue-600 block text-xs flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> Tu Ubicación GPS
                  </strong>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Botón de Navegación Externa en GPS / Google Maps */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wide cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Iniciar Navegación GPS (&ldquo;¿Cómo Llegar?&rdquo;)
      </a>
    </div>
  );
}
