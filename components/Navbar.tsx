"use client";

import Link from "next/link";
import { useState, useEffect, useSyncExternalStore } from "react";
import { FcLandscape } from "react-icons/fc";
import { dbService } from "../services/database";

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("themeChanged", callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("themeChanged", callback);
    media.removeEventListener("change", callback);
  };
}

function getThemeSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem("theme");
  if (saved) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export default function Navbar() {
  const [showCities, setShowCities] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDarkMode = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);
  const cities = ["Esquel", "Trevelin", "Lago Puelo", "El Bolsón", "El Hoyo", "Epuyén", "Cholila", "El Maitén"];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const next = !isDarkMode;
    localStorage.setItem("theme", next ? "dark" : "light");
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.dispatchEvent(new Event("themeChanged"));
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          {/* Logo institucional */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-100 transition-colors shrink-0">
              <FcLandscape className="text-xl sm:text-2xl" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-blue-700 leading-tight truncate">
                Esquel <span className="text-sky-500 font-medium">Conectado</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                Portal Comarcal
              </span>
            </div>
          </Link>

          {/* 5 Accesos Principales (Desktop) */}
          <div className="hidden md:flex items-center space-x-7">
            <Link
              href="/"
              className="text-slate-700 hover:text-blue-700 font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/empleos"
              className="text-slate-700 hover:text-blue-700 font-medium transition-colors"
            >
              Empleos
            </Link>
            <Link
              href="/eventos"
              className="text-slate-700 hover:text-blue-700 font-medium transition-colors"
            >
              Eventos
            </Link>

            {/* Dropdown Ciudades */}
            <div className="relative">
              <button
                onClick={() => setShowCities(!showCities)}
                className="text-slate-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1.5 focus:outline-none"
              >
                Ciudades
                <svg className={`w-4 h-4 transition-transform duration-200 ${showCities ? 'rotate-180 text-blue-700' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCities && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Comarca Andina
                  </div>
                  {cities.map(city => (
                    <Link
                      key={city}
                      href={`/empleos?city=${encodeURIComponent(city)}`}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      onClick={() => setShowCities(false)}
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/comercios"
              className="text-slate-700 hover:text-blue-700 font-medium transition-colors"
            >
              Refugios/Comercios
            </Link>

            <Link
              href="/hospedajes"
              className="text-slate-700 hover:text-blue-700 font-medium transition-colors font-bold text-blue-700"
            >
              🏡 Hospedajes
            </Link>

            <Link
              href="/clima"
              className="text-slate-700 hover:text-blue-700 font-medium transition-colors font-bold text-sky-600 dark:text-sky-400"
            >
              🌤️ Clima / Rutas
            </Link>
          </div>

          {/* Switch Modo Oscuro / Claro, Mi Cuenta & Toggle Móvil */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Switch Modo Oscuro / Claro */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all shadow-xs cursor-pointer flex items-center justify-center text-xs font-extrabold"
              title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              aria-label={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              <span>{isDarkMode ? "🌙" : "☀️"}</span>
              <span className="hidden sm:inline ml-1.5">
                {isDarkMode ? "Oscuro" : "Claro"}
              </span>
            </button>

            <Link
              href={dbService.getCurrentUser() ? "/perfil" : "/login"}
              className="bg-blue-700 hover:bg-blue-800 text-white px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all duration-150 active:scale-95 whitespace-nowrap"
            >
              {dbService.getCurrentUser() ? "Mi Perfil" : "Ingresar"}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Menú principal"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
          >
            Inicio
          </Link>
          <Link
            href="/empleos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
          >
            Empleos
          </Link>
          <Link
            href="/eventos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
          >
            Eventos
          </Link>
          <Link
            href="/comercios"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
          >
            Refugios/Comercios
          </Link>
          <Link
            href="/hospedajes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-50 font-bold"
          >
            🏡 Hospedajes
          </Link>
          <Link
            href="/clima"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sky-600 hover:bg-sky-50 font-bold"
          >
            🌤️ Clima / Rutas
          </Link>
          {/* Control de Modo Oscuro / Claro en Móviles */}
          <div className="pt-3 pb-1 border-t border-slate-100 flex items-center justify-between px-3">
            <span className="text-xs font-semibold text-slate-600">
              Tema visual: <strong className="text-slate-800">{isDarkMode ? "Oscuro" : "Claro"}</strong>
            </span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-amber-300 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <span>{isDarkMode ? "☀️ Cambiar a Claro" : "🌙 Cambiar a Oscuro"}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="block px-3 py-1 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Comarca Andina
            </span>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {cities.map(city => (
                <Link
                  key={city}
                  href={`/empleos?city=${encodeURIComponent(city)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 text-sm text-slate-600 hover:text-blue-700"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
