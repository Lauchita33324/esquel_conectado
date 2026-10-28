"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FcRating } from "react-icons/fc";
import { dbService, Event } from "../services/database";
import Modal from "./Modal";

// MapComponent se importa sin SSR. Le pasamos center y searchQuery como props.
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center rounded-xl text-slate-400">Cargando mapa...</div>
});

export default function MidSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Estados para el mapa
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([-42.912, -71.319]);
  const [searchMarker, setSearchMarker] = useState<{ lat: number; lng: number; title: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      const data = await dbService.getEvents();
      setEvents(data);
      setLoadingEvents(false);
    }
    fetchEvents();
  }, []);

  const handleVerEnMapa = (lat: number, lng: number) => {
    setMapCenter([lat, lng]);
    setSelectedEvent(null);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const q = searchQuery.trim().toLowerCase();

    // 1. Buscar coincidencia en locales de la base de datos
    const locations = await dbService.getLocations();
    const locMatch = locations.find(loc =>
      loc.name.toLowerCase().includes(q) ||
      loc.description.toLowerCase().includes(q) ||
      (loc.address && loc.address.toLowerCase().includes(q))
    );

    if (locMatch) {
      setMapCenter([locMatch.lat, locMatch.lng]);
      setSearchMarker({ lat: locMatch.lat, lng: locMatch.lng, title: `${locMatch.name} (${locMatch.address || locMatch.city})` });
      setIsSearching(false);
      return;
    }

    // 2. Buscar coincidencia en eventos de la base de datos
    const eventsData = await dbService.getEvents();
    const evMatch = eventsData.find(ev =>
      ev.title.toLowerCase().includes(q) ||
      (ev.locationName && ev.locationName.toLowerCase().includes(q))
    );

    if (evMatch) {
      setMapCenter([evMatch.lat, evMatch.lng]);
      setSearchMarker({ lat: evMatch.lat, lng: evMatch.lng, title: evMatch.title });
      setIsSearching(false);
      return;
    }

    // 3. Geocodificación en tiempo real para calles o direcciones (ej: "Sáenz Peña 12", "Fontana 400")
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ", Esquel, Chubut, Argentina")}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setSearchMarker({ lat, lng: lon, title: searchQuery });
        setMapCenter([lat, lon]);
      } else {
        const res2 = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ", Chubut, Argentina")}&limit=1`);
        const data2 = await res2.json();
        if (data2 && data2.length > 0) {
          const lat = parseFloat(data2[0].lat);
          const lon = parseFloat(data2[0].lon);
          setSearchMarker({ lat, lng: lon, title: searchQuery });
          setMapCenter([lat, lon]);
        } else {
          alert(`No encontramos la dirección "${searchQuery}". Probá ingresando el nombre de la calle y altura.`);
        }
      }
    } catch (err) {
      console.error("Error al buscar en el mapa:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid md:grid-cols-2 gap-8 h-auto lg:h-[620px]">

        {/* Columna Izquierda: Calendario */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col p-4 sm:p-6 h-full">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Calendario de Eventos
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 shrink-0">
              Hoy en la Comarca
            </span>
          </div>

          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center mb-6">
            {["D", "L", "M", "M", "J", "V", "S"].map((day, idx) => (
              <div key={`${day}-${idx}`} className="text-slate-600 font-semibold text-xs py-1">{day}</div>
            ))}
            <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-slate-400 text-xs sm:text-sm">28</div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-slate-400 text-xs sm:text-sm">29</div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-slate-400 text-xs sm:text-sm">30</div>
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`rounded-lg sm:rounded-xl w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-xs sm:text-sm font-medium transition-colors
                  ${i + 1 === 15 ? "bg-blue-700 text-white font-bold shadow-md cursor-pointer" : "text-slate-700 hover:bg-slate-100 cursor-pointer"}`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="flex-grow">
            <h3 className="font-bold text-slate-700 mb-4">Eventos de Hoy</h3>
            {loadingEvents ? (
              <p className="text-sm text-slate-500">Cargando eventos...</p>
            ) : (
              <ul className="space-y-3">
                {events.map((event) => (
                  <li
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-start cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-blue-600 truncate">{event.title}</p>
                      <p className="text-sm text-slate-500 truncate">{event.time} - {event.locationName}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Columna Derecha: Mapa */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-6 h-[500px] md:h-full flex flex-col relative">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Mapa de la Ciudad</h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-100 shrink-0">
              Pines en vivo
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="mb-4 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar calle o lugar (ej: Sáenz Peña 12, Ameghino)..."
              className="flex-grow min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all text-sm font-medium"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="shrink-0 bg-blue-700 hover:bg-blue-800 text-white font-extrabold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wide cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  BUSCAR
                </>
              )}
            </button>
          </form>

          <div className="flex-grow rounded-xl overflow-hidden border border-slate-200 relative z-0">
            <MapComponent center={mapCenter} searchQuery={searchQuery} searchMarker={searchMarker} />

            <button className="absolute bottom-4 right-4 z-[400] bg-white/95 backdrop-blur-sm border border-slate-200 shadow-md rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <FcRating className="text-lg" />
              <span className="font-bold text-slate-800 text-xs">Puntos de Interés</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Evento */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || "Evento"}
      >
        {selectedEvent && (
          <div className="space-y-4 text-slate-800">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
              <p className="mb-2 text-sm"><strong>Horario:</strong> <span className="text-blue-700 font-semibold">{selectedEvent.time}</span></p>
              <p className="mb-2 text-sm"><strong>Lugar:</strong> {selectedEvent.locationName}</p>
              <p className="text-sm leading-relaxed"><strong>Detalle:</strong> {selectedEvent.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleVerEnMapa(selectedEvent.lat, selectedEvent.lng)}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-sm transition-colors text-sm"
              >
                Ver en Mapa
              </button>
              <button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      const { latitude, longitude } = position.coords;
                      window.open(`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${selectedEvent.lat},${selectedEvent.lng}`, '_blank');
                    }, () => {
                      alert("No se pudo obtener tu ubicación. Asegúrate de dar permisos.");
                    });
                  } else {
                    alert("Tu navegador no soporta geolocalización.");
                  }
                }}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl shadow-sm transition-colors text-sm"
              >
                ¿Cómo llegar?
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
