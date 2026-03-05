/**
 * Contenido de la guía AsistenteIT (OpenSer) - DelSol
 * Instrucciones de uso y guía para pruebas del ciclo piloto
 */

export const delsolGuide = {
  resumen: `AsistenteIT es un asistente virtual de Mesa de Servicio de TI que atiende por chat en español (México) y se enfoca en: levantar tickets en OpenSer a partir de una conversación guiada; clasificar correctamente cada solicitud usando el Catálogo de Servicios (incidente vs requerimiento, categoría correcta y datos requeridos); capturar la información mínima necesaria antes de crear el ticket; confirmar con el usuario un resumen legible y, solo con aprobación, crear el ticket; consultar tickets a groso modo (estatus/resumen) cuando aplique. Importante: el bot no resuelve el problema; solo clasifica y levanta tickets (y puede apoyar en consulta general de tickets).`,

  flujo: [
    {
      letra: "A",
      titulo: "Validación del solicitante (Catálogo de Clientes)",
      contenido:
        "El bot saluda y pide tu nombre completo tal como aparece en el sistema. Busca el IdCliente en el Catálogo de Clientes. Si no encuentra coincidencia exacta, propone hasta 3 opciones similares. Si después de 2 intentos no logra identificar al usuario, transfiere con un agente humano. Regla crítica: no se crea ticket sin IdCliente válido.",
    },
    {
      letra: "B",
      titulo: "Entender la solicitud (sin asumir)",
      contenido:
        "El usuario describe su problema o necesidad. El bot determina si es Incidente (ya debería funcionar y no funciona) o Requerimiento (algo nuevo/planeado: altas, accesos, instalaciones, cambios). Si la solicitud es ambigua, el bot hace preguntas de clarificación antes de seleccionar categoría.",
    },
    {
      letra: "C",
      titulo: "Clasificación con Catálogo de Servicios",
      contenido:
        "Selecciona la categoría exacta del catálogo y toma los datos requeridos (sin mostrar valores internos).",
    },
    {
      letra: "D",
      titulo: "Recolección de datos",
      contenido: "Recopila todos los campos necesarios según la categoría.",
    },
    {
      letra: "E",
      titulo: "Confirmación",
      contenido:
        'Muestra un resumen legible y pregunta "¿La información es correcta?" Solo con "Sí" continúa.',
    },
    {
      letra: "F",
      titulo: "Creación del ticket",
      contenido: "Crea el ticket y confirma al usuario que se generó el folio.",
    },
  ],

  catalogoClientes: {
    nota:
      "Durante el piloto, el bot solo podrá crear tickets si el solicitante está dentro de este catálogo (por nombre completo). Si el cliente quiere que más personas participen en las pruebas del ciclo, sus nombres deben agregarse al catálogo; si no, el bot forzosamente escalará a humano.",
    clientes: [
      "Mario Alejandro Ibarra Solano (IdCliente 204)",
      "Rolando Cavazos Muñoz (IdCliente 23)",
      "Ivan Andres Silva (IdCliente 54)",
      "Guillermo Ocegueda Gonzalez (IdCliente 44)",
      "Maricela Contreras Gonzalez (IdCliente 1895)",
      "Nancy Lizeth Ascencion de la Cruz (IdCliente 3004)",
      "Patricia Moreno Villalvazo (IdCliente 1896)",
      "Ivonne Hernandez (IdCliente 1897)",
      "Evangelina Iñiguez García (IdCliente 540)",
    ],
  },

  pruebasDelCiclo: {
    objetivo:
      "El objetivo del piloto es probar en vivo el ciclo completo: usuario levanta ticket con AsistenteIT; ticket queda correctamente clasificado (tipo/categoría); llega al analista/grupo correspondiente; se valida que el analista lo recibe y continúa el flujo normal en OpenSer; se confirma seguimiento/estatus general.",
    areas: [
      "Soporte Técnico",
      "Incidentes",
      "Ciberseguridad",
      "Redes",
      "PDV (horario extendido)",
      "Restaurantes (horario extendido)",
    ],
  },

  reglasClave: [
    "No se muestran datos internos del sistema (IDs, impacto, urgencia, grupo)",
    "No se inventan categorías; todo viene del catálogo",
    "Si hay múltiples categorías posibles, el bot pregunta y no asume",
    "No hay ticket sin IdCliente válido (si no existe en catálogo, se escala a humano)",
  ],

  mensajeExito:
    "✅ Tu ticket ha sido creado exitosamente. Recibirás un correo con el número de folio y actualizaciones. ¿Hay algo más en lo que pueda ayudarte?",

  ejemplosConversacion: [
    {
      titulo: "Ejemplo de interacción correcta (Incidente – correo)",
      tipo: "Incidente",
      intercambios: [
        {
          quien: "AsistenteIT",
          mensaje:
            "Gracias por contactar al Centro de Atención y Servicio, ¿en qué puedo ayudarte?",
        },
        { quien: "Usuario", mensaje: "No puedo entrar a mi correo." },
        {
          quien: "AsistenteIT",
          mensaje:
            "Para ayudarte, necesito tu nombre completo tal como aparece en el sistema.",
        },
        { quien: "Usuario", mensaje: "Rolando Cavazos Muñoz" },
        {
          quien: "Nota",
          mensaje:
            "El bot busca silenciosamente en el catálogo de clientes y encuentra el registro. Rolando Cavazos Muñoz está registrado como cliente válido en el catálogo.",
        },
        {
          quien: "AsistenteIT",
          mensaje:
            "Gracias Rolando. ¿Eres de CEDIS, Corporativo México o Corporativo?",
        },
        { quien: "Usuario", mensaje: "Corporativo México." },
        {
          quien: "AsistenteIT",
          mensaje:
            "Entiendo. ¿El problema es que no puedes iniciar sesión, o el correo abre pero presenta algún error?",
        },
        {
          quien: "Usuario",
          mensaje: "No puedo iniciar sesión, dice contraseña incorrecta.",
        },
        {
          quien: "AsistenteIT",
          mensaje:
            "¿Esto ocurre en Outlook o en la página web del correo?",
        },
        { quien: "Usuario", mensaje: "En Outlook." },
        {
          quien: "AsistenteIT",
          mensaje: `📋 Resumen de tu solicitud

Categoría: Problema con correo (Outlook)
Tipo: Incidente

Información recopilada:
• Usuario: Rolando Cavazos Muñoz
• Área: Corporativo México
• Aplicación: Outlook
• Problema: No puede iniciar sesión, aparece contraseña incorrecta

¿La información es correcta?`,
        },
        { quien: "Usuario", mensaje: "Sí." },
        {
          quien: "AsistenteIT",
          mensaje:
            "✅ Tu ticket ha sido creado exitosamente. Recibirás un correo con el número de folio y las actualizaciones del caso. ¿Hay algo más en lo que pueda ayudarte?",
        },
      ],
    },
    {
      titulo: "Ejemplo 2 (Requerimiento – instalación de software)",
      tipo: "Requerimiento",
      intercambios: [
        {
          quien: "AsistenteIT",
          mensaje:
            "Gracias por contactar al Centro de Atención y Servicio, ¿en qué puedo ayudarte?",
        },
        { quien: "Usuario", mensaje: "Necesito instalar antivirus." },
        {
          quien: "AsistenteIT",
          mensaje:
            "Para ayudarte, necesito tu nombre completo tal como aparece en el sistema.",
        },
        { quien: "Usuario", mensaje: "Mario Alejandro Ibarra Solano" },
        {
          quien: "Nota",
          mensaje:
            "El bot encuentra el registro en el catálogo de clientes. Mario Alejandro Ibarra Solano está registrado como cliente válido.",
        },
        {
          quien: "AsistenteIT",
          mensaje:
            "Gracias Mario. ¿Eres de CEDIS, Corporativo México o Corporativo?",
        },
        { quien: "Usuario", mensaje: "CEDIS." },
        {
          quien: "AsistenteIT",
          mensaje:
            "Perfecto. ¿La instalación es para tu computadora de trabajo?",
        },
        { quien: "Usuario", mensaje: "Sí." },
        {
          quien: "AsistenteIT",
          mensaje: `📋 Resumen de tu solicitud

Categoría: Instalación de antivirus
Tipo: Requerimiento

Información recopilada:
• Usuario: Mario Alejandro Ibarra Solano
• Área: CEDIS
• Solicitud: Instalación de antivirus
• Equipo: Computadora de trabajo

¿La información es correcta?`,
        },
        { quien: "Usuario", mensaje: "Sí." },
        {
          quien: "AsistenteIT",
          mensaje:
            "✅ Tu ticket ha sido creado exitosamente. Recibirás un correo con el número de folio y las actualizaciones del caso. ¿Hay algo más en lo que pueda ayudarte?",
        },
      ],
    },
  ],

  puntosDemo: [
    "Validación del usuario contra el catálogo",
    "Preguntas de clarificación",
    "Clasificación correcta del ticket",
    "Confirmación antes de crearlo",
    "Mensaje final de creación",
  ],
} as const;
