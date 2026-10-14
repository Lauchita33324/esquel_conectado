"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import JobBoard from "../../components/JobBoard";
import { Suspense } from "react";

const CITY_BANNER_MAP: Record<string, { image: string; title: string; subtitle: string }> = {
  "esquel": {
    image: "/Esquel_Chubut_202605071546.jpeg",
    title: "Esquel Conectado",
    subtitle: "Oportunidades laborales en el corazón de la Patagonia",
  },
  "el bolsón": {
    image: "/bolsonimg.jpeg",
    title: "El Bolsón Conectado",
    subtitle: "Oportunidades laborales en El Bolsón y la Comarca",
  },
  "el bolson": {
    image: "/bolsonimg.jpeg",
    title: "El Bolsón Conectado",
    subtitle: "Oportunidades laborales en El Bolsón y la Comarca",
  },
  "el hoyo": {
    image: "/elhoyoimg.jpeg",
    title: "El Hoyo Conectado",
    subtitle: "Oportunidades laborales en la Capital Nacional de la Fruta Fina",
  },
  "lago puelo": {
    image: "/lagopueloimg.jpeg",
    title: "Lago Puelo Conectado",
    subtitle: "Oportunidades laborales en el Refugio de la Comarca",
  },
};

function EmpleosContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const normalizedCity = city?.trim().toLowerCase() || "";
  const cityData = CITY_BANNER_MAP[normalizedCity];

  return (
    <div className="flex-grow w-full">
      {cityData && (
        <div id={`ciudades-${city}`} className="relative w-full py-64 mb-24 overflow-hidden">
          {/* Background con overlay celeste */}
          <div
            className="absolute inset-0 bg-cover bg-bottom opacity-100 select-none pointer-events-none"
            style={{
              backgroundImage: `url('${cityData.image}')`,
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
            onContextMenu={(e) => e.preventDefault()}
          ></div>
          <div className="absolute inset-0 bg-sky-950/20 dark:bg-slate-950/50 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-50 dark:from-[#0b101d] via-slate-50/60 dark:via-[#0b101d]/60 to-transparent pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-xl mb-2">{cityData.title}</h1>
            <p className="text-white text-xl font-bold drop-shadow-lg opacity-90">
              {cityData.subtitle}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {!cityData && (
          <div className="border-b border-slate-200 pb-6 mb-6">
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-2">
              Sección Laboral
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight">
              Buscar Empleo en la Comarca
            </h1>
            <p className="text-slate-600 text-base mt-1.5 font-medium max-w-2xl">
              {city
                ? `Explorando oportunidades laborales publicadas en ${city} y alrededores.`
                : "Conectá con vacantes laborales verificadas de comercios, empresas y emprendimientos locales."}
            </p>
          </div>
        )}
      </div>
      <JobBoard initialCity={city || undefined} />
    </div>
  );
}

export default function EmpleosPage() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando empleos...</div>}>
        <EmpleosContent />
      </Suspense>
    </main>
  );
}
