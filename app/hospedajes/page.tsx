"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Home, Plus, MapPin, Star, Check, Map, MessageSquare, Globe } from "lucide-react";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import Captcha from "../../components/Captcha";
import { dbService, Accommodation } from "../../services/database";

// Importación dinámica del Mapa de Rutas para evitar fallos de SSR en Leaflet
const EventRouteMap = dynamic(() => import("../../components/EventRouteMap"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 font-medium text-sm">
      Cargando mapa de hospedaje y rutas GPS...
    </div>
  ),
});

export default function HospedajesPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de Filtro
  const [keyword, setKeyword] = useState("");
  const [selectedType, setSelectedType] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState("Todas");
  const [selectedPrice, setSelectedPrice] = useState("Todos");

  // Modal de Detalle / Mapa
  const [selectedAcc, setSelectedAcc] = useState<Accommodation | null>(null);

  // Modal de Publicación de Alojamiento
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Formulario de Publicación
  const [formData, setFormData] = useState({
    name: "",
    type: "Cabaña" as Accommodation["type"],
    city: "Esquel",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    priceRange: "$$" as Accommodation["priceRange"],
    lat: -42.911,
    lng: -71.318,
    amenities: ["WiFi Gratis", "Calefacción"],
  });

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

  const types = [
    "Todas",
    "Cabaña",
    "Hostería",
    "Hotel",
    "Hostel",
    "Camping & Glamping",
  ];

  const priceRanges = ["Todos", "$", "$$", "$$$", "$$$$"];

  const availableAmenitiesList = [
    "WiFi Gratis",
    "Calefacción",
    "Desayuno Patagónico",
    "Estacionamiento",
    "Parrilla",
    "Vista a las Montañas",
    "Vista al Lago",
    "Spa & Jacuzzi",
    "Cocina Completa",
    "Pet Friendly",
    "Recepcionista 24h",
  ];

  // Sincronizar localidad seleccionada en la app
  useEffect(() => {
    const savedCity = dbService.getSelectedCity();
    if (savedCity) setSelectedCity(savedCity);

    const handleCityChanged = (e: CustomEvent<string>) => {
      if (e.detail) {
        setSelectedCity(e.detail);
      }
    };

    window.addEventListener("cityChanged" as any, handleCityChanged);
    return () => window.removeEventListener("cityChanged" as any, handleCityChanged);
  }, []);

  const fetchAccommodations = async () => {
    setLoading(true);
    const data = await dbService.getAccommodations({
      keyword,
      type: selectedType,
      city: selectedCity,
      priceRange: selectedPrice,
    });
    setAccommodations(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAccommodations();
  }, [selectedCity, selectedType, selectedPrice]);

  const handleCityChangeInFilter = (newCity: string) => {
    setSelectedCity(newCity);
    dbService.setSelectedCity(newCity);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAccommodations();
  };

  const handleClearFilters = () => {
    setKeyword("");
    setSelectedType("Todas");
    setSelectedCity("Todas");
    setSelectedPrice("Todos");
    dbService.setSelectedCity("Todas");
    dbService.getAccommodations().then((data) => setAccommodations(data));
  };

  // Manejador de Amenities en el Formulario
  const toggleAmenityInForm = (amenity: string) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a !== amenity),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      });
    }
  };

  const handlePublishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaValid) {
      setCaptchaError("Debe completar la verificación CAPTCHA correctamente.");
      return;
    }

    setCaptchaError(null);
    await dbService.addAccommodation({
      ...formData,
      rating: 4.8,
    });

    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setIsPublishModalOpen(false);
      fetchAccommodations();
      // Reseteo de formulario
      setFormData({
        name: "",
        type: "Cabaña",
        city: "Esquel",
        address: "",
        phone: "",
        email: "",
        website: "",
        description: "",
        priceRange: "$$",
        lat: -42.911,
        lng: -71.318,
        amenities: ["WiFi Gratis", "Calefacción"],
      });
    }, 1500);
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner / Cabecera Principal de Hospedajes */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700 dark:text-sky-400 bg-blue-50 dark:bg-sky-950/80 px-3 py-1 rounded-full border border-blue-100 dark:border-sky-800 inline-flex items-center gap-1.5 mb-2">
              <Home className="w-3.5 h-3.5 stroke-[2]" /> Turismo & Alojamiento Comarcal
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dónde Hospedarse en cada Ciudad
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-1.5 font-medium max-w-3xl">
              Descubrí hoteles, hosterías, cabañas alpinas, hostels y glampings en Esquel y la Comarca Andina
            </p>
          </div>

          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="self-start md:self-auto bg-blue-700 hover:bg-blue-800 text-white font-extrabold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 active:scale-95 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Publicar Hospedaje
          </button>
        </div>

        {/* Píldoras de Acceso Rápido por Ciudad */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap mr-1">
            Filtrar Ciudad:
          </span>
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => handleCityChangeInFilter(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer inline-flex items-center gap-1 ${
                selectedCity === c
                  ? "bg-blue-700 text-white shadow-xs scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {c === "Todas" ? (
                <>
                  <Globe className="w-3.5 h-3.5 stroke-[2]" /> Todas las Ciudades
                </>
              ) : (
                <>
                  <MapPin className="w-3.5 h-3.5 stroke-[2]" /> {c}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Caja de Filtros */}
        <div className="bg-[#faf7f2] dark:bg-slate-900 border border-[#e8dfd2] dark:border-slate-800 rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex items-center justify-between mb-4 border-b border-[#e8dfd2]/80 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-700 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 text-base">Filtros de Búsqueda de Hospedaje</h2>
            </div>
            {(keyword || selectedType !== "Todas" || selectedCity !== "Todas" || selectedPrice !== "Todos") && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-semibold text-blue-700 dark:text-sky-400 hover:underline cursor-pointer"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Búsqueda por Palabra Clave */}
            <div className="sm:col-span-2 lg:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 block">
                Palabra Clave
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Nombre del alojamiento, barrio o servicio..."
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 font-medium"
              />
            </div>

            {/* Tipo de Hospedaje */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 block">
                Tipo de Alojamiento
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700 font-medium cursor-pointer"
              >
                {types.map((tItem) => (
                  <option key={tItem} value={tItem}>{tItem}</option>
                ))}
              </select>
            </div>

            {/* Rango de Precio */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 block">
                Rango de Precio
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700 font-medium cursor-pointer"
              >
                {priceRanges.map((p) => (
                  <option key={p} value={p}>
                    {p === "Todos" ? "Todos los precios" : `${p} (${p === "$" ? "Económico" : p === "$$" ? "Medio" : p === "$$$" ? "Premium" : "Lujo"})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón Buscar */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 px-5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                BUSCAR
              </button>
            </div>
          </form>
        </div>

        {/* Listado de Tarjetas de Hospedajes */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-slate-500 dark:text-slate-400 font-medium text-sm">Cargando opciones de hospedaje...</p>
          </div>
        ) : accommodations.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">No encontramos hospedajes con los filtros seleccionados.</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Intenta ajustando la ciudad, el tipo de hospedaje o el rango de precio.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-800 transition-colors cursor-pointer"
            >
              Ver todos los alojamientos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.map((acc) => (
              <div
                key={acc.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group hover:border-sky-400 dark:hover:border-sky-500 relative overflow-hidden"
              >
                <div>
                  {/* Fila Superior: Tipo, Precio & Rating */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-800 rounded-full inline-flex items-center gap-1">
                      <Home className="w-3.5 h-3.5 stroke-[2]" /> {acc.type}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                        {acc.priceRange}
                      </span>
                      {acc.rating && (
                        <span className="inline-flex items-center gap-1 text-xs font-black text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800/80">
                          <Star className="w-3 h-3 stroke-[2] fill-amber-400 text-amber-500" /> {acc.rating}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Nombre y Ubicación */}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors mb-2 leading-snug">
                    {acc.name}
                  </h3>

                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-3 inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 stroke-[2]" /> {acc.address} <span className="text-blue-700 dark:text-sky-400 font-extrabold">({acc.city})</span>
                  </p>

                  {/* Descripción Breve */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {acc.description}
                  </p>

                  {/* Lista de Amenities (Servicios) */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {acc.amenities.map((am) => (
                      <span
                        key={am}
                        className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-blue-600 dark:text-sky-400 stroke-[2.5]" /> {am}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Acciones de Contacto y Mapa GPS */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 mt-auto">
                  <button
                    onClick={() => setSelectedAcc(acc)}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wide cursor-pointer active:scale-95"
                  >
                    <Map className="w-3.5 h-3.5 stroke-[2]" /> Ver Ubicación y Ruta GPS
                  </button>

                  <div className="flex gap-2">
                    {acc.phone && (
                      <a
                        href={`https://wa.me/${acc.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 px-3 rounded-xl text-xs transition-all text-center border border-emerald-500 flex items-center justify-center gap-1 shadow-xs active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5 stroke-[2]" />
                        <span>WhatsApp Directo</span>
                      </a>
                    )}
                    {acc.website && (
                      <a
                        href={acc.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1"
                        title="Visitar Sitio Web"
                      >
                        <Globe className="w-3.5 h-3.5 stroke-[2]" /> Web
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DETALLE DE HOSPEDAJE + MAPA INTERACTIVO Y RUTA GPS */}
      <Modal
        isOpen={!!selectedAcc}
        onClose={() => setSelectedAcc(null)}
        title={selectedAcc?.name || "Detalle de Hospedaje"}
      >
        {selectedAcc && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-blue-900 dark:text-sky-300 font-black text-base block">
                  {selectedAcc.name}
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 stroke-[2]" /> {selectedAcc.address}, {selectedAcc.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 dark:bg-slate-800 text-blue-800 dark:text-sky-400 font-bold px-3 py-1 rounded-full text-xs">
                  {selectedAcc.type}
                </span>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black px-2.5 py-1 rounded-full text-xs">
                  {selectedAcc.priceRange}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Descripción del hospedaje:</span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                {selectedAcc.description}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Servicios e Instalaciones:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedAcc.amenities.map((am) => (
                  <span
                    key={am}
                    className="text-xs font-semibold bg-sky-50 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 px-3 py-1 rounded-lg border border-sky-100 dark:border-sky-800 inline-flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 stroke-[2.5]" /> {am}
                  </span>
                ))}
              </div>
            </div>

            {/* Componente de Ruta GPS y Plano Interactivo */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Ubicación Exacta y Cálculo de Ruta GPS ("¿Cómo llegar?")
              </h4>
              <EventRouteMap
                eventLat={selectedAcc.lat}
                eventLng={selectedAcc.lng}
                eventTitle={selectedAcc.name}
                locationName={`${selectedAcc.address}, ${selectedAcc.city}`}
              />
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL PARA PUBLICAR ALOJAMIENTO (PROTEGIDO POR CAPTCHA Y VERIFICACIÓN) */}
      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        title="Publicar Nuevo Hospedaje Turístico"
      >
        {publishSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">¡Alojamiento Publicado con Éxito!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Tu propiedad ya se encuentra visible para todos los turistas que visitan Esquel y la Comarca.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePublishSubmit} className="space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Completá los datos clave de tu hospedaje. La verificación CAPTCHA es obligatoria para garantizar publicaciones auténticas.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                Nombre del Hospedaje / Establecimiento *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Cabañas Valle Cordillerano"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-700 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Tipo de Hospedaje *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-700 focus:outline-none cursor-pointer"
                >
                  {types.filter(t => t !== "Todas").map((tType) => (
                    <option key={tType} value={tType}>{tType}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Ciudad de Ubicación *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-700 focus:outline-none cursor-pointer"
                >
                  {cities.filter(c => c !== "Todas").map((cCity) => (
                    <option key={cCity} value={cCity}>{cCity}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Dirección o Camino *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ej: Ameghino 1250, Esquel"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Ej: +54 2945 450000"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Rango de Precio *
                </label>
                <select
                  value={formData.priceRange}
                  onChange={(e) => setFormData({ ...formData, priceRange: e.target.value as any })}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-700 focus:outline-none cursor-pointer"
                >
                  <option value="$">$ (Económico / Hostel)</option>
                  <option value="$$">$$ (Medio / Estándar)</option>
                  <option value="$$$">$$$ (Superior / Premium)</option>
                  <option value="$$$$">$$$$ (Lujo / Exclusivo)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Sitio Web o Redes (Opcional)
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                Descripción Detallada *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detallá las comodidades, capacidad, vistas y servicios del alojamiento..."
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1.5">
                Servicios e Instalaciones Incluidos
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableAmenitiesList.map((am) => (
                  <label
                    key={am}
                    className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(am)}
                      onChange={() => toggleAmenityInForm(am)}
                      className="rounded text-blue-700 focus:ring-blue-700"
                    />
                    <span>{am}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verificación de Seguridad Anti-Spam CAPTCHA */}
            <Captcha
              onValidate={(valid) => {
                setIsCaptchaValid(valid);
                if (valid) setCaptchaError(null);
              }}
              error={captchaError}
            />

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-extrabold px-6 py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer"
              >
                Confirmar y Publicar
              </button>
            </div>
          </form>
        )}
      </Modal>
    </main>
  );
}
