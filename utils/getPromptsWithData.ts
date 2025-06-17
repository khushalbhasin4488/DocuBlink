import { prompts } from "@/constants/prompts";

export const getPromptWithData= (promptKey: keyof typeof prompts , data: Record<string, any>) :string=> {
  let prompt= prompts[promptKey];
  if (!prompt) {
    throw new Error(`Prompt with key "${promptKey}" not found`);
  }
  let promptWithData = prompt.replace(/\{(\w+)\}/g, (_, key) => {
    if (key in data) {
      return data[key];
    } else {
      throw new Error(`Data for key "${key}" not provided`);
    }
  }
  );
  return promptWithData;
}

