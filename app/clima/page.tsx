"use client";

import { useEffect, useState } from "react";
import { CloudSnow, MapPin, Calendar, Droplets, Navigation, Clock, Activity } from "lucide-react";
import Navbar from "../../components/Navbar";
import { weatherService, CityWeather, RoadCondition } from "../../services/weather";

export default function ClimaPage() {
  const [citiesWeather, setCitiesWeather] = useState<CityWeather[]>([]);
  const [roads, setRoads] = useState<RoadCondition[]>([]);
  const [selectedCityId, setSelectedCityId] = useState("w-esquel");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const wData = await weatherService.getWeatherByCity();
      const rData = await weatherService.getRoadConditions();
      setCitiesWeather(wData);
      setRoads(rData);
      setLoading(false);
    }
    loadData();
  }, []);

  const activeWeather = citiesWeather.find((c) => c.id === selectedCityId) || citiesWeather[0];

  const getStatusBadge = (status: RoadCondition["status"]) => {
    switch (status) {
      case "Habilitado":
        return "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "Precaución":
        return "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Cadenas Obligatorias":
        return "bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800";
      case "Cerrado":
        return "bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800";
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Cabecera Principal */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700 dark:text-sky-400 bg-blue-50 dark:bg-sky-950/80 px-3 py-1 rounded-full border border-blue-100 dark:border-sky-800 inline-flex items-center gap-1.5 mb-2">
            <CloudSnow className="w-3.5 h-3.5 stroke-[2]" /> Servicio Meteorológico & Cordillera
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Clima & Estado de Caminos
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-1.5 font-medium max-w-3xl">
            Pronóstico en tiempo real, estado del Centro de Esquí La Hoya y de los pasos fronterizos de la Comarca Andina.
          </p>
        </div>

        {/* Píldoras de Selección de Ciudad */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap mr-1">
            Localidad:
          </span>
          {citiesWeather.map((cw) => (
            <button
              key={cw.id}
              onClick={() => setSelectedCityId(cw.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer inline-flex items-center gap-1.5 ${selectedCityId === cw.id
                  ? "bg-blue-700 text-white shadow-md scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
            >
              <MapPin className="w-3 h-3 stroke-[2]" /> {cw.city}
            </button>
          ))}
        </div>

        {loading || !activeWeather ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-slate-500 dark:text-slate-400 font-medium text-sm">Cargando reporte meteorológico...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Panel Principal: Clima Actual & Reporte de Nieve / Cerros */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tarjeta 1: Clima Actual */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 via-blue-800 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute right-0 top-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-sky-200 bg-sky-500/20 px-3 py-1 rounded-full border border-sky-300/30">
                        {activeWeather.region}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
                        {activeWeather.city}
                      </h2>
                    </div>
                    <span className="text-6xl sm:text-7xl">{activeWeather.icon}</span>
                  </div>

                  <div className="flex items-baseline gap-4 my-4">
                    <span className="text-6xl sm:text-7xl font-black text-white">
                      {activeWeather.temp}°C
                    </span>
                    <div>
                      <span className="text-lg font-bold text-sky-200 block">{activeWeather.condition}</span>
                      <span className="text-xs text-blue-200 font-medium">Sensación térmica: {activeWeather.feelsLike}°C</span>
                    </div>
                  </div>
                </div>

                {/* Métricas Meteorológicas */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15 text-xs mt-6">
                  <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    <span className="text-blue-200 block text-[11px] font-semibold">Viento</span>
                    <span className="font-extrabold text-white text-sm">{activeWeather.windSpeed}</span>
                    <span className="text-[10px] text-sky-200 block">{activeWeather.windDirection}</span>
                  </div>

                  <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    <span className="text-blue-200 block text-[11px] font-semibold">Humedad</span>
                    <span className="font-extrabold text-white text-sm">{activeWeather.humidity}</span>
                    <span className="text-[10px] text-sky-200 block">Punto de rocío</span>
                  </div>

                  <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    <span className="text-blue-200 block text-[11px] font-semibold">Índice UV</span>
                    <span className="font-extrabold text-white text-sm">{activeWeather.uvIndex}</span>
                    <span className="text-[10px] text-sky-200 block">Protección solar</span>
                  </div>

                  <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    <span className="text-blue-200 block text-[11px] font-semibold">Calidad del Aire</span>
                    <span className="font-extrabold text-emerald-300 text-sm">{activeWeather.airQuality}</span>
                    <span className="text-[10px] text-sky-200 block">Aire puro de montaña</span>
                  </div>
                </div>
              </div>

              {/* Tarjeta 2: Reporte de Nieve & La Hoya */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-700 dark:text-sky-400">
                      <Activity className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                        Reporte de Nieve & Montaña
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Centro de Esquí La Hoya
                      </span>
                    </div>
                  </div>

                  {activeWeather.mountainReport ? (
                    <div className="space-y-3.5">
                      <div className="bg-sky-50 dark:bg-sky-950/70 p-3.5 rounded-2xl border border-sky-100 dark:border-sky-800">
                        <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase block mb-1">
                          Nieve en Pista
                        </span>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300 font-semibold">Nieve Base:</span>
                          <span className="font-black text-blue-700 dark:text-sky-400">{activeWeather.mountainReport.baseSnow}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-slate-600 dark:text-slate-300 font-semibold">Nieve Cumbre:</span>
                          <span className="font-black text-blue-700 dark:text-sky-400">{activeWeather.mountainReport.topSnow}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400 font-semibold">Pistas Habilitadas:</span>
                          <span className="font-extrabold text-slate-800 dark:text-slate-200">{activeWeather.mountainReport.openTracks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400 font-semibold">Medios de Elevación:</span>
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{activeWeather.mountainReport.liftsStatus}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400 font-semibold">Temperatura Cumbre:</span>
                          <span className="font-extrabold text-blue-700 dark:text-sky-400">{activeWeather.mountainReport.temperature}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-xs text-slate-600 dark:text-slate-300 text-center">
                      <p className="font-bold">Condiciones de Montaña Normales</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Consulta el parte del Centro de Esquí La Hoya para detalles de nieve de temporada.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                  <a
                    href="https://skilahoya.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs text-center inline-flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Activity className="w-3.5 h-3.5 stroke-[2]" /> Parte Oficial de La Hoya
                  </a>
                </div>
              </div>
            </div>

            {/* Pronóstico Extendido de 5 Días */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-700 dark:text-sky-400 stroke-[2]" /> Pronóstico Extendido de 5 Días para {activeWeather.city}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {activeWeather.forecast.map((f, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:border-sky-300 dark:hover:border-sky-600 transition-colors"
                  >
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">{f.day}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-2">{f.date}</span>
                    <span className="text-3xl my-1">{f.icon}</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 my-1">{f.condition}</span>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-1">
                      <span className="text-blue-700 dark:text-sky-400">{f.high}°</span> / <span className="text-slate-500">{f.low}°</span>
                    </div>
                    <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 mt-2 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Droplets className="w-2.5 h-2.5 stroke-[2]" /> {f.rainProb}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Estado de Rutas y Pasos Fronterizos de la Comarca */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-blue-700 dark:text-sky-400 stroke-[2]" /> Estado de Rutas & Pasos Fronterizos
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Información actualizada sobre transitabilidad en la Comarca Andina y pasos a Chile.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
                  ● Actualizado hoy
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roads.map((road) => (
                  <div
                    key={road.id}
                    className="bg-slate-50 dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-black uppercase text-blue-700 dark:text-sky-400 tracking-wider">
                          {road.type} &bull; {road.route}
                        </span>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug">
                          {road.section}
                        </h4>
                      </div>

                      <span className={`text-xs font-black px-3 py-1 rounded-full border whitespace-nowrap ${getStatusBadge(road.status)}`}>
                        {road.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      {road.description}
                    </p>

                    <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      <span>Vialidad Nacional / Gendarmería</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 stroke-[2]" /> {road.lastUpdated}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
