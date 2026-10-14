"use client";

import Navbar from "../../components/Navbar";
import { FcSearch, FcIdea, FcLineChart } from "react-icons/fc";

export default function ComparadorPage() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center justify-center gap-3">
            <FcLineChart className="text-5xl" />
            Comparador de Precios y Servicios
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Analiza y compara los mejores precios de comercios y servicios en Esquel. 
            Próximamente integrado con <span className="text-blue-600 font-bold">OpenAI</span> para recomendaciones inteligentes.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FcSearch className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Busca Productos</h3>
            <p className="text-slate-500">Ingresa el nombre del producto o servicio que estás buscando en la ciudad.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <FcIdea className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">IA Sugerida</h3>
            <p className="text-slate-500">Nuestra IA analiza las tendencias para decirte cuál es el mejor momento para comprar.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Ahorra Tiempo</h3>
            <p className="text-slate-500">No recorras toda la ciudad, encuentra todo desde un solo lugar.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-12">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">¿Qué quieres comparar hoy?</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Ej: Kilo de asado, Cambio de aceite..." 
                className="flex-grow px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-200">
                Comparar
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Estamos recolectando datos de los comercios adheridos para brindarte la información más precisa.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-slate-200 py-8 text-center">
        <p className="text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} Esquel Conectado. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}
