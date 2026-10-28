export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  type: "commerce" | "technician" | "other";
  category?: string;
  city?: string;
  address?: string;
  phone?: string;
  hours?: string;
  rating?: number;
}


export interface Event {
  id: string;
  title: string;
  time: string;
  locationName: string;
  date: string;
  description: string;
  lat: number;
  lng: number;
  city?: string;
  category?: string;
  organizerEmail?: string;
  endDate?: string;
}


export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyPhotoPlaceholder: string;
  companyLogo?: string; // Imagen o Logo en Base64 o URL del Comercio / Empresa
  description: string;
  city: string;
  authorId?: string; // ID del usuario que lo publicó
  province?: string; // Chubut, Río Negro, etc.
  category?: string; // Gastronomía, Comercio, Tecnología, etc.
  employmentType?: string; // Jornada Completa, Part-time, Temporada, Remoto / Híbrido
  salary?: string;
  contactEmail?: string;
  createdAt?: string;
}

export interface DirectMessage {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  senderName: string;
  senderEmail: string;
  message: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  role?: "Usuario" | "Empleador" | "Admin";
  companyName?: string;
  cuit?: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  date: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: "Cabaña" | "Hostería" | "Hotel" | "Hostel" | "Apart Hotel" | "Camping & Glamping";
  city: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  description: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  rating?: number;
  lat: number;
  lng: number;
  amenities: string[];
  photo?: string;
  verified?: boolean;
}

// Datos simulados por defecto
const initialLocations: Location[] = [
  {
    id: "1",
    name: "Don Chiquino Pastas Artesanales",
    lat: -42.912,
    lng: -71.319,
    description: "Restaurante emblemático de Esquel especializado en pastas caseras, salsas de hongos y cocina patagónica.",
    type: "commerce",
    category: "Gastronomía",
    city: "Esquel",
    address: "Ameghino 1640, Esquel",
    phone: "+54 2945 450012",
    hours: "12:00 - 15:30 / 20:00 - 00:00 HS",
    rating: 4.8
  },
  {
    id: "2",
    name: "Café Patagonia & Repostería",
    lat: -42.915,
    lng: -71.317,
    description: "Cafetería de especialidad con alfajores artesanales, tortas galesas y chocolates cordilleranos.",
    type: "commerce",
    category: "Gastronomía",
    city: "Esquel",
    address: "25 de Mayo 520, Esquel",
    phone: "+54 2945 451122",
    hours: "08:00 - 21:00 HS",
    rating: 4.7
  },
  {
    id: "3",
    name: "Refugio de Montaña La Hoya",
    lat: -42.833,
    lng: -71.266,
    description: "Refugio y parador gastronómico en la base del Centro de Esquí La Hoya. Comidas calientes y alquiler de equipos.",
    type: "commerce",
    category: "Refugio y Montaña",
    city: "Esquel",
    address: "Camino a La Hoya Km 12",
    phone: "+54 2945 452919",
    hours: "09:00 - 18:00 HS",
    rating: 4.9
  },
  {
    id: "4",
    name: "Casa de Té Galés Nain Nain",
    lat: -43.085,
    lng: -71.463,
    description: "Tradicional casa de té galés en el corazón de Trevelin, con repostería típica y licores regionales.",
    type: "commerce",
    category: "Gastronomía y Cultura",
    city: "Trevelin",
    address: "Av. San Martín 450, Trevelin",
    phone: "+54 2945 480101",
    hours: "15:00 - 21:00 HS",
    rating: 4.9
  },
  {
    id: "5",
    name: "Refugio del Bosque Lago Puelo",
    lat: -42.062,
    lng: -71.595,
    description: "Refugio gastronómico y parador frente al Parque Nacional Lago Puelo. Alquiler de kayaks y excursiones.",
    type: "commerce",
    category: "Refugio y Montaña",
    city: "Lago Puelo",
    address: "Av. Los Arrayanes s/n, Lago Puelo",
    phone: "+54 2944 499112",
    hours: "10:00 - 20:00 HS",
    rating: 4.8
  },
  {
    id: "6",
    name: "Chocolatería y Regionales El Bolsón",
    lat: -41.966,
    lng: -71.535,
    description: "Elaboración de chocolates artesanales, dulces de frutos cordilleranos y cerveza artesanal comarcal.",
    type: "commerce",
    category: "Comercio Regional",
    city: "El Bolsón",
    address: "Av. San Martín 1820, El Bolsón",
    phone: "+54 2944 492340",
    hours: "09:00 - 22:00 HS",
    rating: 4.7
  },
  {
    id: "7",
    name: "Electro Reparaciones Esquel",
    lat: -42.910,
    lng: -71.320,
    description: "Servicio técnico especializado en electrodomésticos, heladeras, lavarropas y microondas.",
    type: "technician",
    category: "Servicio Técnico",
    city: "Esquel",
    address: "Rivadavia 850, Esquel",
    phone: "+54 2945 453300",
    hours: "09:00 - 18:00 HS",
    rating: 4.6
  },
  {
    id: "8",
    name: "PC Clinic & Soporte IT",
    lat: -42.918,
    lng: -71.315,
    description: "Servicio técnico de computadoras, notebook, redes e instalación de sistemas en locales comerciales.",
    type: "technician",
    category: "Servicio Técnico",
    city: "Esquel",
    address: "Fontana 430, Esquel",
    phone: "+54 2945 454488",
    hours: "09:00 - 19:00 HS",
    rating: 4.8
  }
];


// Helper para generar fechas futuras de demostración relativas a la fecha actual
const getDemoFutureDate = (daysAhead: number, hours: number = 18, minutes: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + Math.max(1, daysAhead));
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

const initialEvents: Event[] = [
  // --- Esquel ---
  {
    id: "ev-esq-1",
    title: "Feria de Artesanos y Productores Locales (Demo)",
    time: "10:00 - 19:00 HS",
    locationName: "Plaza San Martín (Espacio Demo), Esquel",
    date: getDemoFutureDate(0, 19, 0), // Hoy
    endDate: getDemoFutureDate(0, 22, 0),
    description: "[Evento Demostrativo] Puestos de diseño textil, cuchillería, cerámica y dulces patagónicos en la plaza central de Esquel.",
    lat: -42.914,
    lng: -71.318,
    city: "Esquel",
    category: "Ferias y Paseos",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },
  {
    id: "ev-esq-2",
    title: "Noche de Música Acústica y Jazz Cordillerano (Demo)",
    time: "21:30 HS",
    locationName: "Centro Melipal (Auditorio Demo), Esquel",
    date: getDemoFutureDate(3, 21, 30),
    endDate: getDemoFutureDate(3, 23, 45),
    description: "[Evento Demostrativo] Concierto de ensambles acústicos locales y buffet con productos regionales de muestra.",
    lat: -42.916,
    lng: -71.312,
    city: "Esquel",
    category: "Música y Conciertos",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },

  // --- Trevelin ---
  {
    id: "ev-tre-1",
    title: "Encuentro Comarcal de Té y Repostería Galesa (Demo)",
    time: "15:00 - 20:00 HS",
    locationName: "Paseo de la Costanera (Espacio Demo), Trevelin",
    date: getDemoFutureDate(1, 15, 0),
    endDate: getDemoFutureDate(1, 20, 0),
    description: "[Evento Demostrativo] Degustaciones de torta negra galesa, panes caseros y muestra de danzas típicas.",
    lat: -43.085,
    lng: -71.463,
    city: "Trevelin",
    category: "Cultura y Turismo",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },
  {
    id: "ev-tre-2",
    title: "Circuito Guiado de Fotografía y Naturaleza (Demo)",
    time: "09:30 HS",
    locationName: "Valle de Trevelin (Punto de Encuentro Demo)",
    date: getDemoFutureDate(4, 9, 30),
    endDate: getDemoFutureDate(4, 13, 0),
    description: "[Evento Demostrativo] Recorrido fotográfico matutino por senderos y miradores del valle cordillerano.",
    lat: -43.088,
    lng: -71.460,
    city: "Trevelin",
    category: "Cultura y Turismo",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },

  // --- Lago Puelo ---
  {
    id: "ev-pue-1",
    title: "Jornada Náutica y Cuidado de Humedales (Demo)",
    time: "11:00 - 18:00 HS",
    locationName: "Parque Nacional (Zona Costera Demo), Lago Puelo",
    date: getDemoFutureDate(2, 11, 0),
    endDate: getDemoFutureDate(2, 18, 0),
    description: "[Evento Demostrativo] Actividades recreativas en kayak sin motor y charlas breves sobre flora nativa lacustre.",
    lat: -42.062,
    lng: -71.595,
    city: "Lago Puelo",
    category: "Deportes",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },
  {
    id: "ev-pue-2",
    title: "Feria Agroecológica y Plantas Nativas (Demo)",
    time: "14:00 - 19:00 HS",
    locationName: "Plaza Central (Espacio Demo), Lago Puelo",
    date: getDemoFutureDate(5, 14, 0),
    endDate: getDemoFutureDate(5, 19, 0),
    description: "[Evento Demostrativo] Puestos de hortalizas orgánicas, plantines nativos y biofertilizantes de la Comarca.",
    lat: -42.059,
    lng: -71.598,
    city: "Lago Puelo",
    category: "Ferias y Paseos",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },

  // --- El Bolsón ---
  {
    id: "ev-bol-1",
    title: "Feria de Diseñadores y Creadores Andinos (Demo)",
    time: "10:30 - 18:30 HS",
    locationName: "Plaza Pagano (Paseo Demo), El Bolsón",
    date: getDemoFutureDate(1, 10, 30),
    endDate: getDemoFutureDate(1, 18, 30),
    description: "[Evento Demostrativo] Muestra de indumentaria en lana de oveja, cerámica artística y vitrofusión comarcal.",
    lat: -41.966,
    lng: -71.535,
    city: "El Bolsón",
    category: "Ferias y Paseos",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },
  {
    id: "ev-bol-2",
    title: "Peña de Canto y Folklore Cordillerano (Demo)",
    time: "21:00 HS",
    locationName: "Salón Comunitario (Espacio Demo), El Bolsón",
    date: getDemoFutureDate(6, 21, 0),
    endDate: getDemoFutureDate(6, 23, 59),
    description: "[Evento Demostrativo] Presentación de solistas y grupos de danza tradicional con menú criollo de prueba.",
    lat: -41.962,
    lng: -71.531,
    city: "El Bolsón",
    category: "Música y Conciertos",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },

  // --- El Hoyo ---
  {
    id: "ev-hoy-1",
    title: "Muestra de Dulces y Fruta Fina de Estación (Demo)",
    time: "11:00 - 17:30 HS",
    locationName: "Predio de la Fruta Fina (Espacio Demo), El Hoyo",
    date: getDemoFutureDate(2, 11, 0),
    endDate: getDemoFutureDate(2, 17, 30),
    description: "[Evento Demostrativo] Elaboración en vivo de mermeladas de frambuesa, moras y conservas artesanales.",
    lat: -42.065,
    lng: -71.518,
    city: "El Hoyo",
    category: "Ferias y Paseos",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },
  {
    id: "ev-hoy-2",
    title: "Trekking Familiar hacia la Cascada Corbata (Demo)",
    time: "10:00 HS",
    locationName: "Acceso a Senderos (Punto de Salida Demo), El Hoyo",
    date: getDemoFutureDate(7, 10, 0),
    endDate: getDemoFutureDate(7, 13, 30),
    description: "[Evento Demostrativo] Caminata guiada de baja dificultad apta para todas las edades por el bosque nativo.",
    lat: -42.058,
    lng: -71.505,
    city: "El Hoyo",
    category: "Deportes",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },

  // --- Epuyén ---
  {
    id: "ev-epu-1",
    title: "Encuentro de Kayakistas y Remeros del Lago (Demo)",
    time: "10:30 - 16:00 HS",
    locationName: "Puerto Epuyén (Paraje Costero Demo), Epuyén",
    date: getDemoFutureDate(3, 10, 30),
    endDate: getDemoFutureDate(3, 16, 0),
    description: "[Evento Demostrativo] Travesía recreativa en aguas calmas sin motores para visibilizar el cuidado del lago.",
    lat: -42.228,
    lng: -71.365,
    city: "Epuyén",
    category: "Deportes",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },
  {
    id: "ev-epu-2",
    title: "Taller Comunitario de Huertas y Compostaje (Demo)",
    time: "15:00 HS",
    locationName: "Centro de Encuentro (Espacio Demo), Epuyén",
    date: getDemoFutureDate(8, 15, 0),
    endDate: getDemoFutureDate(8, 18, 0),
    description: "[Evento Demostrativo] Taller práctico de regeneración de suelos y preparado de bioinsumos para huertas familiares.",
    lat: -42.232,
    lng: -71.369,
    city: "Epuyén",
    category: "Cultura y Turismo",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },

  // --- Cholila ---
  {
    id: "ev-cho-1",
    title: "Festival de Tradición Campera y Asado Criollo (Demo)",
    time: "11:30 - 19:30 HS",
    locationName: "Predio El Morro (Área Ferial Demo), Cholila",
    date: getDemoFutureDate(4, 11, 30),
    endDate: getDemoFutureDate(4, 19, 30),
    description: "[Evento Demostrativo] Muestra de destrezas a caballo, asado patagónico y música folclórica en el valle de Cholila.",
    lat: -42.508,
    lng: -71.448,
    city: "Cholila",
    category: "Cultura y Turismo",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },
  {
    id: "ev-cho-2",
    title: "Clínica de Pesca con Mosca y Devolución (Demo)",
    time: "09:00 HS",
    locationName: "Río Carrileufu (Acceso Pescadores Demo), Cholila",
    date: getDemoFutureDate(9, 9, 0),
    endDate: getDemoFutureDate(9, 14, 0),
    description: "[Evento Demostrativo] Clase práctica sobre lectura de aguas cordilleranas, nudos y atado de moscas secas.",
    lat: -42.515,
    lng: -71.455,
    city: "Cholila",
    category: "Deportes",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },

  // --- El Maitén ---
  {
    id: "ev-mai-1",
    title: "Visita Guiada a Talleres Históricos de La Trochita (Demo)",
    time: "14:30 - 18:00 HS",
    locationName: "Estación Ferroviaria (Paseo Demo), El Maitén",
    date: getDemoFutureDate(2, 14, 30),
    endDate: getDemoFutureDate(2, 18, 0),
    description: "[Evento Demostrativo] Recorrido por las máquinas de vapor centenarias y museo del Viejo Expreso Patagónico.",
    lat: -42.052,
    lng: -71.168,
    city: "El Maitén",
    category: "Cultura y Turismo",
    organizerEmail: "demo-eventos@esquelconectado.local"
  },
  {
    id: "ev-mai-2",
    title: "Encuentro de Murgas y Ensambles Musicales (Demo)",
    time: "18:00 HS",
    locationName: "Anfiteatro de la Plaza (Espacio Demo), El Maitén",
    date: getDemoFutureDate(5, 18, 0),
    endDate: getDemoFutureDate(5, 21, 30),
    description: "[Evento Demostrativo] Ritmo, percusión y espectáculos al aire libre para compartir en familia en El Maitén.",
    lat: -42.050,
    lng: -71.165,
    city: "El Maitén",
    category: "Música y Conciertos",
    organizerEmail: "demo-eventos@esquelconectado.local"
  }
];


const initialJobs: Job[] = [
  // --- Esquel ---
  {
    id: "job-esq-1",
    title: "Atención al Cliente y Mostrador (Demo)",
    companyName: "Comercio Demostrativo Esquel",
    companyPhotoPlaceholder: "CD",
    description: "[Publicación Demostrativa] Puesto de ejemplo para atención en mostrador, reposición y arqueo básico de caja en Esquel.",
    city: "Esquel",
    province: "Chubut",
    category: "Comercio",
    employmentType: "Jornada Completa",
    salary: "$720.000 - $800.000",
    createdAt: "Hoy",
    contactEmail: "demo-empleos@esquelconectado.local"
  },
  {
    id: "job-esq-2",
    title: "Auxiliar Contable y Liquidación (Demo)",
    companyName: "Estudio de Gestión Demo Esquel",
    companyPhotoPlaceholder: "EG",
    description: "[Publicación Demostrativa] Soporte administrativo y carga de comprobantes en sistema de prueba para comercios de Esquel.",
    city: "Esquel",
    province: "Chubut",
    category: "Servicios Técnicos",
    employmentType: "Part-time",
    salary: "$520.000",
    createdAt: "Hace 1 día",
    contactEmail: "demo-empleos@esquelconectado.local"
  },

  // --- Trevelin ---
  {
    id: "job-tre-1",
    title: "Mozo/a de Salón de Té Tradicional (Demo)",
    companyName: "Casa de Té Demostrativa Trevelin",
    companyPhotoPlaceholder: "CT",
    description: "[Publicación Demostrativa] Servicio de mesa y atención a turistas en salón de té galés de prueba en Trevelin.",
    city: "Trevelin",
    province: "Chubut",
    category: "Gastronomía",
    employmentType: "Part-time",
    salary: "$490.000",
    createdAt: "Hace 2 días",
    contactEmail: "demo-empleos@esquelconectado.local"
  },
  {
    id: "job-tre-2",
    title: "Informante y Guía Turístico Comarcal (Demo)",
    companyName: "Operador Turístico Demo Trevelin",
    companyPhotoPlaceholder: "OT",
    description: "[Publicación Demostrativa] Atención y asesoramiento a visitantes sobre excursiones, viñedos y cascadas en Trevelin.",
    city: "Trevelin",
    province: "Chubut",
    category: "Turismo",
    employmentType: "Por Temporada",
    salary: "$670.000",
    createdAt: "Hoy",
    contactEmail: "demo-empleos@esquelconectado.local"
  },

  // --- Lago Puelo ---
  {
    id: "job-pue-1",
    title: "Recepcionista de Complejo Turístico (Demo)",
    companyName: "Complejo de Cabañas Demo Puelo",
    companyPhotoPlaceholder: "CC",
    description: "[Publicación Demostrativa] Gestión de check-in, check-out y atención personalizada para estadías vacacionales en Lago Puelo.",
    city: "Lago Puelo",
    province: "Chubut",
    category: "Turismo",
    employmentType: "Jornada Completa",
    salary: "$690.000",
    createdAt: "Hace 1 día",
    contactEmail: "demo-empleos@esquelconectado.local"
  },
  {
    id: "job-pue-2",
    title: "Desarrollador/a Frontend React / Next.js (Demo)",
    companyName: "Estudio Digital Demo Lago Puelo",
    companyPhotoPlaceholder: "ED",
    description: "[Publicación Demostrativa] Desarrollo y mantenimiento de interfaces web para plataformas de la región con esquema híbrido.",
    city: "Lago Puelo",
    province: "Chubut",
    category: "Tecnología",
    employmentType: "Remoto / Híbrido",
    salary: "$1.250.000",
    createdAt: "Hoy",
    contactEmail: "demo-empleos@esquelconectado.local"
  },

  // --- El Bolsón ---
  {
    id: "job-bol-1",
    title: "Auxiliar de Chocolatería y Confitería (Demo)",
    companyName: "Taller Chocolatero Demo El Bolsón",
    companyPhotoPlaceholder: "TC",
    description: "[Publicación Demostrativa] Colaboración en templado de chocolate, relleno de bombones y envasado en El Bolsón.",
    city: "El Bolsón",
    province: "Río Negro",
    category: "Gastronomía",
    employmentType: "Jornada Completa",
    salary: "$740.000",
    createdAt: "Hace 2 días",
    contactEmail: "demo-empleos@esquelconectado.local"
  },
  {
    id: "job-bol-2",
    title: "Vendedor/a de Salón de Artesanías (Demo)",
    companyName: "Espacio de Diseño Demo El Bolsón",
    companyPhotoPlaceholder: "ED",
    description: "[Publicación Demostrativa] Atención comercial, exhibición de productos y control de caja en local céntrico de El Bolsón.",
    city: "El Bolsón",
    province: "Río Negro",
    category: "Comercio",
    employmentType: "Part-time",
    salary: "$480.000",
    createdAt: "Hoy",
    contactEmail: "demo-empleos@esquelconectado.local"
  },

  // --- El Hoyo ---
  {
    id: "job-hoy-1",
    title: "Encargado/a de Chacra y Cosecha Fina (Demo)",
    companyName: "Chacra Frutas Finas Demo El Hoyo",
    companyPhotoPlaceholder: "CF",
    description: "[Publicación Demostrativa] Supervisión de recolección de frambuesas y moras, clasificación y empaque en El Hoyo.",
    city: "El Hoyo",
    province: "Chubut",
    category: "Producción",
    employmentType: "Por Temporada",
    salary: "$630.000",
    createdAt: "Hace 3 días",
    contactEmail: "demo-empleos@esquelconectado.local"
  },
  {
    id: "job-hoy-2",
    title: "Despachante y Cajero/a de Parador (Demo)",
    companyName: "Parador Comarcal Demo El Hoyo",
    companyPhotoPlaceholder: "PC",
    description: "[Publicación Demostrativa] Venta al paso de dulces regionales, alfajores artesanales y bebidas cordilleranas en El Hoyo.",
    city: "El Hoyo",
    province: "Chubut",
    category: "Comercio",
    employmentType: "Jornada Completa",
    salary: "$660.000",
    createdAt: "Hace 1 día",
    contactEmail: "demo-empleos@esquelconectado.local"
  },

  // --- Epuyén ---
  {
    id: "job-epu-1",
    title: "Mantenimiento General y Parquización (Demo)",
    companyName: "Parque Recreativo Demo Epuyén",
    companyPhotoPlaceholder: "PR",
    description: "[Publicación Demostrativa] Limpieza de predios, cuidado de senderos y tareas básicas de pintura en complejo de Epuyén.",
    city: "Epuyén",
    province: "Chubut",
    category: "Turismo",
    employmentType: "Jornada Completa",
    salary: "$640.000",
    createdAt: "Hace 2 días",
    contactEmail: "demo-empleos@esquelconectado.local"
  },
  {
    id: "job-epu-2",
    title: "Ayudante de Carpintería y Muebles Nativos (Demo)",
    companyName: "Taller de Madera Demo Epuyén",
    companyPhotoPlaceholder: "TM",
    description: "[Publicación Demostrativa] Apoyo en lijado, encastre y acabado en aceite de piezas artesanales de madera en Epuyén.",
    city: "Epuyén",
    province: "Chubut",
    category: "Producción",
    employmentType: "Part-time",
    salary: "$510.000",
    createdAt: "Hoy",
    contactEmail: "demo-empleos@esquelconectado.local"
  },

  // --- Cholila ---
  {
    id: "job-cho-1",
    title: "Asistente de Campo y Tareas Rurales (Demo)",
    companyName: "Establecimiento Rural Demo Cholila",
    companyPhotoPlaceholder: "ER",
    description: "[Publicación Demostrativa] Mantenimiento de alambrados, alimentación y asistencia de ganado en el valle de Cholila.",
    city: "Cholila",
    province: "Chubut",
    category: "Producción",
    employmentType: "Jornada Completa",
    salary: "$680.000",
    createdAt: "Hace 2 días",
    contactEmail: "demo-empleos@esquelconectado.local"
  },
  {
    id: "job-cho-2",
    title: "Cocinero/a de Parador de Montaña (Demo)",
    companyName: "Cocina del Valle Demo Cholila",
    companyPhotoPlaceholder: "CV",
    description: "[Publicación Demostrativa] Elaboración de minutas, carnes al horno de leña y guisados para turistas en Cholila.",
    city: "Cholila",
    province: "Chubut",
    category: "Gastronomía",
    employmentType: "Por Temporada",
    salary: "$760.000",
    createdAt: "Hoy",
    contactEmail: "demo-empleos@esquelconectado.local"
  },

  // --- El Maitén ---
  {
    id: "job-mai-1",
    title: "Mecánico/a de Mantenimiento y Soldadura (Demo)",
    companyName: "Servicio Electromecánico Demo El Maitén",
    companyPhotoPlaceholder: "SE",
    description: "[Publicación Demostrativa] Reparaciones preventivas, uso de soldadora eléctrica y mantenimiento de herramientas en El Maitén.",
    city: "El Maitén",
    province: "Chubut",
    category: "Servicios Técnicos",
    employmentType: "Jornada Completa",
    salary: "$790.000",
    createdAt: "Hace 1 día",
    contactEmail: "demo-empleos@esquelconectado.local"
  },
  {
    id: "job-mai-2",
    title: "Atención de Tienda de Recuerdos Ferroviarios (Demo)",
    companyName: "Paseo de la Estación Demo El Maitén",
    companyPhotoPlaceholder: "PE",
    description: "[Publicación Demostrativa] Venta de folletos, libros históricos, recuerdos y atención a visitantes en El Maitén.",
    city: "El Maitén",
    province: "Chubut",
    category: "Turismo",
    employmentType: "Part-time",
    salary: "$470.000",
    createdAt: "Hoy",
    contactEmail: "demo-empleos@esquelconectado.local"
  }
];

const initialAccommodations: Accommodation[] = [
  {
    id: "acc-1",
    name: "Hostería Cumbres Blancas",
    type: "Hostería",
    city: "Esquel",
    address: "Ameghino 1680, Esquel",
    phone: "+54 2945 455100",
    email: "reservas@cumbresblancas.com.ar",
    website: "https://cumbresblancas.com.ar",
    description: "Hostería de montaña de categoría 4 estrellas con arquitectura en piedra y madera patagónica. Habitaciones suites, calefacción central, té de cortesía y atención personalizada.",
    priceRange: "$$$",
    rating: 4.9,
    lat: -42.911,
    lng: -71.318,
    amenities: ["WiFi Gratis", "Calefacción Central", "Desayuno Patagónico", "Estacionamiento", "Bar & Restó", "Recepcionista 24h"],
    verified: true
  },
  {
    id: "acc-2",
    name: "Hotel Las Bayas Esquel",
    type: "Hotel",
    city: "Esquel",
    address: "Av. Alvear 985, Esquel",
    phone: "+54 2945 450300",
    email: "info@hotellasbayas.com",
    description: "Hotel boutique situado en el área céntrica de Esquel. Ofrece suites espaciosas con diseño exclusivo, gastronomía de autor y wine bar con vinos patagónicos.",
    priceRange: "$$$$",
    rating: 4.8,
    lat: -42.914,
    lng: -71.321,
    amenities: ["WiFi Gratis", "Calefacción", "Restaurante Gourmet", "Estacionamiento", "Spa & Masajes", "Caja Fuerte"],
    verified: true
  },
  {
    id: "acc-3",
    name: "Cabañas Cordillera Esquel",
    type: "Cabaña",
    city: "Esquel",
    address: "Camino a La Hoya Km 3, Esquel",
    phone: "+54 2945 452290",
    description: "Cabañas alpinas totalmente equipadas al pie del Cordón Esquel y camino al centro de esquí La Hoya. Ideales para familias y amantes de los deportes invernales.",
    priceRange: "$$",
    rating: 4.7,
    lat: -42.885,
    lng: -71.295,
    amenities: ["WiFi Gratis", "Calefacción a Leña", "Parrilla Individual", "Cocina Completa", "Vista a las Montañas", "Pet Friendly"],
    verified: true
  },
  {
    id: "acc-4",
    name: "Cabañas Valle de los Tulipanes",
    type: "Cabaña",
    city: "Trevelin",
    address: "Ruta 259 Km 43, Trevelin",
    phone: "+54 2945 480220",
    description: "Hermosas cabañas rodeadas por el paisaje del valle galés y vistas panorámicas a las hileras de tulipanes. Cuenta con deck privado y estufa hogar.",
    priceRange: "$$$",
    rating: 4.9,
    lat: -43.088,
    lng: -71.460,
    amenities: ["WiFi Gratis", "Jardín de Tulipanes", "Desayuno Galés", "Parrilla", "Estacionamiento", "Cocina Completa"],
    verified: true
  },
  {
    id: "acc-5",
    name: "Hostería & Casa de Té Nain Nain",
    type: "Hostería",
    city: "Trevelin",
    address: "Av. San Martín 450, Trevelin",
    phone: "+54 2945 480101",
    description: "Alojamiento con encanto tradicional galés en el centro de Trevelin. Incluye la afamada merienda galesa de repostería casera con la estadía.",
    priceRange: "$$",
    rating: 4.8,
    lat: -43.085,
    lng: -71.463,
    amenities: ["WiFi Gratis", "Té Galés Incluido", "Calefacción", "Jardín Histórico", "Televisión por Cable"],
    verified: true
  },
  {
    id: "acc-6",
    name: "Cabañas del Lago & Spa Puelo",
    type: "Cabaña",
    city: "Lago Puelo",
    address: "Av. Los Arrayanes s/n, Lago Puelo",
    phone: "+54 2944 499201",
    description: "Complejo de cabañas de madera a metros del Parque Nacional Lago Puelo. Ofrece área de relax con spa, jacuzzi con vista al bosque y bajada a la bahía.",
    priceRange: "$$$",
    rating: 4.9,
    lat: -42.063,
    lng: -71.594,
    amenities: ["WiFi Gratis", "Spa & Jacuzzi", "Vista al Lago", "Cocina Completa", "Deck de Madera", "Pet Friendly"],
    verified: true
  },
  {
    id: "acc-7",
    name: "Hostel del Bosque Puelo",
    type: "Hostel",
    city: "Lago Puelo",
    address: "Callejón del Pedregal 120, Lago Puelo",
    phone: "+54 2944 499550",
    description: "Hostel joven y comunitario inmerso en un bosque nativo de coihues. Dormitorios compartidos y privados, fogón nocturno y alquiler de kayaks.",
    priceRange: "$",
    rating: 4.6,
    lat: -42.058,
    lng: -71.590,
    amenities: ["WiFi Gratis", "Cocina Compartida", "Fogón y Parrilla", "Alquiler de Kayaks", "Juegos de Mesa"],
    verified: true
  },
  {
    id: "acc-8",
    name: "Hostería Puesta del Sol El Bolsón",
    type: "Hostería",
    city: "El Bolsón",
    address: "Av. Belgrano 430, El Bolsón",
    phone: "+54 2944 492110",
    description: "Hostería cálida a pocas cuadras de la Plaza Pagano. Parque arbolado con piscina en verano, desayuno con mermeladas comarcales y vista al Cerro Piltriquitrón.",
    priceRange: "$$",
    rating: 4.7,
    lat: -41.968,
    lng: -71.532,
    amenities: ["WiFi Gratis", "Desayuno Artesanal", "Piscina Descubierta", "Jardín Botánico", "Calefacción"],
    verified: true
  },
  {
    id: "acc-9",
    name: "Glamping Eco-Refugio Lope de Vega",
    type: "Camping & Glamping",
    city: "El Bolsón",
    address: "Loma del Medio s/n, El Bolsón",
    phone: "+54 2944 493020",
    description: "Experiencia de hospedaje sustentable en domos geodésicos de lujo sobre la Loma del Medio. Vistas inolvidables del valle y cielos estrellados.",
    priceRange: "$$$",
    rating: 4.8,
    lat: -41.972,
    lng: -71.545,
    amenities: ["Vistas Panorámicas", "Domo Geodésico", "Estufas a Pellets", "Desayuno Orgánico", "Energía Solar"],
    verified: true
  },
  {
    id: "acc-10",
    name: "Cabañas Frutos Rojos El Hoyo",
    type: "Cabaña",
    city: "El Hoyo",
    address: "Ruta 40 Km 1902, El Hoyo",
    phone: "+54 2944 471090",
    description: "Cabañas campestres emplazadas en una chacra productora de frambuesas y moras. Los huéspedes pueden disfrutar de recolección de fruta fresca de estación.",
    priceRange: "$$",
    rating: 4.8,
    lat: -42.067,
    lng: -71.517,
    amenities: ["WiFi Gratis", "Cosecha Libre de Berries", "Parrilla", "Calefacción", "Estacionamiento"],
    verified: true
  },
  {
    id: "acc-11",
    name: "Refugio & Cabañas Puerto Epuyén",
    type: "Cabaña",
    city: "Epuyén",
    address: "Camino a Puerto Epuyén s/n, Epuyén",
    phone: "+54 2945 499015",
    description: "Tranquilidad absoluta frente a las cristalinas aguas sin motores del Lago Epuyén. Ideal para descanso, pesca deportiva y caminatas por senderos nativos.",
    priceRange: "$$",
    rating: 4.9,
    lat: -42.228,
    lng: -71.365,
    amenities: ["WiFi Gratis", "Vista al Lago Epuyén", "Bajada de Kayaks", "Parrilla Privada", "Deck con Vista"],
    verified: true
  },
  {
    id: "acc-12",
    name: "Eco-Lodge & Camping Butch Cassidy",
    type: "Camping & Glamping",
    city: "Cholila",
    address: "Valle de Cholila s/n, Cholila",
    phone: "+54 2945 498005",
    description: "Camping organizado y pequeñas cabañas rústicas en el mítico valle de Cholila, cerca de la histórica cabaña del forajido Butch Cassidy. Pesca con mosca y cabalgatas.",
    priceRange: "$",
    rating: 4.7,
    lat: -42.508,
    lng: -71.448,
    amenities: ["Acceso al Río", "Fogones y Parrillas", "Pesca con Mosca", "Cabalgatas", "Pet Friendly"],
    verified: true
  },
  {
    id: "acc-13",
    name: "Hostería La Trochita El Maitén",
    type: "Hostería",
    city: "El Maitén",
    address: "Av. San Martín 210, El Maitén",
    phone: "+54 2945 495120",
    description: "Hostería confortable a pasos de la estación y talleres principales del histórico tren a vapor Viejo Expreso Patagónico 'La Trochita'.",
    priceRange: "$$",
    rating: 4.6,
    lat: -42.052,
    lng: -71.168,
    amenities: ["WiFi Gratis", "Cerca de Estación La Trochita", "Desayuno Casero", "Calefacción", "Estacionamiento"],
    verified: true
  }
];

// Simulamos retardo de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dbService = {
  initStorage: () => {
    if (typeof window !== "undefined") {
      const currentVersion = "3.1.0_comarca_demo_all_cities";
      const savedVersion = localStorage.getItem("db_version");
      const existingEvents = localStorage.getItem("events");
      const existingJobs = localStorage.getItem("jobs");

      let parsedJobsCount = 0;
      let parsedEventsCount = 0;
      try {
        parsedJobsCount = existingJobs ? JSON.parse(existingJobs).length : 0;
        parsedEventsCount = existingEvents ? JSON.parse(existingEvents).length : 0;
      } catch {
        parsedJobsCount = 0;
        parsedEventsCount = 0;
      }

      const needsUpdate =
        savedVersion !== currentVersion ||
        !existingEvents ||
        !existingJobs ||
        parsedJobsCount < 16 ||
        parsedEventsCount < 16;

      if (needsUpdate) {
        localStorage.setItem("db_version", currentVersion);
        localStorage.setItem("locations", JSON.stringify(initialLocations));
        localStorage.setItem("events", JSON.stringify(initialEvents));
        localStorage.setItem("jobs", JSON.stringify(initialJobs));
        localStorage.setItem("accommodations", JSON.stringify(initialAccommodations));
      }

      if (!localStorage.getItem("accommodations")) localStorage.setItem("accommodations", JSON.stringify(initialAccommodations));
      if (!localStorage.getItem("userFavorites")) localStorage.setItem("userFavorites", JSON.stringify([]));
      if (!localStorage.getItem("users")) localStorage.setItem("users", JSON.stringify([]));
      if (!localStorage.getItem("applications")) localStorage.setItem("applications", JSON.stringify([]));
    }
  },

  // --- AUTH FUNCTIONS ---
  register: async (
    name: string,
    email: string,
    password: string,
    role: "Usuario" | "Empleador" = "Usuario",
    companyName?: string,
    cuit?: string
  ): Promise<User> => {
    await delay(500);
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    if (users.find(u => u.email === email)) throw new Error("El email ya está registrado");

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      role,
      companyName,
      cuit
    };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    // Auto login
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  login: async (email: string, password: string): Promise<User> => {
    await delay(500);
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Credenciales inválidas");

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  logout: () => {
    localStorage.removeItem("currentUser");
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },

  getSelectedCity: (): string => {
    if (typeof window === "undefined") return "Todas";
    return localStorage.getItem("selectedCity") || "Todas";
  },

  setSelectedCity: (city: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCity", city);
      window.dispatchEvent(new CustomEvent("cityChanged", { detail: city }));
    }
  },


  // --- JOB FUNCTIONS ---
  getLocations: async (): Promise<Location[]> => {
    await delay(300);
    if (typeof window === "undefined") return initialLocations;
    return JSON.parse(localStorage.getItem("locations") || "[]");
  },

  getCommerces: async (filters?: { keyword?: string; category?: string; city?: string }): Promise<Location[]> => {
    const locs = await dbService.getLocations();
    let commerces = locs.filter(l => l.type === "commerce");

    if (filters) {
      const { keyword, category, city } = filters;
      if (city && city !== "Todas") {
        commerces = commerces.filter(c => c.city && c.city.toLowerCase() === city.toLowerCase());
      }
      if (category && category !== "Todas") {
        commerces = commerces.filter(c => c.category && c.category.toLowerCase() === category.toLowerCase());
      }
      if (keyword && keyword.trim()) {
        const kw = keyword.toLowerCase().trim();
        commerces = commerces.filter(c =>
          c.name.toLowerCase().includes(kw) ||
          c.description.toLowerCase().includes(kw) ||
          (c.address && c.address.toLowerCase().includes(kw))
        );
      }
    }

    return commerces;
  },

  getEvents: async (filters?: { city?: string; category?: string; keyword?: string }): Promise<Event[]> => {
    await delay(300);
    let events = typeof window === "undefined"
      ? [...initialEvents]
      : (JSON.parse(localStorage.getItem("events") || "[]") as Event[]);

    if (events.length === 0) {
      events = [...initialEvents];
      if (typeof window !== "undefined") {
        if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(events));
    }
      }
    }

    // Ciclo de Vida Automático: Filtrar y eliminar eventos vencidos
    const now = new Date().getTime();
    events = events.filter(ev => {
      if (ev.endDate) {
        return new Date(ev.endDate).getTime() >= now;
      }
      if (ev.date) {
        const start = new Date(ev.date);
        const endOfDay = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 23, 59, 59).getTime();
        return endOfDay >= now;
      }
      return true;
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(events));
    }

    // Aplicación de Filtros
    if (filters) {
      const { city, category, keyword } = filters;
      if (city && city !== "Todas") {
        events = events.filter(e => e.city && e.city.toLowerCase() === city.toLowerCase());
      }
      if (category && category !== "Todas") {
        events = events.filter(e => e.category && e.category.toLowerCase() === category.toLowerCase());
      }
      if (keyword && keyword.trim()) {
        const kw = keyword.toLowerCase().trim();
        events = events.filter(e =>
          e.title.toLowerCase().includes(kw) ||
          e.description.toLowerCase().includes(kw) ||
          e.locationName.toLowerCase().includes(kw)
        );
      }
    }

    return events;
  },

  addEvent: async (eventData: Omit<Event, "id">): Promise<Event> => {
    await delay(400);
    const events = JSON.parse(localStorage.getItem("events") || "[]") as Event[];
    const newEvent: Event = {
      ...eventData,
      id: Math.random().toString(36).substr(2, 9),
    };
    localStorage.setItem("events", JSON.stringify([newEvent, ...events]));
    return newEvent;
  },


  getJobs: async (filters?: {
    keyword?: string;
    category?: string;
    province?: string;
    city?: string;
  } | string): Promise<Job[]> => {
    await delay(250);
    let jobs = typeof window === "undefined"
      ? [...initialJobs]
      : (JSON.parse(localStorage.getItem("jobs") || "[]") as Job[]);

    if (jobs.length === 0) {
      jobs = [...initialJobs];
      if (typeof window !== "undefined") {
        localStorage.setItem("jobs", JSON.stringify(jobs));
      }
    }

    if (typeof filters === "string") {
      return jobs.filter(j => j.city && j.city.toLowerCase() === filters.toLowerCase());
    }

    if (filters) {
      const { keyword, category, province, city } = filters;
      if (keyword && keyword.trim()) {
        const kw = keyword.toLowerCase().trim();
        jobs = jobs.filter(j =>
          j.title.toLowerCase().includes(kw) ||
          j.companyName.toLowerCase().includes(kw) ||
          j.description.toLowerCase().includes(kw)
        );
      }
      if (category && category !== "Todas") {
        jobs = jobs.filter(j => j.category && j.category.toLowerCase() === category.toLowerCase());
      }
      if (province && province !== "Todas") {
        jobs = jobs.filter(j => j.province && j.province.toLowerCase() === province.toLowerCase());
      }
      if (city && city !== "Todas") {
        jobs = jobs.filter(j => j.city && j.city.toLowerCase() === city.toLowerCase());
      }
    }
    return jobs;
  },

  sendDirectMessage: async (msgData: Omit<DirectMessage, "id" | "date">): Promise<DirectMessage> => {
    await delay(300);
    const messages = JSON.parse(localStorage.getItem("directMessages") || "[]") as DirectMessage[];
    const newMsg: DirectMessage = {
      ...msgData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    localStorage.setItem("directMessages", JSON.stringify([newMsg, ...messages]));
    return newMsg;
  },

  addJob: async (jobData: Omit<Job, "id" | "companyPhotoPlaceholder">): Promise<Job> => {
    await delay(500);
    const user = dbService.getCurrentUser();
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
    const newJob: Job = {
      ...jobData,
      id: Math.random().toString(36).substr(2, 9),
      companyPhotoPlaceholder: jobData.companyName.substring(0, 2).toUpperCase(),
      authorId: user?.id
    };
    localStorage.setItem("jobs", JSON.stringify([newJob, ...jobs]));
    return newJob;
  },

  getUserJobs: async (userId: string): Promise<Job[]> => {
    await delay(300);
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
    return jobs.filter(j => j.authorId === userId);
  },

  deleteJob: async (jobId: string): Promise<void> => {
    await delay(300);
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
    const filtered = jobs.filter(j => j.id !== jobId);
    localStorage.setItem("jobs", JSON.stringify(filtered));
  },

  // --- APPLICATION FUNCTIONS ---
  applyToJob: async (job: Job): Promise<Application> => {
    await delay(500);
    const user = dbService.getCurrentUser();
    if (!user) throw new Error("Debes iniciar sesión para postularte");

    const apps = JSON.parse(localStorage.getItem("applications") || "[]") as Application[];
    if (apps.find(a => a.jobId === job.id && a.userId === user.id)) throw new Error("Ya te has postulado a este empleo");

    const newApp: Application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId: job.id,
      userId: user.id,
      jobTitle: job.title,
      companyName: job.companyName,
      date: new Date().toISOString()
    };
    localStorage.setItem("applications", JSON.stringify([newApp, ...apps]));
    return newApp;
  },

  getUserApplications: async (userId: string): Promise<Application[]> => {
    await delay(300);
    const apps = JSON.parse(localStorage.getItem("applications") || "[]") as Application[];
    return apps.filter(a => a.userId === userId);
  },

  toggleFavoriteLocation: async (userId: string, locationId: string): Promise<boolean> => {
    await delay(200);
    if (typeof window === "undefined") return false;
    const favorites: string[] = JSON.parse(localStorage.getItem("userFavorites") || "[]");
    let newFavorites;
    let isFavorite = false;
    if (favorites.includes(locationId)) {
      newFavorites = favorites.filter(id => id !== locationId);
    } else {
      newFavorites = [...favorites, locationId];
      isFavorite = true;
    }
    localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
    return isFavorite;
  },

  updateUserAvatar: async (userId: string, avatarUrl: string): Promise<User> => {
    await delay(200);
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx].avatarUrl = avatarUrl;
      localStorage.setItem("users", JSON.stringify(users));
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null") as User | null;
    if (currentUser && currentUser.id === userId) {
      currentUser.avatarUrl = avatarUrl;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      return currentUser;
    }

    return { id: userId, name: "", email: "", avatarUrl };
  },

  // --- ACCOMMODATION FUNCTIONS (HOSPEDAJES) ---
  getAccommodations: async (filters?: {
    keyword?: string;
    type?: string;
    city?: string;
    priceRange?: string;
    amenity?: string;
  }): Promise<Accommodation[]> => {
    await delay(300);
    if (typeof window === "undefined") return initialAccommodations;

    let items = JSON.parse(localStorage.getItem("accommodations") || "[]") as Accommodation[];
    if (items.length === 0) {
      items = initialAccommodations;
      localStorage.setItem("accommodations", JSON.stringify(items));
    }

    if (filters) {
      const { keyword, type, city, priceRange, amenity } = filters;
      if (city && city !== "Todas") {
        items = items.filter(acc => acc.city && acc.city.toLowerCase() === city.toLowerCase());
      }
      if (type && type !== "Todas") {
        items = items.filter(acc => acc.type && acc.type.toLowerCase() === type.toLowerCase());
      }
      if (priceRange && priceRange !== "Todos") {
        items = items.filter(acc => acc.priceRange === priceRange);
      }
      if (amenity && amenity !== "Todos") {
        items = items.filter(acc => acc.amenities && acc.amenities.includes(amenity));
      }
      if (keyword && keyword.trim()) {
        const kw = keyword.toLowerCase().trim();
        items = items.filter(acc =>
          acc.name.toLowerCase().includes(kw) ||
          acc.description.toLowerCase().includes(kw) ||
          acc.address.toLowerCase().includes(kw) ||
          acc.city.toLowerCase().includes(kw)
        );
      }
    }

    return items;
  },

  addAccommodation: async (accData: Omit<Accommodation, "id">): Promise<Accommodation> => {
    await delay(400);
    const items = JSON.parse(localStorage.getItem("accommodations") || "[]") as Accommodation[];
    const newAcc: Accommodation = {
      ...accData,
      id: "acc-" + Math.random().toString(36).substr(2, 9),
      verified: true
    };
    localStorage.setItem("accommodations", JSON.stringify([newAcc, ...items]));
    return newAcc;
  },
};
