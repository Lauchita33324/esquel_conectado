"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Check, Star, MapPin, Clock, Map, MessageSquare } from "lucide-react";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import { dbService, Location } from "../../services/database";

// Importación dinámica del Mapa de Rutas para evitar SSR en Leaflet
const EventRouteMap = dynamic(() => import("../../components/EventRouteMap"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-500 font-medium text-sm">
      Cargando mapa interactivo...
    </div>
  ),
});

export default function ComerciosPage() {
  const [comercios, setComercios] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de Filtro
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Todas");
  const [city, setCity] = useState("Todas");

  // Modal de Detalle de Comercio y Mapa
  const [selectedCommerce, setSelectedCommerce] = useState<Location | null>(null);

  const categories = [
    "Todas",
    "Gastronomía",
    "Refugio y Montaña",
    "Comercio Regional",
    "Gastronomía y Cultura",
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

  // Sincronización con localidad global
  useEffect(() => {
    setCity(dbService.getSelectedCity());

    const handleCityChanged = (e: CustomEvent<string>) => {
      if (e.detail) {
        setCity(e.detail);
      }
    };

    window.addEventListener("cityChanged" as any, handleCityChanged);
    return () => window.removeEventListener("cityChanged" as any, handleCityChanged);
  }, []);

  const fetchComercios = async () => {
    setLoading(true);
    const data = await dbService.getCommerces({
      keyword,
      category,
      city,
    });
    setComercios(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComercios();
  }, [city, category]);

  const handleCityChangeInFilter = (newCity: string) => {
    setCity(newCity);
    dbService.setSelectedCity(newCity);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchComercios();
  };

  const handleClearFilters = () => {
    setKeyword("");
    setCategory("Todas");
    setCity("Todas");
    dbService.setSelectedCity("Todas");
    dbService.getCommerces().then((data) => setComercios(data));
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Cabecera Principal */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-2">
            Directorio Comarcal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Refugios y Comercios
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-1.5 font-medium max-w-2xl">
            Explorá los locales comerciales, casas de té, restaurantes patagónicos y refugios de montaña verificados de Esquel y la Comarca.
          </p>
        </div>

        {/* Caja Superior de Filtros */}
        <div className="bg-[#faf7f2] border border-[#e8dfd2] rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex items-center justify-between mb-4 border-b border-[#e8dfd2]/80 pb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h2 className="font-bold text-slate-800 text-base">Filtros de Búsqueda</h2>
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
                Palabra Clave
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Nombre, producto o dirección..."
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
                onChange={(e) => handleCityChangeInFilter(e.target.value)}
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

        {/* Grilla de Tarjetas Blancas Limpias */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-slate-500 font-medium text-sm">Cargando refugios y comercios...</p>
          </div>
        ) : comercios.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <p className="text-lg font-bold text-slate-800">No encontramos locales con estos filtros.</p>
            <p className="text-sm text-slate-500 mt-1">Prueba seleccionando otra categoría o localidad comarcal.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-blue-800 transition-colors"
            >
              Ver todos los comercios
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comercios.map((comercio) => (
              <div
                key={comercio.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between group hover:border-sky-400 dark:hover:border-sky-500 relative overflow-hidden"
              >
                <div>
                  {/* Top Bar: Categoría, Rating e Insignia Verificado */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-800 rounded-full">
                      {comercio.category || "Comercio"}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-sky-400 border border-blue-100 dark:border-slate-700 rounded-md inline-flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[2.5]" /> Verificado
                      </span>
                      {comercio.rating && (
                        <span className="inline-flex items-center gap-1 text-xs font-black text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800/80">
                          <Star className="w-3 h-3 stroke-[2] fill-amber-400 text-amber-500" /> {comercio.rating}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Nombre del Comercio */}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors mb-2 leading-snug">
                    {comercio.name}
                  </h3>

                  {/* Dirección y Ciudad */}
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-3 inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 stroke-[2]" /> {comercio.address || comercio.name} {comercio.city ? `(${comercio.city})` : ""}
                  </p>

                  {/* Horario de Atención */}
                  {comercio.hours && (
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 stroke-[2]" /> {comercio.hours}
                    </p>
                  )}

                  {/* Descripción */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
                    {comercio.description}
                  </p>
                </div>

                {/* Acciones Rápidas */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2.5 mt-auto">
                  <button
                    onClick={() => setSelectedCommerce(comercio)}
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wide cursor-pointer active:scale-95"
                  >
                    <Map className="w-3.5 h-3.5 stroke-[2]" /> Ver Mapa y Ruta GPS
                  </button>

                  {comercio.phone && (
                    <a
                      href={`https://wa.me/${comercio.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-all text-center border border-emerald-500 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5 stroke-[2]" />
                      <span>WhatsApp Directo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DETALLE DE COMERCIO + MAPA INTERACTIVO + RUTA GPS */}
      <Modal
        isOpen={!!selectedCommerce}
        onClose={() => setSelectedCommerce(null)}
        title={selectedCommerce?.name || "Detalle de Comercio"}
      >
        {selectedCommerce && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-blue-900 font-extrabold block text-sm">
                  {selectedCommerce.name}
                </span>
                <span className="text-blue-700 font-semibold inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 stroke-[2]" /> {selectedCommerce.address}
                </span>
              </div>
              {selectedCommerce.category && (
                <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full text-[11px]">
                  {selectedCommerce.category}
                </span>
              )}
            </div>

            {selectedCommerce.hours && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                <span className="font-bold block text-slate-800 mb-0.5">Horarios de atención:</span>
                {selectedCommerce.hours}
              </div>
            )}

            <div>
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Sobre el establecimiento:</span>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 whitespace-pre-line">
                {selectedCommerce.description}
              </p>
            </div>

            {/* Componente del Mapa de Rutas Interactivas */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Ubicación en Plano y Cálculo de Rutas ("¿Cómo llegar?")
              </h4>
              <EventRouteMap
                eventLat={selectedCommerce.lat}
                eventLng={selectedCommerce.lng}
                eventTitle={selectedCommerce.name}
                locationName={selectedCommerce.address || selectedCommerce.city || "Esquel"}
              />
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
