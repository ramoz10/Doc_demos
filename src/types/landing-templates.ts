/**
 * Tipos y schemas Zod para plantillas de landing configurables.
 * Contenido editable desde el backoffice, almacenado como JSON en BD.
 */

import { z } from "zod";

// --- IDs de plantillas ---
export const TEMPLATE_IDS = [
  "guide-retail",
  "guide-tickets",
  "guide-seguros",
  "guide-entrenamiento",
  "bento-minimal",
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

// --- guide-retail ---
export const guideRetailCategoriaSchema = z.object({
  titulo: z.string(),
  ejemplos: z.array(z.string()),
});

export const guideRetailPasilloSchema = z.object({
  num: z.number(),
  area: z.string(),
});

export const guideRetailSchema = z.object({
  resumen: z.string(),
  objetivos: z.array(z.string()),
  flujo: z.array(z.string()),
  categoriasPreguntas: z.array(guideRetailCategoriaSchema),
  pasillos: z.array(guideRetailPasilloSchema),
  capacidades: z.array(z.string()),
  limitaciones: z.array(z.string()),
});

export type GuideRetailContent = z.infer<typeof guideRetailSchema>;

// --- guide-tickets ---
export const guideTicketsFlujoItemSchema = z.object({
  letra: z.string(),
  titulo: z.string(),
  contenido: z.string(),
});

export const guideTicketsCatalogoSchema = z.object({
  nota: z.string(),
  clientes: z.array(z.string()),
});

export const guideTicketsIntercambioSchema = z.object({
  quien: z.enum(["AsistenteIT", "Usuario", "Nota"]),
  mensaje: z.string(),
});

export const guideTicketsEjemploConversacionSchema = z.object({
  titulo: z.string(),
  tipo: z.string(),
  intercambios: z.array(guideTicketsIntercambioSchema),
});

export const guideTicketsPruebasDelCicloSchema = z.object({
  objetivo: z.string(),
  areas: z.array(z.string()),
});

export const guideTicketsSchema = z.object({
  resumen: z.string(),
  flujo: z.array(guideTicketsFlujoItemSchema),
  catalogoClientes: guideTicketsCatalogoSchema,
  mensajeExito: z.string(),
  ejemplosConversacion: z.array(guideTicketsEjemploConversacionSchema),
  pruebasDelCiclo: guideTicketsPruebasDelCicloSchema,
  reglasClave: z.array(z.string()),
  puntosDemo: z.array(z.string()),
});

export type GuideTicketsContent = z.infer<typeof guideTicketsSchema>;

// --- guide-seguros ---
export const guideSegurosObjetivoSchema = z.object({
  descripcion: z.string(),
  duranteConversacion: z.array(z.string()),
  cierre: z.string(),
});

export const guideSegurosEstiloSchema = z.object({
  titulo: z.string(),
  descripcion: z.string(),
  tonos: z.array(z.string()),
});

export const guideSegurosGestionSchema = z.object({
  titulo: z.string(),
  descripcion: z.string(),
  ejemplosValidacion: z.array(z.string()),
  silencio: z.string(),
  breve: z.string(),
});

export const guideSegurosFlujoItemSchema = z.object({
  numero: z.number(),
  titulo: z.string(),
  contenido: z.string(),
});

export const guideSegurosEjemploObjecionSchema = z.object({
  titulo: z.string(),
  descripcion: z.string(),
  ejemplo: z.string(),
});

export const guideSegurosManejoObjecionesSchema = z.object({
  introduccion: z.string(),
  proceso: z.array(z.string()),
  ejemplosComunes: z.array(guideSegurosEjemploObjecionSchema),
  notaFinal: z.string(),
  principios: z.array(z.string()),
});

export const guideSegurosSchema = z.object({
  objetivo: guideSegurosObjetivoSchema,
  estiloComunicacion: guideSegurosEstiloSchema,
  gestionConversacion: guideSegurosGestionSchema,
  flujo: z.array(guideSegurosFlujoItemSchema),
  manejoObjeciones: guideSegurosManejoObjecionesSchema,
  resultadoEsperado: z.string(),
});

export type GuideSegurosContent = z.infer<typeof guideSegurosSchema>;

// --- guide-entrenamiento (Bot Entrenador Banorte) ---
export const guideEntrenamientoEscenarioSchema = z.object({
  numero: z.number(),
  titulo: z.string(),
  situacion: z.string(),
  caracteristicasCliente: z.array(z.string()),
  agenteDebe: z.array(z.string()),
});

export const guideEntrenamientoCriterioSchema = z.object({
  titulo: z.string(),
  descripcion: z.string(),
});

export const guideEntrenamientoCalificacionFilaSchema = z.object({
  rango: z.string(),
  interpretacion: z.string(),
});

export const guideEntrenamientoSchema = z.object({
  objetivo: z.object({
    descripcion: z.string(),
    habilidadesClave: z.array(z.string()),
  }),
  comoFunciona: z.object({
    dinamica: z.array(z.string()),
    mensajeInicio: z.string(),
  }),
  escenarios: z.array(guideEntrenamientoEscenarioSchema),
  realismo: z.object({
    descripcion: z.string(),
    comportamientos: z.array(z.string()),
    expresionEmocion: z.array(z.string()),
  }),
  manejoSilencios: z.object({
    silencio15: z.string(),
    silencio30: z.string(),
  }),
  evaluacion: z.object({
    incluye: z.array(z.string()),
    criterios: z.array(guideEntrenamientoCriterioSchema),
    elementosOperativos: z.array(z.string()),
  }),
  calificacion: z.object({
    filas: z.array(guideEntrenamientoCalificacionFilaSchema),
    indicadores: z.array(z.string()),
  }),
  repeticion: z.string(),
  resultadoEsperado: z.string(),
  duracion: z.string(),
});

export type GuideEntrenamientoContent = z.infer<typeof guideEntrenamientoSchema>;

// --- bento-minimal ---
export const bentoCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const bentoMinimalSchema = z.object({
  cards: z.array(bentoCardSchema),
});

export type BentoMinimalContent = z.infer<typeof bentoMinimalSchema>;

// --- Union discriminada ---
export type LandingTemplateContent =
  | { templateId: "guide-retail"; content: GuideRetailContent }
  | { templateId: "guide-tickets"; content: GuideTicketsContent }
  | { templateId: "guide-seguros"; content: GuideSegurosContent }
  | { templateId: "guide-entrenamiento"; content: GuideEntrenamientoContent }
  | { templateId: "bento-minimal"; content: BentoMinimalContent };

// --- Valores por defecto ---
export const DEFAULT_GUIDE_RETAIL: GuideRetailContent = {
  resumen:
    "Un Agente IA Conversacional representado por un Avatar 3D interactivo, diseñado para operar como asistente virtual.",
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
    { titulo: "Ubicación de productos", ejemplos: ["¿Dónde están los martillos?", "¿Dónde encuentro taladros?"] },
    { titulo: "Ubicación de servicios", ejemplos: ["¿Dónde están las cajas?", "¿Dónde está servicio al cliente?"] },
    { titulo: "Proyectos de bricolaje", ejemplos: ["Quiero hacer un buró", "Necesito poner un estante"] },
  ],
  pasillos: [
    { num: 3, area: "Herramientas manuales" },
    { num: 5, area: "Herramientas eléctricas" },
    { num: 7, area: "Electricidad" },
    { num: 9, area: "Plomería" },
    { num: 11, area: "Pinturas" },
    { num: 14, area: "Ferretería" },
    { num: 18, area: "Jardinería" },
  ],
  capacidades: [
    "Localizar productos dentro de pasillos definidos",
    "Dar instrucciones caminando desde la entrada principal",
    "Orientar dentro del layout de tienda",
    "Operar 100% en español con pronunciación adecuada",
  ],
  limitaciones: [
    "No consulta inventario en tiempo real",
    "No entrega precios exactos",
    "No inventa productos o categorías fuera del alcance",
  ],
};

export const DEFAULT_GUIDE_TICKETS: GuideTicketsContent = {
  resumen:
    "Asistente virtual de Mesa de Servicio de TI que atiende por chat. Levanta tickets a partir de conversación guiada, clasifica correctamente cada solicitud y captura la información necesaria antes de crear el ticket.",
  flujo: [
    { letra: "A", titulo: "Validación del solicitante", contenido: "El bot saluda y pide tu nombre completo." },
    { letra: "B", titulo: "Entender la solicitud", contenido: "El usuario describe su problema o necesidad." },
    { letra: "C", titulo: "Clasificación con Catálogo", contenido: "Selecciona la categoría exacta del catálogo." },
    { letra: "D", titulo: "Recolección de datos", contenido: "Recopila todos los campos necesarios." },
    { letra: "E", titulo: "Confirmación", contenido: 'Muestra resumen y pregunta "¿La información es correcta?"' },
    { letra: "F", titulo: "Creación del ticket", contenido: "Crea el ticket y confirma el folio." },
  ],
  catalogoClientes: {
    nota: "Durante el piloto, el bot solo podrá crear tickets si el solicitante está en el catálogo.",
    clientes: ["Usuario 1 (IdCliente 001)", "Usuario 2 (IdCliente 002)"],
  },
  mensajeExito:
    "✅ Tu ticket ha sido creado exitosamente. Recibirás un correo con el número de folio. ¿Hay algo más en lo que pueda ayudarte?",
  ejemplosConversacion: [
    {
      titulo: "Ejemplo de interacción",
      tipo: "Incidente",
      intercambios: [
        { quien: "AsistenteIT", mensaje: "Gracias por contactar, ¿en qué puedo ayudarte?" },
        { quien: "Usuario", mensaje: "No puedo entrar a mi correo." },
        { quien: "AsistenteIT", mensaje: "Para ayudarte, necesito tu nombre completo." },
      ],
    },
  ],
  pruebasDelCiclo: {
    objetivo: "Probar el ciclo completo: usuario levanta ticket, ticket queda clasificado, llega al analista correspondiente.",
    areas: ["Soporte Técnico", "Incidentes", "Redes"],
  },
  reglasClave: [
    "No se muestran datos internos del sistema",
    "No se inventan categorías; todo viene del catálogo",
    "No hay ticket sin IdCliente válido",
  ],
  puntosDemo: [
    "Validación del usuario contra el catálogo",
    "Clasificación correcta del ticket",
    "Confirmación antes de crearlo",
    "Mensaje final de creación",
  ],
};

export const DEFAULT_GUIDE_SEGUROS: GuideSegurosContent = {
  objetivo: {
    descripcion:
      "El agente conversacional ofrece de manera clara y responsable un seguro voluntario de accidentes personales.",
    duranteConversacion: [
      "Saluda e identifica al cliente",
      "Presenta el beneficio del seguro",
      "Valida información básica",
      "Explica coberturas y costo",
      "Permite registrar beneficiarios",
      "Solicita autorizaciones legales",
      "Finaliza la venta o cierra la conversación respetando la decisión del cliente",
    ],
    cierre:
      "El agente mantiene tono profesional, empático y orientado a ayudar, evitando presionar al cliente.",
  },
  estiloComunicacion: {
    titulo: "Estilo de comunicación del agente",
    descripcion: "El agente utiliza un estilo conversacional diseñado para generar confianza.",
    tonos: ["Amable y cercano", "Profesional y claro", "Empático y respetuoso", "Conversacional"],
  },
  gestionConversacion: {
    titulo: "Gestión de la conversación",
    descripcion:
      "Después de cada explicación importante el agente hace una pregunta al cliente para validar comprensión.",
    ejemplosValidacion: [
      "¿Hasta aquí me he explicado bien?",
      "¿Qué opinas de esta información?",
      "¿Te queda clara esta parte?",
    ],
    silencio: 'Si el cliente guarda silencio: "¿Me escuchas bien?"',
    breve: 'Si responde brevemente: "¿Hay algo específico que te gustaría que te aclare?"',
  },
  flujo: [
    { numero: 1, titulo: "Saludo y presentación", contenido: "El agente se presenta y confirma al cliente." },
    { numero: 2, titulo: "Aviso legal", contenido: "Se informa sobre grabación de la llamada." },
    { numero: 3, titulo: "Presentación del beneficio", contenido: "Se explica el seguro voluntario." },
    { numero: 4, titulo: "Validación de identidad", contenido: "Se confirman datos del cliente." },
    { numero: 5, titulo: "Explicación del seguro", contenido: "Se presentan coberturas principales." },
  ],
  manejoObjeciones: {
    introduccion: "El agente maneja objeciones de manera respetuosa y empática.",
    proceso: [
      "Escuchar la inquietud",
      "Reconocer su preocupación",
      "Explicar la información",
      "Validar si la duda fue resuelta",
    ],
    ejemplosComunes: [
      {
        titulo: "Cliente no está interesado",
        descripcion: "El agente responde con empatía y ofrece información breve.",
        ejemplo: '"Entiendo perfectamente. Solo quiero comentarle brevemente cómo funciona el beneficio."',
      },
    ],
    notaFinal: "Si el cliente decide no contratar, el agente finaliza la conversación de manera cordial.",
    principios: ["Escuchar al cliente", "Mostrar empatía", "Explicar claramente", "Respetar la decisión"],
  },
  resultadoEsperado:
    "El cliente recibe una explicación clara del seguro y puede tomar una decisión informada.",
};

export const DEFAULT_GUIDE_ENTRENAMIENTO: GuideEntrenamientoContent = {
  objetivo: {
    descripcion:
      "El Bot Entrenador Banorte es una herramienta diseñada para capacitar agentes de contact center mediante simulaciones realistas de llamadas con clientes. Durante el entrenamiento el bot simula ser un cliente real de Banorte, presenta situaciones comunes del servicio al cliente, permite al agente practicar manejo de llamadas y evalúa el desempeño al finalizar la simulación.",
    habilidadesClave: [
      "Atención al cliente",
      "Manejo de situaciones difíciles",
      "Comunicación profesional",
      "Resolución de problemas",
    ],
  },
  comoFunciona: {
    dinamica: [
      "El bot inicia la simulación.",
      "El agente debe atender la llamada como si fuera un cliente real.",
      "El bot responde de acuerdo con un escenario específico.",
      "Al finalizar la interacción, el bot realiza una evaluación del desempeño.",
    ],
    mensajeInicio:
      "Iniciando entrenamiento, soy tu cliente simulado listo para comenzar, por favor inicia como lo harías con un cliente real cuando ya recibes la llamada.",
  },
  escenarios: [
    {
      numero: 1,
      titulo: "Cliente muy molesto",
      situacion: "Cargos no reconocidos en tarjeta Banorte.",
      caracteristicasCliente: [
        "Alto nivel de enojo",
        "Frases cortas y directas",
        "Exige solución inmediata",
        "Interrumpe respuestas poco claras",
      ],
      agenteDebe: [
        "Empatía",
        "Control de la situación",
        "Explicación clara del proceso de investigación.",
      ],
    },
    {
      numero: 2,
      titulo: "Cliente apresurado",
      situacion: "El cliente quiere conocer su saldo inmediatamente.",
      caracteristicasCliente: [
        "Habla rápido",
        "Presiona al agente",
        "Inicialmente no quiere validar datos",
      ],
      agenteDebe: [
        "Mantener control de la llamada",
        "Solicitar correctamente los datos de validación",
        "Seguir el proceso de seguridad antes de proporcionar información.",
      ],
    },
    {
      numero: 3,
      titulo: "Cliente confundido",
      situacion: "El cliente ve un adeudo que no reconoce.",
      caracteristicasCliente: [
        "Tono inseguro",
        "Repite preguntas",
        "Necesita orientación paso a paso",
      ],
      agenteDebe: [
        "Explicar claramente",
        "Guiar la conversación",
        "Confirmar comprensión del cliente.",
      ],
    },
  ],
  realismo: {
    descripcion:
      "El bot reproduce comportamientos reales de clientes como molestia o frustración, prisa por resolver o confusión sobre productos bancarios.",
    comportamientos: [
      "Molestia o frustración",
      "Prisa o presión por resolver",
      "Confusión sobre productos bancarios",
    ],
    expresionEmocion: [
      "Frases cortas",
      "Repetición de ideas",
      "Uso ocasional de mayúsculas",
      "Ritmo de conversación variable según el escenario.",
    ],
  },
  manejoSilencios: {
    silencio15: "Después de 15 segundos sin respuesta, el bot preguntará: «¿Sigues ahí?»",
    silencio30:
      "Después de 30 segundos de silencio, el sistema finaliza la simulación, genera automáticamente la evaluación del agente y presenta los resultados.",
  },
  evaluacion: {
    incluye: [
      "Calificación general",
      "Análisis de habilidades clave",
      "Retroalimentación detallada",
      "Recomendaciones de mejora",
    ],
    criterios: [
      {
        titulo: "Empatía",
        descripcion: "Capacidad del agente para demostrar comprensión de la situación del cliente.",
      },
      {
        titulo: "Tranquilidad",
        descripcion: "Capacidad para mantener control de la conversación y explicar claramente los procesos.",
      },
      {
        titulo: "Garantía de servicio",
        descripcion: "Capacidad de confirmar que el problema del cliente ha sido solucionado.",
      },
    ],
    elementosOperativos: [
      "Saludo profesional",
      "Identificación del agente",
      "Agradecimiento al cliente",
      "Confirmación de solución",
      "Oferta de ayuda adicional",
      "Mención de encuesta de satisfacción",
      "Despedida profesional",
    ],
  },
  calificacion: {
    filas: [
      { rango: "9 – 10", interpretacion: "Nivel Contact Center Aprobado" },
      { rango: "6 – 8", interpretacion: "Nivel Aceptable con áreas de mejora" },
      { rango: "0 – 5", interpretacion: "Requiere reentrenamiento" },
    ],
    indicadores: [
      "Fortalezas del agente",
      "Áreas de mejora",
      "Recomendaciones para futuras llamadas.",
    ],
  },
  repeticion:
    "Después de la evaluación, el sistema preguntará al agente: «¿Desea realizar otra simulación de entrenamiento con un escenario diferente?» Si responde Sí, se iniciará un nuevo escenario. Si responde No, el sistema finalizará la sesión.",
  resultadoEsperado:
    "El uso continuo del Bot Entrenador permite mejorar la preparación de agentes, simular situaciones reales de atención, identificar áreas de mejora y elevar la calidad del servicio al cliente.",
  duracion: "Entre 10 y 15 minutos por simulación.",
};

export const DEFAULT_BENTO_MINIMAL: BentoMinimalContent = {
  cards: [
    {
      title: "Inicia una conversación",
      description:
        "Haz clic en el botón para abrir el chat con tu agente. El bot está disponible 24/7 para asistirte.",
      icon: "💬",
    },
    {
      title: "Pregunta lo que necesites",
      description:
        "El agente comprende lenguaje natural. Formula tus preguntas de forma clara y obtendrás respuestas útiles.",
      icon: "❓",
    },
    {
      title: "Sigue las guías",
      description: "Consulta las guías para conocer las capacidades del bot y cómo sacarle el máximo provecho.",
      icon: "📚",
    },
  ],
};

// --- Helpers de parse y validación ---
export function getDefaultContent(templateId: TemplateId):
  | GuideRetailContent
  | GuideTicketsContent
  | GuideSegurosContent
  | GuideEntrenamientoContent
  | BentoMinimalContent {
  switch (templateId) {
    case "guide-retail":
      return DEFAULT_GUIDE_RETAIL;
    case "guide-tickets":
      return DEFAULT_GUIDE_TICKETS;
    case "guide-seguros":
      return DEFAULT_GUIDE_SEGUROS;
    case "guide-entrenamiento":
      return DEFAULT_GUIDE_ENTRENAMIENTO;
    case "bento-minimal":
      return DEFAULT_BENTO_MINIMAL;
    default:
      return DEFAULT_BENTO_MINIMAL;
  }
}

const schemaMap = {
  "guide-retail": guideRetailSchema,
  "guide-tickets": guideTicketsSchema,
  "guide-seguros": guideSegurosSchema,
  "guide-entrenamiento": guideEntrenamientoSchema,
  "bento-minimal": bentoMinimalSchema,
} as const;

export function parseLandingContent(
  templateId: TemplateId,
  raw: string | null | undefined
):
  | GuideRetailContent
  | GuideTicketsContent
  | GuideSegurosContent
  | GuideEntrenamientoContent
  | BentoMinimalContent {
  if (!raw) {
    return getDefaultContent(templateId);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return getDefaultContent(templateId);
  }
  const schema = schemaMap[templateId];
  const result = schema.safeParse(parsed);
  if (result.success) {
    return result.data;
  }
  return getDefaultContent(templateId);
}
