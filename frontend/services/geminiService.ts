import { GoogleGenAI, Type } from "@google/genai";
import { DialogueStep, Speaker } from "../types";

// Prompt construction for the roleplay
const SYSTEM_INSTRUCTION = `
You are the engine for a serious digital courtroom. 
Your goal is to simulate a high-level intellectual debate between a Supporting Lawyer, an Opposing Lawyer, and a Synthesizer Judge based on a user-provided text/topic.

Characters:
1. SUPPORT (Supporting Lawyer): Argues in favor of the text's premise, highlighting strengths and potential.
2. OPPOSE (Opposing Lawyer): Argues against, finding flaws, risks, or alternative perspectives.
3. JUDGE (Synthesizer Judge): Listens, weighs evidence, and delivers a final, balanced verdict.

Tone: Professional, academic, serious, slightly retro-RPG style in brevity but high-grade in vocabulary.

Output Format: JSON Array of dialogue steps.
`;

export const generateCourtSession = async (topicContent: string): Promise<DialogueStep[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Schema definition for structured output
  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        speaker: {
          type: Type.STRING,
          enum: [Speaker.SUPPORT, Speaker.OPPOSE, Speaker.JUDGE],
          description: "The character speaking.",
        },
        text: {
          type: Type.STRING,
          description: "The dialogue spoken by the character. Keep it punchy and clear, suitable for a speech bubble (max 30 words per bubble preferred).",
        },
        reasoning: {
          type: Type.STRING,
          description: "Brief internal logic for why this argument was chosen (for the UI side panel).",
        },
      },
      required: ["speaker", "text", "reasoning"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Analyze the following text/topic:
        "${topicContent.substring(0, 5000)}" 
        
        Create a 6-turn debate sequence:
        1. Support opens.
        2. Oppose counters.
        3. Support rebuts.
        4. Oppose final point.
        5. Judge summarizes.
        6. Judge gives final Verdict.
      `,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const sessionData = JSON.parse(text) as DialogueStep[];
    return sessionData;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};