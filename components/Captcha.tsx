"use client";

import { useState } from "react";

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
  error?: string | null;
}

function createRandomCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function Captcha({ onValidate, error }: CaptchaProps) {
  const [captchaCode, setCaptchaCode] = useState(() => createRandomCaptcha());
  const [userInput, setUserInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Genera un código alfanumérico legible de 5 caracteres
  const generateCaptcha = () => {
    setCaptchaCode(createRandomCaptcha());
    setUserInput("");
    setIsVerified(false);
    onValidate(false);
  };

  const handleInputChange = (val: string) => {
    const cleanVal = val.toUpperCase().trim();
    setUserInput(cleanVal);
    if (cleanVal === captchaCode) {
      setIsVerified(true);
      onValidate(true);
    } else {
      setIsVerified(false);
      onValidate(false);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Verificación de Seguridad (Anti-Spam)
        </label>
        
        <button
          type="button"
          onClick={generateCaptcha}
          className="text-xs text-blue-700 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline focus:outline-none"
          title="Generar nuevo código"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Cambiar código
        </button>
      </div>

      {/* Contenedor del código visual protegido */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
        <div 
          className="flex-shrink-0 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 px-4 py-2 sm:py-2.5 rounded-xl text-white font-mono text-lg sm:text-xl font-extrabold tracking-widest select-none shadow-inner border border-blue-950 flex items-center justify-center gap-1.5"
          style={{ letterSpacing: "0.25em" }}
          aria-label={`Código de seguridad: ${captchaCode.split("").join(" ")}`}
        >
          {captchaCode.split("").map((ch, idx) => (
            <span 
              key={idx} 
              className="inline-block transform"
              style={{
                transform: `rotate(${(idx % 2 === 0 ? 1 : -1) * (idx * 3 + 2)}deg)`,
                opacity: 0.95
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        <div className="flex-grow min-w-0 relative">
          <input
            type="text"
            required
            maxLength={5}
            value={userInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Escribí el código"
            className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-sm uppercase font-mono tracking-wider text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              isVerified
                ? "border-green-500 focus:ring-green-400"
                : "border-slate-300 focus:ring-blue-700"
            }`}
          />
          {isVerified && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 flex items-center gap-1 text-xs font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </div>
      </div>

      {error && !isVerified && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2" role="alert">
          <svg className="w-4 h-4 text-blue-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <p className="text-[11px] text-slate-500 leading-tight">
        Requerido para prevenir registros y accesos automatizados según las normas de seguridad.
      </p>
    </div>
  );
}
