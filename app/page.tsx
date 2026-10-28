"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MidSection from "../components/MidSection";
import { dbService } from "../services/database";

export default function Home() {
  // Inicializamos la base de datos simulada en el cliente
  useEffect(() => {
    dbService.initStorage();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Navbar fija con los 5 accesos */}
      <Navbar />

      {/* Pantalla principal con foto panorámica, títulos y tarjetones */}
      <main className="flex-grow">
        <HeroSection />

        {/* 2 Columnas: Calendario de Eventos y Mapa Interactivo */}
        <MidSection />
      </main>

      {/* Footer Institucional */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-blue-700">
              Esquel <span className="text-sky-500 font-medium">Conectado</span>
            </span>
            <span className="text-xs text-slate-600 font-medium mt-0.5">
              Plataforma digital para Esquel y la Comarca Andina del Paralelo 42
            </span>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            &copy; {new Date().getFullYear()} Esquel Conectado. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
