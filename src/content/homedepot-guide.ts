/**
 * Contenido de la guía del Agente 3D Conversacional - Home Depot
 * Basado en el documento de orientación funcional
 */

export const homedepotGuide = {
  resumen: `Un Agente IA Conversacional representado por un Avatar 3D interactivo, diseñado para operar como asistente virtual en Home Depot. La solución permite conversación por voz en tiempo real con un personaje 3D animado que responde con IA, síntesis de voz natural y sincronización labial dinámica.`,
  objetivos: [
    "Asesor de tienda virtual",
    "Asistente digital autoservicio",
    "Orientador en pasillos y categorías",
    "Canal conversacional innovador para retail",
  ],
  flujo: [
    "Accede a la página de la demo",
    'Presiona el botón "Conectar"',
    "Se habilita el micrófono",
    "Realiza preguntas por voz",
    "El Avatar responde verbalmente",
  ],
  categoriasPreguntas: [
    {
      titulo: "Ubicación de productos",
      ejemplos: [
        "¿Dónde están los martillos?",
        "¿Dónde encuentro taladros?",
        "¿En qué pasillo están los tornillos?",
        "¿Dónde están los contactos eléctricos?",
        "¿Dónde encuentro pintura blanca?",
      ],
    },
    {
      titulo: "Ubicación de servicios",
      ejemplos: [
        "¿Dónde están las cajas?",
        "¿Dónde puedo hacer una devolución?",
        "¿Dónde está servicio al cliente?",
        "¿Dónde rentan herramientas?",
      ],
    },
    {
      titulo: "Proyectos de bricolaje",
      ejemplos: [
        "Quiero hacer un buró",
        "Quiero arreglar mi jardín",
        "Necesito poner un estante",
        "¿Qué necesito para instalar un cerco?",
      ],
    },
  ],
  capacidades: [
    "Localizar productos dentro de pasillos definidos",
    "Dar instrucciones caminando desde la entrada principal",
    "Orientar dentro del layout de tienda",
    "Asesorar en proyectos simples con estructura guiada",
    "Entregar presupuestos aproximados en rango",
    "Operar 100% en español con pronunciación adecuada",
    "Mantener tono profesional, humano y calmado",
  ],
  limitaciones: [
    "No consulta inventario en tiempo real",
    "No entrega precios exactos",
    "No menciona marcas específicas",
    "No inventa productos o categorías fuera del alcance",
  ],
  pasillos: [
    { num: 3, area: "Herramientas manuales (martillos, desarmadores, llaves)" },
    { num: 5, area: "Herramientas eléctricas (taladros, rotomartillos, esmeriles)" },
    { num: 7, area: "Electricidad (cables, contactos, extensiones)" },
    { num: 9, area: "Plomería (tubería, llaves, conexiones)" },
    { num: 11, area: "Pinturas (brochas, rodillos, esmalte)" },
    { num: 14, area: "Ferretería (tornillos, taquetes, clavos)" },
    { num: 18, area: "Jardinería (mangueras, macetas, fertilizantes)" },
  ],
} as const;
