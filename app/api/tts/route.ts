import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { NextResponse } from "next/server";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text, voiceId } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const audio = await elevenlabs.textToSpeech.convert(
      voiceId || 'JBFqnCBsd6RMkjVDRZzb', // Default to requested voice ID
      {
        text: text,
        modelId: 'eleven_v3',
        outputFormat: 'mp3_44100_128',
      }
    );

    // The SDK returns a stream. We need to collect it into a buffer to send in the response.
    const chunks: Buffer[] = [];
    // @ts-ignore - The audio return type might need manual iteration handling for streams
    for await (const chunk of audio) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("ElevenLabs Error:", error);
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
  }
}
