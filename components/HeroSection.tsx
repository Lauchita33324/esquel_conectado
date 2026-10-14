import Link from "next/link";
import { FcBriefcase, FcCalendar, FcShop, FcSupport, FcDepartment } from "react-icons/fc";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900 py-20 lg:py-28">
      {/* Fotografía panorámica de la cordillera con overlay graduado */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop')",
        }}
      ></div>
      {/* Overlay institucional con gradiente para garantizar contraste y legibilidad óptima */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-950/80"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-200 text-xs font-semibold mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          Comarca Andina del Paralelo 42 &bull; Esquel, Chubut
        </div>

        {/* Título y Subtítulo según context.md */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-md max-w-4xl leading-tight">
          Centraliza tu comunidad en un solo lugar
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-slate-200 font-medium max-w-3xl leading-relaxed">
          Conectá con oportunidades laborales, eventos y turismo en la Comarca
        </p>

        {/* Botones de llamada a la acción */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/empleos"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 active:scale-95"
          >
            Buscar Empleo
          </Link>
          <Link
            href="/eventos"
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl border border-white/30 backdrop-blur-md transition-all duration-150 active:scale-95"
          >
            Ver Eventos
          </Link>
        </div>

        {/* Tarjetones de acceso rápido a los servicios */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl">
          {/* Tarjeta 1: Empleos */}
          <Link
            href="/empleos"
            className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-100 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1.5"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
              <FcBriefcase className="text-4xl" />
            </div>
            <h2 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
              Bolsa de Empleos
            </h2>
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">
              Vacantes verificadas en comercios y empresas regionales.
            </p>
          </Link>

          {/* Tarjeta 2: Eventos */}
          <Link
            href="/eventos"
            className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-100 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1.5"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
              <FcCalendar className="text-4xl" />
            </div>
            <h2 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
              Agenda Cultural
            </h2>
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">
              Festivales, ferias y actividades comunitarias.
            </p>
          </Link>

          {/* Tarjeta 3: Dónde Hospedarse */}
          <Link
            href="/hospedajes"
            className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-sky-200 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1.5 ring-2 ring-sky-500/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-sky-50 group-hover:bg-sky-100 flex items-center justify-center mb-4 transition-colors">
              <FcDepartment className="text-4xl" />
            </div>
            <h2 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
              Dónde Hospedarse
            </h2>
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">
              Hoteles, hosterías, cabañas y hostels por ciudad.
            </p>
          </Link>

          {/* Tarjeta 4: Comercios y Refugios */}
          <Link
            href="/comercios"
            className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-100 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1.5"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
              <FcShop className="text-4xl" />
            </div>
            <h2 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
              Refugios y Comercios
            </h2>
            <p className="text-sm text-slate-600 mt-2 line-clamp-2">
              Guía comercial, locales y paradores de montaña.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
