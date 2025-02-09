import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";


const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_PUBLIC_KEY);





const model = genAI.getGenerativeModel({ model: "tunedModels/aistrolog-a1papf5qlakx", safetySettings});
const model2 = genAI.getGenerativeModel({ model: "gemini-1.0-pro", safetySettings,});

export { model, model2 };
