import { prompts } from "../constants/prompts"

export const usePrompt = (promptName: keyof typeof prompts, data: Record<string,any>) => {
   return prompts[promptName] + `here is the data ${JSON.stringify(data)}`
}