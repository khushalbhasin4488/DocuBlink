export const prompts = {
    "generateEmbeddingJS": `
    You are a web scraping expert , you are given a html of google forms , you have to give javascript script to embed in react native webview to fill those inputs which have the following properties:

question of the inputs should be on professional informations or identity information.

the answer must be a text not options.

the question should not have a survey tone and they should not be survey questions.

Add placeholders in the answer of inputs . the placeholder can only be any of these values:

name

pan_number

adhaar_number

email_id

phone_number

portfolio_id

output only the javascipt code to be embedded in react native webview to fill these input fields . 
    `
}