"use client";

import Link from "next/link";
import { useState, useEffect, useSyncExternalStore } from "react";
import { Mountain, Home, CloudRain, Sun, Moon, ChevronDown, Menu, X } from "lucide-react";

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

function subscribeAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("authChanged", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("authChanged", callback);
  };
}

function getAuthSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("esquel_current_user");
}

function getAuthServerSnapshot(): boolean {
  return false;
}

export default function Navbar() {
  const [showCities, setShowCities] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthServerSnapshot);
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
    <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          {/* Logo institucional */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Mountain className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-black text-base sm:text-xl tracking-tight text-blue-700 dark:text-sky-400 leading-tight whitespace-nowrap">
                Esquel <span className="text-sky-500 font-semibold">Conectado</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold whitespace-nowrap">
                Portal Comarcal
              </span>
            </div>
          </Link>

          {/* 5 Accesos Principales (Desktop) */}
          <div className="hidden xl:flex items-center space-x-6 text-sm">
            <Link
              href="/"
              className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-400 font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/empleos"
              className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-400 font-medium transition-colors"
            >
              Empleos
            </Link>
            <Link
              href="/eventos"
              className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-400 font-medium transition-colors"
            >
              Eventos
            </Link>

            {/* Dropdown Ciudades */}
            <div className="relative">
              <button
                onClick={() => setShowCities(!showCities)}
                className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-400 font-medium transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
              >
                Ciudades
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showCities ? 'rotate-180 text-blue-700 dark:text-sky-400' : ''}`} />
              </button>
              {showCities && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-xl py-2 border border-slate-100 dark:border-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                    Comarca Andina
                  </div>
                  {cities.map(city => (
                    <Link
                      key={city}
                      href={`/empleos?city=${encodeURIComponent(city)}`}
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-sky-400 transition-colors"
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
              className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-400 font-medium transition-colors"
            >
              Refugios/Comercios
            </Link>

            <Link
              href="/hospedajes"
              className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-400 font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" /> Hospedajes
            </Link>

            <Link
              href="/clima"
              className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <CloudRain className="w-4 h-4" /> Clima / Rutas
            </Link>
          </div>

          {/* Switch Modo Oscuro / Claro, Mi Cuenta & Toggle Móvil */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Switch Modo Oscuro / Claro */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all shadow-xs cursor-pointer flex items-center justify-center text-xs font-bold gap-1.5"
              title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              aria-label={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              {isDarkMode ? <Moon className="w-3.5 h-3.5 text-amber-400 stroke-[2.2]" /> : <Sun className="w-3.5 h-3.5 text-amber-500 stroke-[2.2]" />}
              <span className="hidden sm:inline">
                {isDarkMode ? "Oscuro" : "Claro"}
              </span>
            </button>

            <Link
              href={isLoggedIn ? "/perfil" : "/login"}
              className="bg-blue-700 hover:bg-blue-800 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all duration-150 active:scale-95 whitespace-nowrap"
            >
              {isLoggedIn ? "Mi Perfil" : "Ingresar"}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-700 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 shadow-lg transition-colors">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-sky-400 font-medium text-sm"
          >
            Inicio
          </Link>
          <Link
            href="/empleos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-sky-400 font-medium text-sm"
          >
            Empleos
          </Link>
          <Link
            href="/eventos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-sky-400 font-medium text-sm"
          >
            Eventos
          </Link>
          <Link
            href="/comercios"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-sky-400 font-medium text-sm"
          >
            Refugios/Comercios
          </Link>
          <Link
            href="/hospedajes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-sky-400 font-medium text-sm"
          >
            <Home className="w-4 h-4 text-blue-600 dark:text-sky-400" /> Hospedajes
          </Link>
          <Link
            href="/clima"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 font-semibold text-sm"
          >
            <CloudRain className="w-4 h-4" /> Clima / Rutas
          </Link>
          {/* Control de Modo Oscuro / Claro en Móviles */}
          <div className="pt-3 pb-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-3">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Tema visual: <strong className="text-slate-800 dark:text-slate-200">{isDarkMode ? "Oscuro" : "Claro"}</strong>
            </span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-amber-300 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 stroke-[2.2]" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-400 stroke-[2.2]" />
                  <span>Modo Oscuro</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="block px-3 py-1 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Comarca Andina
            </span>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {cities.map(city => (
                <Link
                  key={city}
                  href={`/empleos?city=${encodeURIComponent(city)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-sky-400 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/60"
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
