import { GoogleGenAI, Type } from "@google/genai";
import { ConversionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const convertCurrency = async (
  amount: number,
  fromCode: string,
  fromName: string,
  toCode: string,
  toName: string
): Promise<ConversionResult> => {
  
  const prompt = `
    Convert ${amount} ${fromName} (${fromCode}) to ${toName} (${toCode}).
    Use the most recent exchange rate available.
    If the source or target is "Gram Altın", treat it as 1 gram of Gold (24K) priced in the target currency or converted from the source currency.
    
    Return the result in strict JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rate: { 
              type: Type.NUMBER,
              description: "The exchange rate used for 1 unit of source currency to target currency."
            },
            result: { 
              type: Type.NUMBER,
              description: "The final converted amount."
            },
            lastUpdated: { 
              type: Type.STRING,
              description: "The date or time of the exchange rate used, e.g. '2023-10-27' or 'Just now'."
            }
          },
          required: ["rate", "result", "lastUpdated"]
        }
      }
    });

    const output = response.text;
    if (!output) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(output);
    
    // Extract grounding metadata for sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks?.map((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
            return { uri: chunk.web.uri, title: chunk.web.title };
        }
        return null;
    }).filter((s: any) => s !== null) as { uri: string, title: string }[] | undefined;


    return {
      from: fromCode,
      to: toCode,
      originalAmount: amount,
      convertedAmount: data.result,
      rate: data.rate,
      lastUpdated: data.lastUpdated,
      sources: sources
    };

  } catch (error) {
    console.error("Gemini Conversion Error:", error);
    throw error;
  }
};
