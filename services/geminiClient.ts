const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY
export const getGeminiCompletions = async (prompt: string) => {
    try{

    let res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                "contents": [
                  {
                    "parts": [
                      {
                       "text": prompt, 
                      }
                    ]
                  }
                ]
        }),
    })
    let data = await res.json()
    console.log("data", data)
    if(res.ok){ 

        let response =  data["candidates"][0]["content"]["parts"][0]["text"]
        console.log("response", response)
        return response.substring(13, response.length -16)
        
    }
    else{
        console.log("error", data)
        return null
    }
}
    catch(err){
        console.log("error in gemini client", err)
        return null
    }
}