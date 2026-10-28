"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Captcha from "../../components/Captcha";
import { dbService } from "../../services/database";

export default function RegistroPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"Usuario" | "Empleador">("Usuario");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [cuit, setCuit] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setCaptchaError(null);

    // Validaciones de campos requeridos
    if (!name.trim()) {
      setErrorMsg("Por favor completá tu Nombre y Apellido para continuar.");
      return;
    }

    if (accountType === "Empleador" && !companyName.trim()) {
      setErrorMsg("Por favor completá el Nombre de tu Empresa o Comercio.");
      return;
    }

    if (!email.trim()) {
      setErrorMsg("Por favor completá tu Correo Electrónico para continuar.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("Por favor ingresá un Correo Electrónico válido (ejemplo: usuario@correo.com).");
      return;
    }

    if (!password) {
      setErrorMsg("Por favor ingresá una contraseña para tu cuenta.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("La contraseña debe contener al menos 6 caracteres por seguridad.");
      return;
    }

    // Validación de contraseñas coincidentes
    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas ingresadas no coinciden. Por favor verificalas.");
      return;
    }

    // Validación obligatoria de seguridad CAPTCHA
    if (!isCaptchaValid) {
      setCaptchaError("Completá la verificación de seguridad CAPTCHA antes de continuar.");
      return;
    }

    setLoading(true);
    try {
      await dbService.register(name, email, password, accountType, companyName, cuit);
      router.push("/perfil");
      router.refresh();
    } catch (error: any) {
      setErrorMsg(error.message || "Error al procesar el registro. Intentalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 w-full max-w-lg p-5 sm:p-8 md:p-10">
          {/* Encabezado del Formulario */}
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Comunidad Comarcal
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Crear Cuenta
            </h1>
            <p className="text-slate-600 text-sm mt-2">
              Sumate a la plataforma de Esquel y la Comarca Andina
            </p>
          </div>

          {/* Selector de Tipo de Cuenta */}
          <div className="mb-6 grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setAccountType("Usuario")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                accountType === "Usuario"
                  ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-sky-300 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <span>👤 Busco Empleo / Vecino</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountType("Empleador")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                accountType === "Empleador"
                  ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-sky-300 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <span>🏢 Empresa / Comercio</span>
            </button>
          </div>

          {/* Información del perfil seleccionado */}
          <div className="mb-6 bg-sky-50 border border-sky-100 rounded-xl p-3.5 text-xs text-sky-900 flex items-start gap-2.5">
            <svg className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="leading-relaxed">
              {accountType === "Usuario" ? (
                <span>Te registrarás como <strong>Persona / Trabajador</strong>. Podrás postularte a ofertas laborales y guardar búsquedas en la Comarca.</span>
              ) : (
                <span>Te registrarás como <strong>Empresa / Comercio (Empleador)</strong>. Podrás publicar avisos laborales, recibir postulaciones y administrar candidatos.</span>
              )}
            </p>
          </div>

          {/* Mensaje de error diseñado con la paleta de la web (azul institucional, celeste y blanco) */}
          {errorMsg && (
            <div 
              className="mb-6 bg-blue-50/90 border-l-4 border-l-blue-700 border border-blue-200 text-blue-950 px-4 py-3.5 rounded-xl shadow-sm flex items-start gap-3 animate-in fade-in duration-200"
              role="alert"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-300 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-blue-700 mb-0.5">
                  Aviso de Validación
                </span>
                <span className="text-sm font-semibold text-slate-800 leading-snug">
                  {errorMsg}
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleRegister} noValidate className="space-y-4">
            {/* Nombre Completo */}
            <div>
              <label 
                htmlFor="reg-name" 
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {accountType === "Empleador" ? "Nombre del Responsable" : "Nombre y Apellido"}
              </label>
              <input 
                id="reg-name"
                required
                type="text" 
                autoComplete="name"
                placeholder={accountType === "Empleador" ? "Ej: Laura González (Contacto)" : "Ej: Laura González"}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all font-medium"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Campos de Empresa / Comercio (solo para rol Empleador) */}
            {accountType === "Empleador" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
                <div>
                  <label 
                    htmlFor="reg-company" 
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Nombre del Comercio / Empresa *
                  </label>
                  <input 
                    id="reg-company"
                    required
                    type="text" 
                    placeholder="Ej: Don Chiquino / Hotel Patagónico"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all font-medium"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <label 
                    htmlFor="reg-cuit" 
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    CUIT / Identificación (Opcional)
                  </label>
                  <input 
                    id="reg-cuit"
                    type="text" 
                    placeholder="Ej: 30-12345678-9"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all font-medium"
                    value={cuit}
                    onChange={(e) => setCuit(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label 
                htmlFor="reg-email" 
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Correo Electrónico
              </label>
              <input 
                id="reg-email"
                required
                type="email" 
                autoComplete="email"
                placeholder="laura@ejemplo.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Grilla Contraseña y Confirmar con Ojito para Ver Contraseña */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="reg-password" 
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input 
                    id="reg-password"
                    required
                    type={showPassword ? "text" : "password"} 
                    autoComplete="new-password"
                    placeholder="Mínimo 6 caracteres"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-11 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-700 p-1 rounded-lg focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      /* Icono Ojo Tachado (Ocultar) */
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      /* Icono Ojo Abierto (Mostrar) */
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label 
                  htmlFor="reg-confirm-password" 
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input 
                    id="reg-confirm-password"
                    required
                    type={showConfirmPassword ? "text" : "password"} 
                    autoComplete="new-password"
                    placeholder="Repetí tu contraseña"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-11 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all font-medium"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Ocultar confirmación de contraseña" : "Ver confirmación de contraseña"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-700 p-1 rounded-lg focus:outline-none transition-colors"
                  >
                    {showConfirmPassword ? (
                      /* Icono Ojo Tachado (Ocultar) */
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      /* Icono Ojo Abierto (Mostrar) */
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Verificación de Seguridad CAPTCHA Obligatoria */}
            <div className="pt-2">
              <Captcha 
                onValidate={(isValid) => {
                  setIsCaptchaValid(isValid);
                  if (isValid) setCaptchaError(null);
                }}
                error={captchaError}
              />
            </div>

            {/* Botón de Envío en Azul Institucional en Negrita */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creando cuenta comunitaria...
                </>
              ) : (
                "Crear Mi Cuenta Comunitaria"
              )}
            </button>
          </form>

          {/* Enlace a Inicio de Sesión */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-600 text-sm">
              ¿Ya tenés una cuenta registrada?{" "}
              <Link 
                href="/login" 
                className="text-blue-700 font-bold hover:text-blue-800 hover:underline"
              >
                Iniciá sesión acá
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
