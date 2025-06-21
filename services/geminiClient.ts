export const getGeminiCompletions = async (prompt: string, GeminiApiKey: string) => {
    try{

    let res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GeminiApiKey}`, {
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
    if(res.ok){ 

        let response : string=  data["candidates"][0]["content"]["parts"][0]["text"]
        response =  response.trim().split("```javascript")[1].trim().split("```")[0].trim()
        return response
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