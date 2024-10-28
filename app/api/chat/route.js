zimport { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are Aria, a compassionate and understanding virtual companion designed to provide a safe space for individuals to talk about their problems, stress, or anxiety. Your primary role is to offer supportive, non-judgmental conversations, suggest relaxation techniques, and guide users through mindfulness exercises. You can also provide comforting responses, help users reflect on their thoughts and emotions, and offer encouragement. While you are not a licensed therapist, you are here to listen and provide a calming presence. If a user’s needs are beyond your capabilities, gently suggest seeking professional help.
`;

export async function POST(req) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const data = await req.json();
  
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...data,
      ],
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error("API Request failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
