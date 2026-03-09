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
  | BentoMinimalContent {
  switch (templateId) {
    case "guide-retail":
      return DEFAULT_GUIDE_RETAIL;
    case "guide-tickets":
      return DEFAULT_GUIDE_TICKETS;
    case "guide-seguros":
      return DEFAULT_GUIDE_SEGUROS;
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
  "bento-minimal": bentoMinimalSchema,
} as const;

export function parseLandingContent(
  templateId: TemplateId,
  raw: string | null | undefined
):
  | GuideRetailContent
  | GuideTicketsContent
  | GuideSegurosContent
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
