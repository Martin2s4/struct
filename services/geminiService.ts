import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateJobDescription = async (title: string, location: string, keyPoints: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key missing for Gemini.");
    return "API Key missing. Please provide a manual description.";
  }

  try {
    const prompt = `
      You are an expert civil engineering recruiter for a futuristic construction firm.
      Write a compelling, professional, and slightly futuristic job description for the following role:
      
      Role Title: ${title}
      Location: ${location}
      Key Responsibilities/Notes: ${keyPoints}
      
      Keep it under 150 words. Focus on innovation, structural integrity, and sustainability.
      Do not include markdown formatting like bolding or headers, just plain text paragraphs.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating description. Please try again later.";
  }
};