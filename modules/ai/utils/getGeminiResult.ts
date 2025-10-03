
export const getGeminiResult = async (input: string, apiKey: string) => {
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
          },
          body: JSON.stringify({
            'contents': [
              {
                'parts': [
                  {
                    'text':input
                  }

                ]
              }
            ]
          })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Gemini result");
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Invalid Gemini Api Key", error);
        throw error;
    }
}