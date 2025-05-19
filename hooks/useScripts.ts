import { scripts } from "@/constants/scripts";

export const useScripts = (scriptName: keyof typeof scripts) => {

    return scripts[scriptName];
}