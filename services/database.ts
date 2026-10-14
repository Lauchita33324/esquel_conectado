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


const initialEvents: Event[] = [
  {
    id: "1",
    title: "Feria Tradicional de Artesanos y Emprendedores",
    time: "10:00 - 19:00 HS",
    locationName: "Plaza San Martín, Esquel",
    date: new Date(Date.now() + 86400000).toISOString(),
    endDate: new Date(Date.now() + 172800000).toISOString(),
    description: "Vení a disfrutar del paseo gastronómico, puestos textiles, artesanías en madera y espectáculos al aire libre.",
    lat: -42.914,
    lng: -71.318,
    city: "Esquel",
    category: "Ferias y Paseos",
    organizerEmail: "ferias@esquel.gov.ar"
  },
  {
    id: "2",
    title: "Noche de Jazz y Folclore Patagónico",
    time: "21:30 HS",
    locationName: "Centro Cultural Melipal, Esquel",
    date: new Date(Date.now() + 172800000).toISOString(),
    endDate: new Date(Date.now() + 259200000).toISOString(),
    description: "Encuentro musical con bandas en vivo, buffet de productos regionales y cachaça artesanal.",
    lat: -42.916,
    lng: -71.312,
    city: "Esquel",
    category: "Música y Conciertos",
    organizerEmail: "cultura@esquel.gov.ar"
  },
  {
    id: "3",
    title: "Fiesta del Tulipán y Productores de la Comarca",
    time: "11:00 - 18:00 HS",
    locationName: "Campo de Tulipanes, Trevelin",
    date: new Date(Date.now() + 259200000).toISOString(),
    endDate: new Date(Date.now() + 345600000).toISOString(),
    description: "Recorrido guiado, fotografía turística, puestos gastronómicos de té galés y repostería artesanal.",
    lat: -43.085,
    lng: -71.463,
    city: "Trevelin",
    category: "Cultura y Turismo",
    organizerEmail: "turismo@trevelin.gob.ar"
  },
  {
    id: "4",
    title: "Maratón de Montaña La Hoya Trail",
    time: "08:30 HS",
    locationName: "Base del Centro de Esquí La Hoya",
    date: new Date(Date.now() + 345600000).toISOString(),
    endDate: new Date(Date.now() + 432000000).toISOString(),
    description: "Competencia deportiva de trail running 10k y 21k con vistas panorámicas al cordón del Esquel.",
    lat: -42.833,
    lng: -71.266,
    city: "Esquel",
    category: "Deportes",
    organizerEmail: "deportes@lahoya.com.ar"
  }
];


const initialJobs: Job[] = [
  {
    id: "1",
    title: "Cajero/a de Salón Polivalente",
    companyName: "Supermercado La Anónima",
    companyPhotoPlaceholder: "LA",
    description: "Buscamos cajero/a con experiencia en manejo de posnet, arqueo de caja y excelente trato al cliente. Turno rotativo con francos semanales.",
    city: "Esquel",
    province: "Chubut",
    category: "Comercio",
    employmentType: "Jornada Completa",
    salary: "$680.000 - $780.000",
    createdAt: "Hace 2 días"
  },
  {
    id: "2",
    title: "Cocinero/a y Ayudante de Cocina",
    companyName: "Restaurante Don Chiquino",
    companyPhotoPlaceholder: "DC",
    description: "Puesto para restaurante gastronómico reconocido de Esquel. Elaboración de pastas artesanales y despacho en servicio de cena.",
    city: "Esquel",
    province: "Chubut",
    category: "Gastronomía",
    employmentType: "Jornada Completa",
    salary: "$750.000 - $900.000",
    createdAt: "Hace 1 día"
  },
  {
    id: "3",
    title: "Vendedor/a de Salón y Atención Turística",
    companyName: "Boutique Andina",
    companyPhotoPlaceholder: "BA",
    description: "Atención comercial al público y turistas, manejo de inventario y caja en local céntrico de Trevelin.",
    city: "Trevelin",
    province: "Chubut",
    category: "Comercio",
    employmentType: "Part-time",
    salary: "$450.000",
    createdAt: "Hace 3 días"
  },
  {
    id: "4",
    title: "Técnico en Soporte IT y Conectividad",
    companyName: "Esquel Comp & Redes",
    companyPhotoPlaceholder: "EC",
    description: "Mantenimiento preventivo, soporte a usuarios y configuración de enlaces de internet inalámbrico en la zona urbana y rural.",
    city: "Esquel",
    province: "Chubut",
    category: "Tecnología",
    employmentType: "Jornada Completa",
    salary: "$820.000",
    createdAt: "Hoy"
  },
  {
    id: "5",
    title: "Recepcionista de Hotel y Reservas",
    companyName: "Hostería Cumbres Blancas",
    companyPhotoPlaceholder: "CB",
    description: "Atención a huéspedes, check-in, check-out y gestión de canales de reserva. Nivel de inglés intermedio valorado.",
    city: "Esquel",
    province: "Chubut",
    category: "Turismo",
    employmentType: "Por Temporada",
    salary: "$620.000",
    createdAt: "Hace 4 días"
  },
  {
    id: "6",
    title: "Encargado/a de Chacra y Cosecha Fina",
    companyName: "Chacra Las Golondrinas",
    companyPhotoPlaceholder: "LG",
    description: "Supervisión de cosecha de frutos rojos, empaque y despacho para la temporada de verano en la Comarca.",
    city: "El Hoyo",
    province: "Chubut",
    category: "Producción",
    employmentType: "Por Temporada",
    salary: "$600.000",
    createdAt: "Hace 2 días"
  },
  {
    id: "7",
    title: "Desarrollador/a Frontend React / Next.js",
    companyName: "Patagonia Tech Solutions",
    companyPhotoPlaceholder: "PT",
    description: "Desarrollo de módulos web interactivos y plataformas SaaS. Modalidad de trabajo híbrida o remota desde la Comarca.",
    city: "Lago Puelo",
    province: "Chubut",
    category: "Tecnología",
    employmentType: "Remoto / Híbrido",
    salary: "$1.200.000 - $1.500.000",
    createdAt: "Hoy"
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
      const existingEvents = localStorage.getItem("events");
      const existingJobs = localStorage.getItem("jobs");

      const needsUpdate = !existingEvents ||
        !existingJobs ||
        !JSON.parse(existingEvents)[0]?.lat ||
        !JSON.parse(existingJobs)[0]?.city ||
        !JSON.parse(existingJobs)[0]?.category;

      if (needsUpdate) {
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
    let locs = await dbService.getLocations();
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
    if (typeof window === "undefined") return initialEvents;

    let events = JSON.parse(localStorage.getItem("events") || "[]") as Event[];
    if (events.length === 0) {
      events = initialEvents;
      localStorage.setItem("events", JSON.stringify(events));
    }

    // Ciclo de Vida Automático: Filtrar y eliminar eventos vencidos
    const now = new Date().getTime();
    events = events.filter(ev => {
      if (ev.endDate) {
        return new Date(ev.endDate).getTime() >= now;
      }
      if (ev.date) {
        return new Date(ev.date).getTime() + 86400000 >= now;
      }
      return true;
    });

    localStorage.setItem("events", JSON.stringify(events));

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
    if (typeof window === "undefined") return initialJobs;
    let jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];

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
