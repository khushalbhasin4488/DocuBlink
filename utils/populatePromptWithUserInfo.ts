import { UserDataType } from "@/modules/secure-storage/types";

export const PopulatePromptWithUserInfo = (prompt: string, userInfo: UserDataType): string => {
   // extract everything from user data type
    const userInfoEntries = Object.entries(userInfo);
    console.log(userInfoEntries)
    const userInfoMap: Record<string, string> = {};
    userInfoEntries.forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' && key!== 'studentInfo' && key !== 'WorkingProfessionaInfo') {
            userInfoMap[key] = String(value);
        }
    });
    for (let key in userInfo.studentInfo) {
        if (userInfo.studentInfo.hasOwnProperty(key)) {
            userInfoMap[`${key}`] = String((userInfo.studentInfo as any)[key]);
        }
    }
    for (let key in userInfo.WorkingProfessionaInfo) {
        if (userInfo.WorkingProfessionaInfo.hasOwnProperty(key)) {
            userInfoMap[`${key}`] = String((userInfo.WorkingProfessionaInfo as any)[key]);
        }
    }
    // Replace placeholders in the prompt with user info
    let populatedPrompt = prompt;
    Object.entries(userInfoMap).forEach(([key, value]) => {
        const placeholder = `__${key.toUpperCase()}__`;
        
        populatedPrompt = populatedPrompt.replace(new RegExp(placeholder, 'g'), value);
    }); 
    return populatedPrompt;
}