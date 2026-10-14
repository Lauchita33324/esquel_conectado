# Esquel Conectado - Documento de Contexto y Especificaciones

## 1. Visión General, Propósito y Alcance del Proyecto

### ¿Qué es "Esquel Conectado"?
Esquel Conectado es una plataforma web integral pensada para centralizar la dinámica laboral, turística y comunitaria de Esquel y de las distintas localidades que integran la Comarca Andina del Paralelo 42 en la provincia del Chubut, con una arquitectura escalable diseñada para expandirse de forma progresiva a todas las provincias de la República Argentina. Funciona como un punto de encuentro digital que conecta a los residentes, comerciantes, emprendedores y visitantes dentro de un mismo ecosistema accesible, fluido y seguro.

### Diseño y Estética Visual General
* **Paleta de Colores:** La interfaz emplea un diseño limpio, moderno y ordenado basado en una paleta de tonos blancos, azules y celestes, transmitiendo confianza, claridad y vinculación con el entorno cordillerano.
* **Tipografía y Textos:** Toda la plataforma utiliza exclusivamente familias tipográficas sans-serif (palo seco / sin serifas). Los títulos principales son grandes, en negrita y de color azul oscuro; los subtítulos son medianos y en negrita; el texto normal tiene un tamaño mediano y un color gris muy oscuro para asegurar una lectura cómoda y evitar la fatiga visual.
* **Botones e Interacciones:** Los botones principales de acción (como buscar, enviar o confirmar) son de color azul/celeste destacado, con texto blanco en negrita. Al pasar el cursor por encima de los enlaces o elementos del menú, estos cambian de tono para dar respuesta visual inmediata al usuario.

---

## 2. Visión a Futuro y Plan de Escalabilidad Nacional
La arquitectura del sistema está concebida desde su código base para soportar un modelo multirregional regionalizado por provincias y departamentos/municipios:
* **Estructura Modular por Provincias:** La plataforma permite la incorporación ordenada de las 23 provincias argentinas y la Ciudad Autónoma de Buenos Aires. Cada provincia cuenta con su propio subdominio o sección con un mapa adaptado y nodos de eventos e inserción laboral locales.
* **Replicabilidad del Modelo Comarcal:** La experiencia iniciada en la Comarca Andina de Chubut sirve como prueba piloto para exportar el mismo esquema de vinculación laboral y turística a otras regiones del país (como Punilla en Córdoba, la Costa Atlántica en Buenos Aires o la Quebrada de Humahuaca en Jujuy).

---

## 3. Gestión de Usuarios, Seguridad y Verificaciones

### 3.1. Registro Inicial Único y Protección CAPTCHA
Para prevenir el registro de cuentas falsas, ataques automatizados y el spam en el sitio, todos los formularios de la plataforma (registro, inicio de sesión, envío de mensajes y carga de eventos) incluyen una verificación obligatoria por CAPTCHA.
* **Registro Único:** Todas las personas se registran inicialmente bajo un único tipo de cuenta estándar: **Usuario**. Este perfil base permite navegar por toda la web, enviar solicitudes de eventos, consultar el mapa e interactuar con la sección laboral.

### 3.2. Proceso de Ascenso a Perfil "Empleador"
Publicar búsquedas de empleo no es una función habilitada de forma automática para cualquier cuenta recién creada. Si un usuario o comerciante desea publicar ofertas laborales, debe iniciar un proceso de verificación dentro de la plataforma:
1. **Solicitud de Perfil Empleador:** Dentro de su panel de usuario, la persona accede a la sección "Volverse Empleador" y completa un formulario de validación donde proporciona datos de verificación (nombre de la empresa/comercio, CUIT o identificación comercial, teléfono de contacto y dirección).
2. **Revisión por Administración:** El equipo de administración de Esquel Conectado evalúa la documentación enviada para comprobar que se trata de una entidad o empleador legítimo.
3. **Aprobación y Notificación por Mail:** Una vez verificados los datos, el administrador aprueba la solicitud. El sistema actualiza el rol de la cuenta a "Empleador" y envía automáticamente un correo electrónico notificando que ya tiene habilitada la función para publicar y administrar búsquedas de trabajo.

---

## 4. Estructura y Funcionamiento de la Interfaz

### 4.1. Encabezado (Navbar)
* En la parte superior se encuentra el encabezado con fondo blanco, manteniéndose fijo y separado del resto de la página al hacer scroll.
* A la izquierda se ubica el logotipo institucional de Esquel Conectado acompañado de un diseño tipográfico limpio en tonos azules.
* A la derecha se sitúa el menú de navegación principal con 5 opciones principales: **Inicio**, **Empleos**, **Eventos**, **Ciudades** y **Refugios/Comercios**. Las letras son de color gris oscuro y al pasar por encima se tornan de color azul. En el extremo derecho se destaca el botón de acceso **"Mi Cuenta"**.

### 4.2. Página de Inicio (Home)
* Abajo del encabezado se encuentra la presentación principal, con una pantalla que incluye una fotografía panorámica representativa de la región cordillerana.
* Sobre la imagen se superpone un título principal: *"Centraliza tu comunidad en un solo lugar"*, y debajo una frase secundaria: *"Conectá con oportunidades laborales, eventos y turismo en la Comarca"*.
* Cuenta con tarjetones de acceso rápido a los servicios y una distribución en dos columnas: a la izquierda el calendario de eventos del día y a la derecha el mapa interactivo en tiempo real.

### 4.3. Sección Laboral ("Buscar Empleo" y "Emplear")
* **Filtros de Búsqueda:** Ubicados en la parte superior dentro de una caja de diseño claro y tono beige suave, permiten filtrar vacantes por palabras clave, categorías (Gastronomía, Comercio, Tecnología, etc.), provincia y localidad, incluyendo un botón azul con la leyenda "BUSCAR".
* **Tarjetas de Empleo:** Las ofertas se despliegan en filas de tarjetas blancas limpias. Cada tarjeta muestra el título del puesto, la empresa contratante, localidad, tipo de jornada y un botón azul de comunicación directa para chatear con el empleador desde la misma web sin formularios externos.

### 4.4. Sección "Ciudades y Provincias" (Diseño Inmersivo)
* Al ingresar a esta sección o seleccionar una localidad de la Comarca Andina (como Esquel, Trevelin, Lago Puelo, etc.), la interfaz despliega un diseño inmersivo.
* **Fotografía de Fondo:** Cada ciudad cuenta en su cabecera con una impactante fotografía representativa de fondo combinada con textos sans-serif que detallan su historia y atractivos turísticos, filtrando de manera automática los eventos y trabajos de esa zona.

### 4.5. Sección "Eventos" y Ciclo de Vida Automático
* **Agenda Visual:** Organiza la grilla cultural y recreativa mediante tarjetas con tipografía sans-serif. Destaca en la parte superior la fecha y hora exacta en color verde, seguida del título, locación y descripción breve.
* **Carga, Aprobación y Borrado Automático:** Los usuarios cargan los datos mediante un formulario protegido por CAPTCHA. El sistema gestiona la aprobación mediante un correo electrónico de confirmación al organizador y elimina automáticamente la publicación del mapa y de la vista pública una vez cumplida su fecha y hora de finalización.

### 4.6. Mapa Interactivo y Geolocalización ("¿Cómo llegar?")
* Muestra un plano dinámico con pines categorizados. Al seleccionar un punto de interés o evento, despliega la opción de calcular rutas óptimas en vehículo, bicicleta o a pie utilizando la ubicación GPS del usuario.

---

## 5. Arquitectura de Datos y Roles

### 5.1. Jerarquía de Roles:
* **Usuario General:** Consulta eventos, usa el mapa interactivo, envía mensajes directos a empleadores y solicita la creación de eventos o el ascenso a perfil empleador.
* **Usuario Empleador Verificado:** Rol otorgado tras validar datos reales. Publica ofertas de trabajo y gestiona los mensajes recibidos.
* **Administrador:** Revisa solicitudes de ascenso, valida publicaciones y gestiona el sistema de correos automáticos.

### 5.2. Seguridad y Rendimiento:
* La integración de CAPTCHA bloquea interacciones maliciosas en los formularios.
* Las consultas y búsquedas filtran la información de manera fluida sin necesidad de recargar la página completa, garantizando una navegación ágil tanto en computadoras como en dispositivos móviles.
