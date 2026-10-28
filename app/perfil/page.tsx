"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { dbService, User, Job, Application } from "../../services/database";

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [myApps, setMyApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const currentUser = dbService.getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUser(currentUser);

    async function fetchData() {
      const [jobs, apps] = await Promise.all([
        dbService.getUserJobs(currentUser!.id),
        dbService.getUserApplications(currentUser!.id)
      ]);
      setMyJobs(jobs);
      setMyApps(apps);
      setLoading(false);
    }
    fetchData();
  }, [router]);

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta oferta laboral?")) return;
    try {
      await dbService.deleteJob(jobId);
      setMyJobs(prev => prev.filter(j => j.id !== jobId));
    } catch (err: any) {
      alert("Error al eliminar la oferta: " + err.message);
    }
  };

  const handleLogout = () => {
    dbService.logout();
    router.push("/");
    router.refresh();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no debe superar los 5MB.");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Url = reader.result as string;
      const updatedUser = await dbService.updateUserAvatar(user.id, base64Url);
      setUser({ ...updatedUser });
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  if (!user || loading) return <div className="p-8 text-center text-slate-500">Cargando perfil...</div>;

  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex-grow max-w-5xl mx-auto px-4 py-8 sm:py-12 w-full">

        {/* Cabecera Perfil */}
        <div className="bg-gradient-to-r from-white via-sky-50/40 to-blue-50/20 rounded-3xl shadow-md p-5 sm:p-8 border border-sky-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-sky-400 rounded-full flex items-center justify-center text-3xl font-extrabold text-white shadow-md overflow-hidden border-2 border-white ring-4 ring-sky-100">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.substring(0, 1).toUpperCase()
                )}
              </div>
              <label
                htmlFor="avatar-input"
                className="absolute inset-0 bg-black/50 rounded-full text-white flex flex-col items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 text-center"
              >
                <span>📷 {uploading ? "Cargando..." : "Subir Foto"}</span>
              </label>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">{user.name}</h1>
                {user.role === "Empleador" && (
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-200 inline-flex items-center gap-1">
                    🏢 {user.companyName ? `Empresa: ${user.companyName}` : "Perfil Empleador"}
                  </span>
                )}
              </div>
              <p className="text-slate-500 font-medium">{user.email}</p>

              <label
                htmlFor="avatar-input"
                className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-lg border border-sky-200 cursor-pointer transition-colors"
              >
                <span>📷 {user.avatarUrl ? "Cambiar Foto / Logo" : "Agregar Foto o Logo de Empresa"}</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 hover:bg-red-100 px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm text-sm"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Sección: Mis Empleos Publicados */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                💼 Mis Empleos Publicados
              </h2>
              <button
                onClick={() => router.push("/nuevo-empleo")}
                className="text-xs font-extrabold bg-blue-700 text-white hover:bg-blue-800 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                + Publicar Empleo
              </button>
            </div>
            <div className="space-y-4">
              {myJobs.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border border-dashed border-slate-300 text-center">
                  <p className="text-slate-500 text-sm mb-3">Aún no has publicado ninguna oferta.</p>
                  <button
                    onClick={() => router.push("/nuevo-empleo")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
                  >
                    ➕ Publicar tu primera oferta
                  </button>
                </div>
              ) : (
                myJobs.map(job => (
                  <div key={job.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-blue-600 text-base">{job.title}</h3>
                      <p className="text-sm text-slate-500">{job.companyName} - {job.city}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                      title="Eliminar empleo publicado"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Sección: Mis Postulaciones */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              📝 Mis Solicitudes
            </h2>
            <div className="space-y-4">
              {myApps.length === 0 ? (
                <p className="text-slate-500 bg-white p-6 rounded-xl border border-dashed border-slate-300 text-center">
                  Aún no te has postulado a ningún empleo.
                </p>
              ) : (
                myApps.map(app => (
                  <div key={app.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-slate-800">{app.jobTitle}</h3>
                      <p className="text-sm text-slate-500">{app.companyName}</p>
                    </div>
                    <span className="text-xs font-bold bg-green-100 text-green-600 px-2 py-1 rounded-md">
                      Enviada
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
