"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import Captcha from "../../components/Captcha";
import { dbService, Event } from "../../services/database";

// Importación dinámica del Mapa de Rutas para evitar problemas de SSR con Leaflet
const EventRouteMap = dynamic(() => import("../../components/EventRouteMap"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-500 font-medium text-sm">
      Cargando mapa interactivo...
    </div>
  ),
});

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de Filtro
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Todas");
  const [city, setCity] = useState("Todas");

  // Modales
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Formulario Proponer Evento
  const [newEventData, setNewEventData] = useState({
    title: "",
    time: "",
    locationName: "",
    date: "",
    endDate: "",
    description: "",
    city: "Esquel",
    category: "Ferias y Paseos",
    organizerEmail: "",
    lat: -42.914,
    lng: -71.318,
  });

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "Todas",
    "Ferias y Paseos",
    "Música y Conciertos",
    "Cultura y Turismo",
    "Deportes",
    "Teatro y Cine",
    "Gastronomía",
    "Otros",
  ];

  const cities = [
    "Todas",
    "Esquel",
    "Trevelin",
    "Lago Puelo",
    "El Bolsón",
    "El Hoyo",
    "Epuyén",
    "Cholila",
    "El Maitén",
  ];

  const fetchEvents = async () => {
    setLoading(true);
    const data = await dbService.getEvents({
      keyword,
      category,
      city,
    });
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [city, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

  const handleClearFilters = () => {
    setKeyword("");
    setCategory("Todas");
    setCity("Todas");
    dbService.getEvents().then((data) => setEvents(data));
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      setCaptchaError("Ingresá el código de seguridad (CAPTCHA) correcto para publicar el evento.");
      return;
    }

    setCaptchaError(null);
    setSubmitting(true);

    try {
      const eventDate = newEventData.date || new Date().toISOString();
      // Si no especificó fecha de fin, vence 24 horas después
      const endDate = newEventData.endDate || new Date(new Date(eventDate).getTime() + 86400000).toISOString();

      await dbService.addEvent({
        title: newEventData.title,
        time: newEventData.time || "Horario a confirmar",
        locationName: newEventData.locationName,
        date: eventDate,
        endDate: endDate,
        description: newEventData.description,
        city: newEventData.city,
        category: newEventData.category,
        organizerEmail: newEventData.organizerEmail,
        lat: newEventData.lat,
        lng: newEventData.lng,
      });

      alert("¡Evento registrado con éxito! Queda publicado en la agenda comarcal.");
      setShowAddModal(false);
      setNewEventData({
        title: "",
        time: "",
        locationName: "",
        date: "",
        endDate: "",
        description: "",
        city: "Esquel",
        category: "Ferias y Paseos",
        organizerEmail: "",
        lat: -42.914,
        lng: -71.318,
      });
      setIsCaptchaValid(false);
      fetchEvents();
    } catch {
      alert("Ocurrió un error al proponer el evento. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDateDisplay = (isoDate: string) => {
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString("es-AR", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }).toUpperCase();
    } catch {
      return "FECHA A CONFIRMAR";
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Cabecera Principal de la Sección Eventos */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-2">
              Agenda Comarcal
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Eventos y Actividades Culturales
            </h1>
            <p className="text-slate-600 text-sm md:text-base mt-1.5 font-medium max-w-2xl">
              Descubrí ferias, espectáculos, encuentros deportivos y turismo cultural en Esquel y la Comarca Andina.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm uppercase tracking-wide cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Proponer Evento
          </button>
        </div>

        {/* Caja Superior de Filtros */}
        <div className="bg-[#faf7f2] border border-[#e8dfd2] rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex items-center justify-between mb-4 border-b border-[#e8dfd2]/80 pb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="font-bold text-slate-800 text-base">Filtros de Agenda</h2>
            </div>
            {(keyword || category !== "Todas" || city !== "Todas") && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 underline cursor-pointer"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                Buscar Evento
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Nombre, artista o locación..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-700 font-medium cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                Localidad
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-700 font-medium cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                BUSCAR
              </button>
            </div>
          </form>
        </div>

        {/* Agenda Cultural Asimétrica con Evento Destacado y Bloques de Almanaque */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-slate-500 font-medium text-sm">Cargando agenda de eventos...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">No encontramos eventos programados con estos filtros.</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Prueba seleccionando otra categoría o limpiando la búsqueda.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-blue-800 transition-colors"
            >
              Ver todos los eventos
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 🌟 1. EVENTO DESTACADO (FEATURED CARD) */}
            {events.length > 0 && (
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-sky-950 text-white p-6 sm:p-10 shadow-2xl border border-blue-800/50">
                <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {/* Bloque Almanaque / Calendario Visual */}
                    <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-blue-600 to-sky-500 text-white flex flex-col items-center justify-center shadow-lg border border-sky-300/30 flex-shrink-0 text-center">
                      <span className="text-[10px] uppercase font-black tracking-widest bg-black/20 w-full py-1">
                        {new Date(events[0].date).toLocaleDateString("es-AR", { month: "short" }).toUpperCase()}
                      </span>
                      <span className="text-3xl font-black leading-none mt-1">
                        {new Date(events[0].date).getDate() || 15}
                      </span>
                      <span className="text-[10px] font-bold opacity-90 mt-0.5">
                        {events[0].time}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-amber-400 text-slate-950 rounded-full shadow-sm">
                          ⭐ Evento Destacado
                        </span>
                        {events[0].category && (
                          <span className="text-xs font-bold px-3 py-1 bg-white/10 text-sky-200 backdrop-blur-md rounded-full border border-white/20">
                            {events[0].category}
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2 leading-tight">
                        {events[0].title}
                      </h2>

                      <p className="text-sm font-bold text-sky-300 flex items-center gap-1.5 mb-3">
                        📍 {events[0].locationName} {events[0].city ? `(${events[0].city})` : ""}
                      </p>

                      <p className="text-sm text-slate-300 line-clamp-2 max-w-3xl leading-relaxed">
                        {events[0].description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(events[0])}
                    className="self-start lg:self-auto bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black px-7 py-3.5 rounded-2xl shadow-xl transition-all whitespace-nowrap text-sm uppercase tracking-wide cursor-pointer active:scale-95 flex items-center gap-2"
                  >
                    🗺️ Ver Ruta GPS
                  </button>
                </div>
              </div>
            )}

            {/* 🗓️ 2. RESTO DE LA AGENDA (TIMELINE / GRID ASIMÉTRICA) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {events.slice(1).map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {/* Bloque Almanaque compacto */}
                    <div className="w-14 h-16 rounded-xl bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-sky-800 dark:text-sky-300 flex flex-col items-center justify-center flex-shrink-0 font-bold">
                      <span className="text-[9px] uppercase tracking-wider text-sky-600 dark:text-sky-400 font-extrabold">
                        {new Date(ev.date).toLocaleDateString("es-AR", { month: "short" }).toUpperCase()}
                      </span>
                      <span className="text-xl font-black leading-tight text-blue-900 dark:text-white">
                        {new Date(ev.date).getDate() || 10}
                      </span>
                    </div>

                    <div className="flex-grow">
                      {ev.category && (
                        <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 bg-sky-50 dark:bg-slate-800 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-slate-700 rounded-md mb-1">
                          {ev.category}
                        </span>
                      )}
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                        {ev.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        ⏰ {ev.time}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                    📍 {ev.locationName} {ev.city ? `(${ev.city})` : ""}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {ev.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <button
                      onClick={() => setSelectedEvent(ev)}
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wide cursor-pointer active:scale-95"
                    >
                      Ver Mapa y Cómo Llegar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL DETALLE DE EVENTO + MAPA INTERACTIVO + RUTA GPS */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || "Detalle de Evento"}
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-emerald-800 font-extrabold block">
                  🗓️ {formatDateDisplay(selectedEvent.date)}
                </span>
                <span className="text-emerald-700 font-semibold">⏰ Horario: {selectedEvent.time}</span>
              </div>
              {selectedEvent.category && (
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[11px]">
                  {selectedEvent.category}
                </span>
              )}
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Lugar y Dirección:</span>
              <p className="text-sm font-bold text-slate-800">📍 {selectedEvent.locationName}</p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Descripción:</span>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 whitespace-pre-line">
                {selectedEvent.description}
              </p>
            </div>

            {/* Componente del Mapa de Rutas Interactivas */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mapa Interactivo y Cálculo de Rutas ("¿Cómo llegar?")
              </h4>
              <EventRouteMap
                eventLat={selectedEvent.lat}
                eventLng={selectedEvent.lng}
                eventTitle={selectedEvent.title}
                locationName={selectedEvent.locationName}
              />
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL PROPONER EVENTO + CAPTCHA */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Proponer Nuevo Evento Comarcal"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <p className="text-xs text-slate-600">
            Completá la información del evento. Una vez cargado, quedará visible en la agenda pública de Esquel Conectado.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Título del Evento *
            </label>
            <input
              type="text"
              required
              value={newEventData.title}
              onChange={(e) => setNewEventData({ ...newEventData, title: e.target.value })}
              placeholder="Ej: Concierto al Aire Libre"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Categoría *
              </label>
              <select
                required
                value={newEventData.category}
                onChange={(e) => setNewEventData({ ...newEventData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 font-medium"
              >
                {categories.filter((c) => c !== "Todas").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Localidad *
              </label>
              <select
                required
                value={newEventData.city}
                onChange={(e) => setNewEventData({ ...newEventData, city: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 font-medium"
              >
                {cities.filter((c) => c !== "Todas").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Fecha del Evento *
              </label>
              <input
                type="date"
                required
                value={newEventData.date}
                onChange={(e) => setNewEventData({ ...newEventData, date: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Horario *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 18:00 a 22:00 HS"
                value={newEventData.time}
                onChange={(e) => setNewEventData({ ...newEventData, time: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Lugar / Dirección Exacta *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Plaza San Martín, Rivadavia y San Martín"
              value={newEventData.locationName}
              onChange={(e) => setNewEventData({ ...newEventData, locationName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Descripción del Evento *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Detalles sobre artistas, actividades, entrada libre o venta de boletos..."
              value={newEventData.description}
              onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 font-medium resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email de Contacto del Organizador *
            </label>
            <input
              type="email"
              required
              placeholder="organizador@evento.com"
              value={newEventData.organizerEmail}
              onChange={(e) => setNewEventData({ ...newEventData, organizerEmail: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 font-medium"
            />
          </div>

          {/* CAPTCHA ANTI-SPAM DE SEGURIDAD */}
          <Captcha
            onValidate={(valid) => {
              setIsCaptchaValid(valid);
              if (valid) setCaptchaError(null);
            }}
            error={captchaError}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
            >
              {submitting ? "Publicando evento..." : "Publicar Evento en la Agenda"}
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

