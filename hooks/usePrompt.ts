import { prompts } from "../constants/prompts";

export const usePrompt = (promptName: keyof typeof prompts, data: Record<string,any>) => {
   let promptobj = prompts[promptName];
   if (!promptobj) {
      throw new Error(`Prompt with name ${promptName} does not exist`);
   }
   let prompt = promptobj.prompt;
   let promptKeys = Object.keys(data);
   let promptWithData = prompt;
   promptKeys.forEach((key) => {
      if (data[key] === undefined || data[key] === null) {
         console.error(`Data for key ${key} is undefined or null`);
      }
      promptWithData = promptWithData.replace(`{{${key}}}`, data[key]);
   });
   if (promptWithData.includes("{{")) {
      console.error(`Not all placeholders in the prompt were replaced. Remaining placeholders: ${promptWithData.match(/{{\w+}}/g)?.join(", ")}`);
   }
   console.log(promptWithData)
   promptWithData = promptWithData.trim();
   return promptWithData;
}