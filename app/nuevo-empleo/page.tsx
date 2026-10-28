"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import Navbar from "../../components/Navbar";
import Captcha from "../../components/Captcha";
import { dbService } from "../../services/database";

export default function NuevoEmpleoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    companyLogo: "",
    category: "Comercio",
    employmentType: "Jornada Completa",
    city: "Esquel",
    province: "Chubut",
    salary: "",
    description: "",
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen del comercio no debe superar los 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, companyLogo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const currentUser = dbService.getCurrentUser();
    if (currentUser?.companyName) {
      setFormData(prev => ({ 
        ...prev, 
        companyName: currentUser.companyName || "",
        companyLogo: currentUser.avatarUrl || ""
      }));
    }
  }, []);

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Comercio",
    "Gastronomía",
    "Tecnología",
    "Turismo",
    "Producción",
    "Servicios Técnicos",
    "Otro",
  ];

  const employmentTypes = [
    "Jornada Completa",
    "Part-time",
    "Temporada",
    "Remoto / Híbrido",
  ];

  const cities = [
    "Esquel",
    "Trevelin",
    "Lago Puelo",
    "El Bolsón",
    "El Hoyo",
    "Epuyén",
    "Cholila",
    "El Maitén",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificación de Seguridad CAPTCHA
    if (!isCaptchaValid) {
      setCaptchaError("Ingresá el código de seguridad (CAPTCHA) correcto para continuar.");
      return;
    }

    setCaptchaError(null);
    setLoading(true);
    
    try {
      await dbService.addJob({
        title: formData.title,
        companyName: formData.companyName,
        companyLogo: formData.companyLogo || undefined,
        category: formData.category,
        employmentType: formData.employmentType,
        city: formData.city,
        province: formData.province,
        salary: formData.salary ? (formData.salary.trim().startsWith("$") ? formData.salary.trim() : `$${formData.salary.trim()}`) : undefined,
        description: formData.description,
        createdAt: "Hoy",
      });
      
      alert("¡Oferta de empleo publicada con éxito en Esquel Conectado!");
      router.push("/empleos");
    } catch (error) {
      alert("No se pudo publicar la oferta de empleo. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="flex-grow max-w-3xl mx-auto px-4 py-6 sm:py-10 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
          <div className="border-b border-slate-100 pb-5 mb-6">
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-2">
              Sección Empleadores
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Publicar Nueva Búsqueda Laboral
            </h1>
            <p className="text-slate-600 text-sm mt-1.5 font-medium">
              Completá los datos requeridos para conectar con postulantes de Esquel y la Comarca Andina.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título y Nombre de la Empresa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Título del Anuncio *
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="Ej: Cajero/a de Salón"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none transition-all font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Empresa o Comercio *
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="Ej: Comercio Central Esquel"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none transition-all font-medium"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
            </div>

            {/* Subir Foto / Logo del Comercio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 stroke-[2] text-blue-700" />
                <span>Imagen / Foto del Comercio o Empresa (Opcional)</span>
              </label>
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-300 p-3 rounded-xl">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer flex-1"
                />
                {formData.companyLogo && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-blue-200 flex-shrink-0 shadow-sm">
                    <img src={formData.companyLogo} alt="Vista previa" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Categoría, Tipo de Jornada y Localidad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Categoría *
                </label>
                <select 
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none transition-all font-medium cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tipo de Jornada *
                </label>
                <select 
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none transition-all font-medium cursor-pointer"
                  value={formData.employmentType}
                  onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                >
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Localidad *
                </label>
                <select 
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none transition-all font-medium cursor-pointer"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Remuneración Estimada (Opcional) con Prefijo $ Predeterminado */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Remuneración Estimada (Opcional)
              </label>
              <div className="flex items-center">
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-sm px-4 py-2.5 rounded-l-xl border border-r-0 border-slate-300 dark:border-slate-600 flex items-center justify-center select-none">
                  $
                </span>
                <input 
                  type="text" 
                  placeholder="Ej: 700.000 - 850.000 / A convenir"
                  className="w-full bg-slate-50 border border-slate-300 rounded-r-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none transition-all font-medium"
                  value={formData.salary.startsWith("$ ") || formData.salary.startsWith("$") ? formData.salary.replace(/^\$\s?/, "") : formData.salary}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({ ...formData, salary: val });
                  }}
                />
              </div>
            </div>

            {/* Descripción del Puesto */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Descripción del Puesto y Requisitos *
              </label>
              <textarea 
                required
                rows={5}
                placeholder="Detallá las tareas a realizar, horario de trabajo, experiencia requerida y beneficios..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-700 focus:outline-none transition-all resize-none font-medium"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            {/* Módulo de Verificación CAPTCHA (Seguridad Anti-Spam) */}
            <Captcha 
              onValidate={(valid) => {
                setIsCaptchaValid(valid);
                if (valid) setCaptchaError(null);
              }}
              error={captchaError}
            />

            {/* Botón de envío azul destacado */}
            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer disabled:opacity-50"
              >
                {loading ? "Publicando..." : "Publicar Oferta Laboral"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

