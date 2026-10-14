"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dbService, Job } from "../services/database";
import Modal from "./Modal";

interface JobBoardProps {
  initialCity?: string;
}

export default function JobBoard({ initialCity }: JobBoardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de filtros de búsqueda
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Todas");
  const [province, setProvince] = useState("Todas");
  const [city, setCity] = useState(initialCity || "Todas");

  // Modales
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [chatJob, setChatJob] = useState<Job | null>(null);

  // Formulario de Chat Directo con el Empleador
  const [chatSenderName, setChatSenderName] = useState("");
  const [chatSenderContact, setChatSenderContact] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatStatus, setChatStatus] = useState<"idle" | "sending" | "success">("idle");

  const categories = [
    "Todas",
    "Comercio",
    "Gastronomía",
    "Tecnología",
    "Turismo",
    "Producción",
    "Servicios Técnicos",
  ];

  const provinces = ["Todas", "Chubut", "Río Negro"];

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

  // Carga y filtrado de empleos
  const fetchJobs = async () => {
    setLoading(true);
    const data = await dbService.getJobs({
      keyword,
      category,
      province,
      city: city !== "Todas" ? city : undefined,
    });
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    if (initialCity) {
      setCity(initialCity);
    }
  }, [initialCity]);

  useEffect(() => {
    fetchJobs();
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleClearFilters = () => {
    setKeyword("");
    setCategory("Todas");
    setProvince("Todas");
    setCity("Todas");
    dbService.getJobs().then(data => setJobs(data));
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatJob || !chatMessage.trim()) return;

    setChatStatus("sending");
    try {
      const user = dbService.getCurrentUser();
      await dbService.sendDirectMessage({
        jobId: chatJob.id,
        jobTitle: chatJob.title,
        companyName: chatJob.companyName,
        senderName: chatSenderName || user?.name || "Postulante",
        senderEmail: chatSenderContact || user?.email || "contacto@postulante.com",
        message: chatMessage,
      });

      setChatStatus("success");
      setTimeout(() => {
        setChatJob(null);
        setChatStatus("idle");
        setChatMessage("");
      }, 1600);
    } catch {
      setChatStatus("idle");
      alert("No se pudo enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  return (
    <section id="empleos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. CAJA SUPERIOR DE FILTROS (Tono beige suave y diseño claro según context.md) */}
      <div className="bg-[#faf7f2] border border-[#e8dfd2] rounded-2xl p-6 md:p-8 shadow-sm mb-12">
        <div className="flex items-center justify-between mb-5 border-b border-[#e8dfd2]/80 pb-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <h2 className="font-bold text-slate-800 text-lg">
              Filtros de Búsqueda Laboral
            </h2>
          </div>
          {(keyword || category !== "Todas" || province !== "Todas" || city !== "Todas") && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 underline cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Palabra clave */}
          <div className="lg:col-span-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
              Palabra Clave
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Puesto, empresa o palabra clave..."
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all font-medium"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all font-medium cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Localidad */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
              Localidad
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-all font-medium cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Botón azul con leyenda BUSCAR */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              BUSCAR
            </button>
          </div>
        </form>
      </div>

      {/* 2. ENCABEZADO DE RESULTADOS Y BOTÓN DE PUBLICAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Ofertas de Empleo Disponibles
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {jobs.length} {jobs.length === 1 ? "vacante encontrada" : "vacantes encontradas"} en la Comarca
          </p>
        </div>

        <Link
          href="/nuevo-empleo"
          className="inline-flex items-center justify-center gap-2 bg-white border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-bold px-5 py-2.5 rounded-xl shadow-sm text-sm transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Publicar Vacante
        </Link>
      </div>

      {/* 3. GRILLA DE TARJETAS BLANCAS LIMPIAS (Según context.md) */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-slate-500 font-medium text-sm">Cargando vacantes laborales...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <p className="text-lg font-bold text-slate-800">No encontramos vacantes con estos filtros.</p>
          <p className="text-sm text-slate-500 mt-1">Prueba seleccionando otra categoría o localidad comarcal.</p>
          <button
            onClick={handleClearFilters}
            className="mt-4 bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-blue-800 transition-colors"
          >
            Ver todas las ofertas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 group hover:border-sky-400 dark:hover:border-sky-500"
            >
              <div className="flex items-start gap-4 flex-grow">
                {/* Logo / Initials Badge */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-600 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-md shadow-sky-900/10 overflow-hidden">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" />
                  ) : (
                    job.companyPhotoPlaceholder
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">
                      {job.companyName}
                    </h4>
                    <span className="text-slate-400 dark:text-slate-500 text-xs">&bull;</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      📍 {job.city}
                    </span>
                    {job.category && (
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-800 rounded-full ml-auto md:ml-0">
                        {job.category}
                      </span>
                    )}
                  </div>

                  {/* Título del puesto */}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors leading-tight mb-2">
                    {job.title}
                  </h3>

                  {/* Badges de modalidad y salario destacado en Monoespaciado */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                      ⚡ {job.employmentType || "Jornada Completa"}
                    </span>

                    {/* Salario en tipografía monoespaciada */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 rounded-lg shadow-xs">
                      💰 {job.salary || "A convenir"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-3 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex sm:flex-col gap-2 shrink-0 md:w-48 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl text-xs transition-all text-center cursor-pointer"
                >
                  Ver Detalle
                </button>
                <button
                  onClick={() => setChatJob(job)}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-xs text-center cursor-pointer active:scale-95"
                >
                  💬 Contactar
                </button>
              </div>
            </div>
          ))}
        </div>

      )}

      {/* MODAL 1: CHAT DIRECTO CON EL EMPLEADOR (Comunicación directa web sin formularios externos) */}
      <Modal
        isOpen={!!chatJob}
        onClose={() => {
          setChatJob(null);
          setChatStatus("idle");
        }}
        title={chatJob ? `Mensaje Directo a ${chatJob.companyName}` : "Chat Directo"}
      >
        {chatJob && (
          <div>
            {chatStatus === "success" ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">¡Mensaje directo enviado!</h3>
                <p className="text-sm text-slate-600 mt-1">
                  {chatJob.companyName} ha recibido tu consulta por el puesto de <strong>{chatJob.title}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendChatMessage} className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl text-xs text-blue-800">
                  Estás comunicándote directamente con el empleador para el puesto:{" "}
                  <strong>{chatJob.title}</strong> ({chatJob.city}).
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tu Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={chatSenderName}
                    onChange={(e) => setChatSenderName(e.target.value)}
                    placeholder="Ej: Laura González"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Correo o Teléfono de Contacto
                  </label>
                  <input
                    type="text"
                    required
                    value={chatSenderContact}
                    onChange={(e) => setChatSenderContact(e.target.value)}
                    placeholder="Ej: laura@gmail.com o +54 9 2945..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mensaje para el Empleador
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Escribe tu consulta sobre la vacante o presenta brevemente tu experiencia..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={chatStatus === "sending"}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                  >
                    {chatStatus === "sending" ? "Enviando mensaje..." : "Enviar Mensaje Directo"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>

      {/* MODAL 2: DETALLES DE LA VACANTE Y POSTULACIÓN */}
      <Modal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={selectedJob?.title || "Detalle de Empleo"}
      >
        {selectedJob && (
          <div className="space-y-5 text-slate-800">
            <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
              <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl font-extrabold text-blue-700 overflow-hidden flex-shrink-0">
                {selectedJob.companyLogo ? (
                  <img src={selectedJob.companyLogo} alt={selectedJob.companyName} className="w-full h-full object-cover" />
                ) : (
                  selectedJob.companyPhotoPlaceholder
                )}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">{selectedJob.companyName}</h4>
                <p className="text-xs text-slate-500 font-medium">📍 {selectedJob.city}, {selectedJob.province || "Chubut"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-0.5">Jornada</span>
                <span className="font-bold text-slate-800">{selectedJob.employmentType || "Jornada Completa"}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 block mb-0.5">Categoría</span>
                <span className="font-bold text-slate-800">{selectedJob.category || "General"}</span>
              </div>
            </div>

            {selectedJob.salary && (
              <div className="bg-blue-50/70 border border-blue-100 p-3 rounded-xl text-xs">
                <span className="text-blue-600 font-medium block">Remuneración ofrecida:</span>
                <span className="text-base font-extrabold text-blue-800">{selectedJob.salary}</span>
              </div>
            )}

            <div>
              <h5 className="font-bold text-slate-900 text-sm mb-2">Descripción del puesto y tareas:</h5>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={async () => {
                  try {
                    await dbService.applyToJob(selectedJob);
                    alert("¡Postulación registrada con éxito! El empleador podrá revisar tus datos.");
                    setSelectedJob(null);
                  } catch (error: any) {
                    alert(error.message);
                  }
                }}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition-colors text-sm"
              >
                Confirmar Postulación
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
