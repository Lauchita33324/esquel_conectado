export interface ForecastDay {
  day: string;
  date: string;
  icon: string;
  high: number;
  low: number;
  condition: string;
  rainProb: string;
}

export interface CityWeather {
  id: string;
  city: string;
  region: string;
  temp: number;
  feelsLike: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
  windSpeed: string;
  windDirection: string;
  humidity: string;
  uvIndex: string;
  pressure: string;
  visibility: string;
  airQuality: string;
  forecast: ForecastDay[];
  mountainReport?: {
    location: string;
    baseSnow: string;
    topSnow: string;
    openTracks: string;
    liftsStatus: string;
    temperature: string;
  };
}

export interface RoadCondition {
  id: string;
  route: string;
  section: string;
  status: "Habilitado" | "Precaución" | "Cadenas Obligatorias" | "Cerrado";
  type: "Nacional" | "Provincial" | "Paso Fronterizo" | "Acceso Cerro";
  description: string;
  lastUpdated: string;
}

export function buildDynamicForecast(
  patterns: Array<{ icon: string; high: number; low: number; condition: string; rainProb: string }>
): ForecastDay[] {
  const now = new Date();
  return patterns.map((p, idx) => {
    const targetDate = new Date(now.getTime() + idx * 86400000);
    const shortDay = new Intl.DateTimeFormat("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      weekday: "short",
    }).format(targetDate);
    const dayNum = new Intl.DateTimeFormat("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      day: "numeric",
    }).format(targetDate);
    const fullDay = new Intl.DateTimeFormat("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      weekday: "long",
    }).format(targetDate);

    const formattedShort = shortDay.charAt(0).toUpperCase() + shortDay.slice(1).replace(".", "");
    const formattedFull = fullDay.charAt(0).toUpperCase() + fullDay.slice(1);

    return {
      day: idx === 0 ? "Hoy" : formattedFull,
      date: `${formattedShort} ${dayNum}`,
      icon: p.icon,
      high: p.high,
      low: p.low,
      condition: p.condition,
      rainProb: p.rainProb,
    };
  });
}

const mockWeatherCities: CityWeather[] = [
  {
    id: "w-esquel",
    city: "Esquel",
    region: "Chubut & Cordillera",
    temp: 14,
    feelsLike: 13,
    condition: "Despejado",
    icon: "☀️",
    high: 16,
    low: 4,
    windSpeed: "15 km/h",
    windDirection: "Oeste",
    humidity: "45%",
    uvIndex: "5 (Moderado)",
    pressure: "1015 hPa",
    visibility: "10 km",
    airQuality: "Excelente (12 AQI)",
    forecast: [
      { day: "Hoy", date: "Mié 7", icon: "☀️", high: 16, low: 4, condition: "Soleado", rainProb: "5%" },
      { day: "Jueves", date: "Jue 8", icon: "🌤️", high: 17, low: 5, condition: "Algo nublado", rainProb: "10%" },
      { day: "Viernes", date: "Vie 9", icon: "⛅", high: 15, low: 3, condition: "Parcialmente nublado", rainProb: "20%" },
      { day: "Sábado", date: "Sáb 10", icon: "🌧️", high: 12, low: 2, condition: "Lluvias aisladas", rainProb: "60%" },
      { day: "Domingo", date: "Dom 11", icon: "☀️", high: 14, low: 3, condition: "Soleado", rainProb: "0%" },
    ],
    mountainReport: {
      location: "Centro de Esquí La Hoya",
      baseSnow: "35 cm",
      topSnow: "110 cm",
      openTracks: "24 de 30 pistas",
      liftsStatus: "Medios operando normalmente",
      temperature: "2°C en Cumbre",
    }
  },
  {
    id: "w-trevelin",
    city: "Trevelin",
    region: "Valle 16 de Octubre",
    temp: 15,
    feelsLike: 15,
    condition: "Soleado",
    icon: "☀️",
    high: 17,
    low: 5,
    windSpeed: "12 km/h",
    windDirection: "Suroeste",
    humidity: "48%",
    uvIndex: "5 (Moderado)",
    pressure: "1016 hPa",
    visibility: "10 km",
    airQuality: "Excelente (10 AQI)",
    forecast: [
      { day: "Hoy", date: "Mié 7", icon: "☀️", high: 17, low: 5, condition: "Soleado", rainProb: "0%" },
      { day: "Jueves", date: "Jue 8", icon: "☀️", high: 18, low: 6, condition: "Despejado", rainProb: "5%" },
      { day: "Viernes", date: "Vie 9", icon: "🌤️", high: 16, low: 4, condition: "Algo nublado", rainProb: "15%" },
      { day: "Sábado", date: "Sáb 10", icon: "🌧️", high: 13, low: 3, condition: "Chubascos", rainProb: "55%" },
      { day: "Domingo", date: "Dom 11", icon: "☀️", high: 15, low: 4, condition: "Despejado", rainProb: "0%" },
    ]
  },
  {
    id: "w-puelo",
    city: "Lago Puelo",
    region: "Parque Nacional & Comarca",
    temp: 17,
    feelsLike: 17,
    condition: "Parcialmente Soleado",
    icon: "🌤️",
    high: 19,
    low: 6,
    windSpeed: "10 km/h",
    windDirection: "Sur",
    humidity: "52%",
    uvIndex: "6 (Alto)",
    pressure: "1014 hPa",
    visibility: "10 km",
    airQuality: "Excelente (8 AQI)",
    forecast: [
      { day: "Hoy", date: "Mié 7", icon: "🌤️", high: 19, low: 6, condition: "Agradable", rainProb: "5%" },
      { day: "Jueves", date: "Jue 8", icon: "☀️", high: 20, low: 7, condition: "Soleado", rainProb: "0%" },
      { day: "Viernes", date: "Vie 9", icon: "⛅", high: 18, low: 5, condition: "Nublado", rainProb: "25%" },
      { day: "Sábado", date: "Sáb 10", icon: "🌧️", high: 14, low: 4, condition: "Lluvias", rainProb: "70%" },
      { day: "Domingo", date: "Dom 11", icon: "🌤️", high: 16, low: 5, condition: "Mejorando", rainProb: "10%" },
    ]
  },
  {
    id: "w-bolson",
    city: "El Bolsón",
    region: "Río Negro & Comarca",
    temp: 18,
    feelsLike: 18,
    condition: "Despejado",
    icon: "☀️",
    high: 20,
    low: 7,
    windSpeed: "12 km/h",
    windDirection: "Oeste",
    humidity: "42%",
    uvIndex: "6 (Alto)",
    pressure: "1013 hPa",
    visibility: "10 km",
    airQuality: "Excelente (11 AQI)",
    forecast: [
      { day: "Hoy", date: "Mié 7", icon: "☀️", high: 20, low: 7, condition: "Cálido y soleado", rainProb: "0%" },
      { day: "Jueves", date: "Jue 8", icon: "☀️", high: 21, low: 8, condition: "Soleado", rainProb: "0%" },
      { day: "Viernes", date: "Vie 9", icon: "🌤️", high: 19, low: 6, condition: "Poca nubosidad", rainProb: "15%" },
      { day: "Sábado", date: "Sáb 10", icon: "🌧️", high: 15, low: 4, condition: "Lluvias moderadas", rainProb: "65%" },
      { day: "Domingo", date: "Dom 11", icon: "☀️", high: 17, low: 5, condition: "Despejado", rainProb: "5%" },
    ]
  },
  {
    id: "w-hoyo",
    city: "El Hoyo",
    region: "Capital de la Fruta Fina",
    temp: 17,
    feelsLike: 17,
    condition: "Soleado",
    icon: "☀️",
    high: 19,
    low: 6,
    windSpeed: "11 km/h",
    windDirection: "Oeste",
    humidity: "46%",
    uvIndex: "6 (Alto)",
    pressure: "1014 hPa",
    visibility: "10 km",
    airQuality: "Excelente (9 AQI)",
    forecast: [
      { day: "Hoy", date: "Mié 7", icon: "☀️", high: 19, low: 6, condition: "Soleado", rainProb: "0%" },
      { day: "Jueves", date: "Jue 8", icon: "☀️", high: 20, low: 7, condition: "Agradable", rainProb: "0%" },
      { day: "Viernes", date: "Vie 9", icon: "🌤️", high: 18, low: 5, condition: "Algo nublado", rainProb: "10%" },
      { day: "Sábado", date: "Sáb 10", icon: "🌧️", high: 14, low: 3, condition: "Chubascos", rainProb: "60%" },
      { day: "Domingo", date: "Dom 11", icon: "☀️", high: 16, low: 4, condition: "Soleado", rainProb: "0%" },
    ]
  },
  {
    id: "w-epuyen",
    city: "Epuyén",
    region: "Lago & Bosque Nativo",
    temp: 16,
    feelsLike: 16,
    condition: "Despejado",
    icon: "☀️",
    high: 18,
    low: 5,
    windSpeed: "13 km/h",
    windDirection: "Suroeste",
    humidity: "49%",
    uvIndex: "5 (Moderado)",
    pressure: "1015 hPa",
    visibility: "10 km",
    airQuality: "Excelente (7 AQI)",
    forecast: [
      { day: "Hoy", date: "Mié 7", icon: "☀️", high: 18, low: 5, condition: "Soleado", rainProb: "0%" },
      { day: "Jueves", date: "Jue 8", icon: "☀️", high: 19, low: 6, condition: "Despejado", rainProb: "0%" },
      { day: "Viernes", date: "Vie 9", icon: "⛅", high: 17, low: 4, condition: "Parcialmente nublado", rainProb: "20%" },
      { day: "Sábado", date: "Sáb 10", icon: "🌧️", high: 13, low: 2, condition: "Lluvias", rainProb: "65%" },
      { day: "Domingo", date: "Dom 11", icon: "☀️", high: 15, low: 3, condition: "Soleado", rainProb: "0%" },
    ]
  },
  {
    id: "w-cholila",
    city: "Cholila",
    region: "Valle & Pesca Deportiva",
    temp: 16,
    feelsLike: 15,
    condition: "Soleado",
    icon: "☀️",
    high: 18,
    low: 4,
    windSpeed: "14 km/h",
    windDirection: "Oeste",
    humidity: "44%",
    uvIndex: "5 (Moderado)",
    pressure: "1016 hPa",
    visibility: "10 km",
    airQuality: "Excelente (8 AQI)",
    forecast: [
      { day: "Hoy", date: "Mié 7", icon: "☀️", high: 18, low: 4, condition: "Soleado", rainProb: "0%" },
      { day: "Jueves", date: "Jue 8", icon: "☀️", high: 19, low: 5, condition: "Despejado", rainProb: "0%" },
      { day: "Viernes", date: "Vie 9", icon: "🌤️", high: 16, low: 3, condition: "Poca nubosidad", rainProb: "15%" },
      { day: "Sábado", date: "Sáb 10", icon: "🌧️", high: 12, low: 2, condition: "Lluvias breves", rainProb: "55%" },
      { day: "Domingo", date: "Dom 11", icon: "☀️", high: 15, low: 3, condition: "Soleado", rainProb: "0%" },
    ]
  },
  {
    id: "w-maiten",
    city: "El Maitén",
    region: "Capital de La Trochita",
    temp: 15,
    feelsLike: 14,
    condition: "Despejado",
    icon: "☀️",
    high: 17,
    low: 3,
    windSpeed: "18 km/h",
    windDirection: "Oeste",
    humidity: "40%",
    uvIndex: "5 (Moderado)",
    pressure: "1017 hPa",
    visibility: "10 km",
    airQuality: "Excelente (10 AQI)",
    forecast: [
      { day: "Hoy", date: "Mié 7", icon: "☀️", high: 17, low: 3, condition: "Soleado y ventoso", rainProb: "0%" },
      { day: "Jueves", date: "Jue 8", icon: "☀️", high: 18, low: 4, condition: "Despejado", rainProb: "0%" },
      { day: "Viernes", date: "Vie 9", icon: "🌤️", high: 16, low: 3, condition: "Algo nublado", rainProb: "10%" },
      { day: "Sábado", date: "Sáb 10", icon: "🌧️", high: 12, low: 1, condition: "Inestable", rainProb: "50%" },
      { day: "Domingo", date: "Dom 11", icon: "☀️", high: 14, low: 2, condition: "Soleado", rainProb: "0%" },
    ]
  }
];

const mockRoads: RoadCondition[] = [
  {
    id: "rc-1",
    route: "Ruta Nacional 259",
    section: "Paso Internacional Futaleufú (Trevelin - Chile)",
    type: "Paso Fronterizo",
    status: "Habilitado",
    description: "Operando con normalidad de 08:00 a 19:00 hs. Documentación personal y de vehículo al día.",
    lastUpdated: "Datos demostrativos (Horario habitual 08 a 19 hs)"
  },
  {
    id: "rc-2",
    route: "Ruta Provincial 15",
    section: "Camino de Acceso al Centro de Esquí La Hoya (Km 0 a 12)",
    type: "Acceso Cerro",
    status: "Precaución",
    description: "Transitable con precaución. Sombra en sectores altos. Portación obligatoria de cadenas.",
    lastUpdated: "Datos demostrativos de temporada"
  },
  {
    id: "rc-3",
    route: "Ruta Nacional 40",
    section: "Tramo Esquel ↔ El Bolsón (Leleque - El Hoyo)",
    type: "Nacional",
    status: "Habilitado",
    description: "Tránsito fluido. Obras de mantenimiento preventivo en banquinas entre Km 1890 y 1910.",
    lastUpdated: "Datos de muestra de referencia comarcal"
  },
  {
    id: "rc-4",
    route: "Ruta Nacional 259",
    section: "Tramo Esquel ↔ Trevelin",
    type: "Nacional",
    status: "Habilitado",
    description: "Asfalto en excelente estado, visibilidad óptima.",
    lastUpdated: "Datos de muestra de referencia comarcal"
  },
  {
    id: "rc-5",
    route: "Ruta Provincial 44",
    section: "Paso Internacional Río Encuentro (Carrenleufú)",
    type: "Paso Fronterizo",
    status: "Habilitado",
    description: "Paso fronterizo habilitado de 08:00 a 20:00 hs.",
    lastUpdated: "Datos demostrativos (Horario habitual 08 a 20 hs)"
  },
  {
    id: "rc-6",
    route: "Ruta Provincial 71",
    section: "Tramo Parque Nacional Los Alerces (Portada Norte a Portada Sur)",
    type: "Provincial",
    status: "Precaución",
    description: "Camino de ripio consolidado. Respetar límites de velocidad de 40 km/h por fauna autóctona.",
    lastUpdated: "Datos demostrativos de referencia"
  }
];

export const weatherService = {
  getWeatherByCity: async (cityId?: string): Promise<CityWeather[]> => {
    return mockWeatherCities.map((cw) => ({
      ...cw,
      forecast: buildDynamicForecast(
        cw.forecast.map((f) => ({
          icon: f.icon,
          high: f.high,
          low: f.low,
          condition: f.condition,
          rainProb: f.rainProb,
        }))
      ),
    }));
  },

  getRoadConditions: async (): Promise<RoadCondition[]> => {
    return mockRoads;
  }
};
