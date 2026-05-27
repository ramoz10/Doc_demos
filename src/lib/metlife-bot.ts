/** Agente PrymeNet "Metlife 3" (voice bot embebido en la landing). */
export const METLIFE_PRYMENET_AGENT_ID =
  "agent_7501kjwm6f17fter0d3886rt38x0";

export const PRYMENET_VOICE_BOT_ORIGIN = "https://prymenet.contexta.com.mx";

export function buildMetlifePrymenetEmbedUrl(baseUrl?: string | null): string {
  const origin = (baseUrl || PRYMENET_VOICE_BOT_ORIGIN).split("?")[0];
  const url = new URL(origin);
  url.searchParams.set("agent_id", METLIFE_PRYMENET_AGENT_ID);
  url.searchParams.set("hide_selector", "1");
  url.searchParams.set("lock", "metlife");
  return url.toString();
}
