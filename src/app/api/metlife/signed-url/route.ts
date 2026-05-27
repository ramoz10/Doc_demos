import { NextResponse } from "next/server";
import {
  METLIFE_ELEVENLABS_AGENT_ID,
  PRYMENET_SIGNED_URL_ENDPOINT,
} from "@/lib/metlife-bot";

export async function GET() {
  try {
    const url = new URL(PRYMENET_SIGNED_URL_ENDPOINT);
    url.searchParams.set("agent_id", METLIFE_ELEVENLABS_AGENT_ID);

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "No se pudo obtener signed URL desde PrymeNet." },
        { status: 502 },
      );
    }

    const signedUrl = (await response.text()).trim();
    if (!signedUrl.startsWith("wss://")) {
      return NextResponse.json(
        { error: "Signed URL inválida recibida desde PrymeNet." },
        { status: 502 },
      );
    }

    return NextResponse.json({ signedUrl });
  } catch {
    return NextResponse.json(
      { error: "Error interno generando signed URL." },
      { status: 500 },
    );
  }
}

