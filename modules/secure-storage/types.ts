export const StorageKeys = {
    "geminiApiKey":"",
    "userData":""
}
export type SecureStorageKeyType = keyof typeof StorageKeys;
export type GeminiDataType = {
    key: SecureStorageKeyType;  
    geminiApiKey: string;
}
export type UserDataType = {
    key: SecureStorageKeyType;
    name: string ;
    contact:string; 
    email: string ;
    adhar_number: string;
    pan_number: string;
    passport_number: string;
    voter_id: string;
    occupation: "STUDENT" | "WORKING_PROFESSIONAL";
    studentInfo: {
        college_name: string ;
        course: string ;
        branch:string;
        section: string ;
        year: string ;
        gpa : string ;
        skills: string;
        working_experience: string ;
    }
    WorkingProfessionaInfo: {
        company_name: string ;
        job_title: string ;
        years_of_experience: string ;
        skills: string;
    }
    resume_link: string ;
    github_profile: string ;
    linkedin_profile: string ;
    twitter_profile: string ;
    achievements_summary: string ;

}

export type SecureStorageDataType =  GeminiDataType | UserDataType;