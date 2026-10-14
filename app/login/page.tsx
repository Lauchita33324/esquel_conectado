"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Captcha from "../../components/Captcha";
import { dbService } from "../../services/database";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setCaptchaError(null);

    // Validación previa de campos
    if (!email.trim()) {
      setErrorMsg("Por favor ingresá tu correo electrónico.");
      return;
    }

    if (!password) {
      setErrorMsg("Por favor ingresá tu contraseña.");
      return;
    }

    // Validación de seguridad CAPTCHA
    if (!isCaptchaValid) {
      setCaptchaError("Por favor ingresá el código de verificación de seguridad correctamente.");
      return;
    }

    setLoading(true);
    try {
      await dbService.login(email, password);
      router.push("/perfil");
      router.refresh();
    } catch (error: any) {
      setErrorMsg(error.message || "Error al iniciar sesión. Verificá tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 w-full max-w-md p-8 md:p-10">
          {/* Encabezado del Formulario */}
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Acceso Seguro
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Iniciar Sesión
            </h1>
            <p className="text-slate-600 text-sm mt-2">
              Ingresá a tu cuenta de <strong className="text-blue-700">Esquel Conectado</strong>
            </p>
          </div>

          {/* Mensaje de error diseñado con los colores de la web */}
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

          <form onSubmit={handleLogin} noValidate className="space-y-5">
            {/* Campo Email */}
            <div>
              <label 
                htmlFor="login-email" 
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Correo Electrónico
              </label>
              <input 
                id="login-email"
                required
                type="email" 
                autoComplete="email"
                placeholder="tuemail@ejemplo.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo Contraseña con Ojito */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="login-password" 
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <input 
                  id="login-password"
                  required
                  type={showPassword ? "text" : "password"} 
                  autoComplete="current-password"
                  placeholder="••••••••"
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Verificación de Seguridad CAPTCHA Obligatoria */}
            <div className="pt-1">
              <Captcha 
                onValidate={(isValid) => {
                  setIsCaptchaValid(isValid);
                  if (isValid) setCaptchaError(null);
                }}
                error={captchaError}
              />
            </div>

            {/* Botón de Entrada en Azul Institucional en Negrita */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Validando acceso...
                </>
              ) : (
                "Entrar a Mi Cuenta"
              )}
            </button>
          </form>

          {/* Enlace a Registro */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-600 text-sm">
              ¿No tenés una cuenta aún?{" "}
              <Link 
                href="/registro" 
                className="text-blue-700 font-bold hover:text-blue-800 hover:underline"
              >
                Registrate acá
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
