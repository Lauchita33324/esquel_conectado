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
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Fecha actual dinámica y timestamp de referencia estables para pureza de renderizado
  const [today] = useState(() => new Date());
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0..11
  const todayDay = today.getDate();
  const currentTimestamp = today.getTime();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const currentMonthName = monthNames[currentMonth];

  // Cálculo de días y alineación correcta de días de la semana
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Domingo, 1 = Lunes...
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Días previos de relleno para que el día 1 quede bajo su columna de la semana
  const prevMonthPaddingDays = Array.from({ length: firstDayOfWeek }, (_, idx) => {
    return daysInPrevMonth - firstDayOfWeek + 1 + idx;
  });

  const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, idx) => idx + 1);

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

  // Helper para eventos de un día específico del mes actual
  const getEventsForDay = (day: number) => {
    return events.filter(ev => {
      if (!ev.date) return false;
      const d = new Date(ev.date);
      return (
        d.getFullYear() === currentYear &&
        d.getMonth() === currentMonth &&
        d.getDate() === day
      );
    });
  };

  // Helper para verificar si un evento ya finalizó
  const isPastEvent = (ev: Event) => {
    const end = ev.endDate ? new Date(ev.endDate).getTime() : (new Date(ev.date).getTime() + 86400000);
    return end < currentTimestamp;
  };

  // Helper para verificar si un evento es del día de hoy
  const isEventToday = (ev: Event) => {
    if (!ev.date) return false;
    const d = new Date(ev.date);
    return (
      d.getFullYear() === currentYear &&
      d.getMonth() === currentMonth &&
      d.getDate() === todayDay
    );
  };

  // Lista de eventos mostrados según selección de día o lista general de próximos
  const displayedEvents = selectedDay !== null
    ? getEventsForDay(selectedDay)
    : events
        .filter(ev => !isPastEvent(ev))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 h-auto lg:h-[620px]">

        {/* Columna Izquierda: Calendario */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col p-4 sm:p-6 h-full">
          {/* Encabezado con Mes y Año actuales dinámicos */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Calendario de Eventos
              </h2>
              <p className="text-xs font-semibold text-blue-700 capitalize mt-0.5">
                {currentMonthName} {currentYear}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {selectedDay !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-blue-700 underline cursor-pointer"
                >
                  Ver todos
                </button>
              )}
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 shrink-0">
                Hoy: {todayDay} de {currentMonthName.slice(0, 3)}
              </span>
            </div>
          </div>

          {/* Grilla del calendario con días de la semana y relleno dinámico */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center mb-6">
            {["D", "L", "M", "M", "J", "V", "S"].map((day, idx) => (
              <div key={`${day}-${idx}`} className="text-slate-600 font-semibold text-xs py-1 select-none">
                {day}
              </div>
            ))}

            {/* Días previos del mes anterior */}
            {prevMonthPaddingDays.map((pDay, idx) => (
              <div
                key={`prev-${idx}`}
                className="w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-slate-300 text-xs sm:text-sm select-none"
              >
                {pDay}
              </div>
            ))}

            {/* Días del mes corriente */}
            {currentMonthDays.map((d) => {
              const isToday = d === todayDay;
              const isSelected = selectedDay === d;
              const dayEvents = getEventsForDay(d);
              const hasEvents = dayEvents.length > 0;

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDay(selectedDay === d ? null : d)}
                  title={
                    hasEvents
                      ? `${dayEvents.length} evento(s) el ${d} de ${currentMonthName}`
                      : `${d} de ${currentMonthName}`
                  }
                  className={`relative rounded-lg sm:rounded-xl w-8 h-8 sm:w-9 sm:h-9 mx-auto flex flex-col items-center justify-center text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-700 text-white font-bold shadow-md scale-105"
                      : isToday
                        ? "border-2 border-blue-600 text-blue-700 font-bold bg-blue-50/70"
                        : hasEvents
                          ? "text-slate-900 font-bold hover:bg-blue-50"
                          : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{d}</span>
                  {hasEvents && (
                    <span
                      className={`absolute bottom-0.5 sm:bottom-1 w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-white" : isToday ? "bg-blue-700" : "bg-sky-500"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Listado dinámico de eventos en su fecha correspondiente */}
          <div className="flex-grow flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                {selectedDay !== null
                  ? selectedDay === todayDay
                    ? `Eventos de Hoy (${todayDay} de ${currentMonthName})`
                    : `Eventos del ${selectedDay} de ${currentMonthName}`
                  : "Próximos Eventos en la Comarca"}
              </h3>
              {selectedDay !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="text-xs text-blue-700 hover:underline font-semibold"
                >
                  Mostrar próximos
                </button>
              )}
            </div>

            {loadingEvents ? (
              <p className="text-sm text-slate-500">Cargando eventos...</p>
            ) : displayedEvents.length === 0 ? (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center my-auto">
                <p className="text-sm text-slate-600 font-medium">
                  No hay eventos programados para el {selectedDay} de {currentMonthName}.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="mt-2 text-xs font-bold text-blue-700 hover:text-blue-800 underline cursor-pointer"
                >
                  Ver próximos eventos disponibles
                </button>
              </div>
            ) : (
              <ul className="space-y-2.5 overflow-y-auto max-h-[220px] pr-1">
                {displayedEvents.map((event) => {
                  const past = isPastEvent(event);
                  const isToday = isEventToday(event);

                  return (
                    <li
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-start cursor-pointer hover:bg-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 mt-1.5 rounded-full mr-3 flex-shrink-0 ${
                          past
                            ? "bg-slate-400"
                            : isToday
                              ? "bg-emerald-500 animate-pulse"
                              : "bg-blue-600"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="font-semibold text-sm text-blue-700 truncate">
                            {event.title}
                          </p>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              past
                                ? "bg-slate-100 text-slate-600"
                                : isToday
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-blue-50 text-blue-700 border border-blue-100"
                            }`}
                          >
                            {past
                              ? "Finalizado"
                              : isToday
                                ? "Hoy"
                                : event.date
                                  ? new Date(event.date).toLocaleDateString("es-AR", {
                                      day: "numeric",
                                      month: "short",
                                    })
                                  : "Próximo"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">
                          {event.time} &bull; {event.locationName}
                          {event.city ? ` (${event.city})` : ""}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Columna Derecha: Mapa */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-6 h-[400px] sm:h-[480px] md:h-full flex flex-col relative">
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
              className="flex-grow min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all text-xs sm:text-sm font-medium"
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

            <button className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-[400] bg-white/95 backdrop-blur-sm border border-slate-200 shadow-md rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1.5 sm:gap-2 hover:bg-slate-50 transition-colors">
              <FcRating className="text-base sm:text-lg" />
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs">Puntos de Interés</span>
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
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 space-y-2">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Detalles del Evento
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isPastEvent(selectedEvent)
                      ? "bg-slate-200 text-slate-700"
                      : isEventToday(selectedEvent)
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {isPastEvent(selectedEvent)
                    ? "Finalizado"
                    : isEventToday(selectedEvent)
                      ? "Hoy en Curso"
                      : "Próximo"}
                </span>
              </div>
              <p className="text-sm">
                <strong>Fecha:</strong>{" "}
                <span className="text-slate-800 capitalize">
                  {selectedEvent.date
                    ? new Date(selectedEvent.date).toLocaleDateString("es-AR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Fecha a confirmar"}
                </span>
              </p>
              <p className="text-sm"><strong>Horario:</strong> <span className="text-blue-700 font-semibold">{selectedEvent.time}</span></p>
              <p className="text-sm"><strong>Lugar:</strong> {selectedEvent.locationName}{selectedEvent.city ? ` (${selectedEvent.city})` : ""}</p>
              <p className="text-sm leading-relaxed pt-1 border-t border-slate-200/60"><strong>Detalle:</strong> {selectedEvent.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={() => handleVerEnMapa(selectedEvent.lat, selectedEvent.lng)}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 sm:py-3 rounded-xl shadow-xs transition-colors text-xs sm:text-sm"
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
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 sm:py-3 rounded-xl shadow-xs transition-colors text-xs sm:text-sm"
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
