// /pages/api/transcribe.ts (Next.js Pages Router)
// or /app/api/transcribe/route.ts (App Router → change export accordingly)

import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import genAI from "@/lib/gemini";

export const config = {
  api: {
    bodyParser: false, // 🔴 Important: disable default body parser
  },
};

// Helper to read stream into buffer
const readFile = async (req: NextApiRequest): Promise<Buffer> => {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const buffer = await readFile(req);
    const audioBase64 = buffer.toString("base64");

    // Use Gemini Pro Speech (STT)
     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "audio/webm",
          data: audioBase64,
        },
      },
      { text: "Transcribe this audio into plain text." },
    ]);

    const text = result.response.text();

    return res.status(200).json({ text });
  } catch (err: any) {
    console.error("Gemini STT error:", err);
    return res.status(500).json({ error: "Transcription failed" });
  }
}
