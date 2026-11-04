import Link from "next/link";
import { Briefcase, Calendar, Building2, Store, ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-12 sm:py-16 lg:py-20">
      {/* Fotografía panorámica de la cordillera con overlay graduado */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000 ease-out opacity-45 mix-blend-luminosity"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop')",
        }}
      ></div>
      {/* Overlay institucional con gradiente para garantizar contraste y legibilidad óptima */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/75 to-slate-950"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-sky-400/30 text-sky-200 text-xs font-semibold mb-5 sm:mb-6 backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span>Comarca Andina del Paralelo 42 &bull; Esquel, Chubut</span>
        </div>

        {/* Título y Subtítulo según context.md */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-sm max-w-4xl leading-[1.15]">
          Centraliza tu comunidad en un solo lugar
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-slate-300 font-normal max-w-2xl leading-relaxed">
          Conectá con oportunidades laborales, eventos y turismo en la Comarca
        </p>

        {/* Botones de llamada a la acción */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 w-full sm:w-auto">
          <Link
            href="/empleos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-blue-500/20 hover:shadow-lg transition-all duration-150 active:scale-95 text-sm sm:text-base border border-blue-500/40"
          >
            <span>Buscar Empleo</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </Link>
          <Link
            href="/eventos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 backdrop-blur-md transition-all duration-150 active:scale-95 text-sm sm:text-base"
          >
            <span>Ver Eventos</span>
            <Calendar className="w-4 h-4 text-sky-300 stroke-[2]" />
          </Link>
        </div>

        {/* Tarjetones de acceso rápido a los servicios */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full max-w-6xl text-left">
          {/* Tarjeta 1: Empleos */}
          <Link
            href="/empleos"
            className="group relative bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-xl border border-white/40 dark:border-slate-800 transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500 flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-sky-400 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-3.5">
                <Briefcase className="w-5 h-5 stroke-[2]" />
              </div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                Bolsa de Empleos
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                Vacantes verificadas en comercios y empresas regionales.
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
              Explorar puestos <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Tarjeta 2: Eventos */}
          <Link
            href="/eventos"
            className="group relative bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-xl border border-white/40 dark:border-slate-800 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 dark:hover:border-emerald-500 flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-3.5">
                <Calendar className="w-5 h-5 stroke-[2]" />
              </div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Agenda Cultural
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                Festivales, ferias y actividades comunitarias.
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              Ver calendario <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Tarjeta 3: Dónde Hospedarse */}
          <Link
            href="/hospedajes"
            className="group relative bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-xl border border-sky-300/80 dark:border-sky-800/80 ring-1 ring-sky-400/30 transition-all duration-200 hover:-translate-y-1 hover:border-sky-400 dark:hover:border-sky-400 flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-sky-50 dark:bg-sky-950/70 border border-sky-100 dark:border-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-300 group-hover:bg-sky-600 group-hover:text-white transition-colors mb-3.5">
                <Building2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  Hospedajes
                </h2>
                <span className="px-1.5 py-0.2 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[10px] font-extrabold rounded-md">
                  Guía
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                Hoteles, hosterías, cabañas y hostels por ciudad.
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
              Buscar alojamiento <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Tarjeta 4: Comercios y Refugios */}
          <Link
            href="/comercios"
            className="group relative bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-xl border border-white/40 dark:border-slate-800 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400 dark:hover:border-amber-500 flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-100 dark:border-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors mb-3.5">
                <Store className="w-5 h-5 stroke-[2]" />
              </div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Refugios & Locales
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                Guía comercial, locales y paradores de montaña.
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
              Ver comercios <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
