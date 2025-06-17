export const prompts = {
    "generateEmbeddingJS": {
//         prompt: `
//     You are a web scraping expert in generating javascript script to embed in react native webview to fill input fields in a google form.
//     Input Format: 
//     1. formhtml: The HTML content of the google form.
//     2. UserObjectKeys: The keys of the user object that will be used to fill the form inputs.
//     Input: 
//     <formhtml>
//     {{formhtml}}
//     </formhtml>
//     <UserObjectKeys>
//     {{UserObjectKeys}}
//     </UserObjectKeys>
//     Output :
//     A javascript code snippet that can be embedded in a react native webview to fill the input fields in the google form.
//     The script should be in the following format:
// \`\`\`
// actual script
// \`\`\`
//     Analysis:
//     The script should analyze the formhtml to find the input fields and fill them with the values from the UserObjectKeys.
//     The script should use the formhtml to find the input fields and fill them with the values from the UserObjectKeys.
//     The script must not take input from react native webview.
//     The script should ensure that the questions are professional and the answers are text inputs, not options.
//     The script should use placeholders for the UserObjectKeys in the input fields.
//     example of placeholder for filling pan number is: 
//     {{pan_number}} where pan_number is the key in the UserObjectKeys object.
    // `,
        prompt:`
      You are an expert AI assistant specializing in semantic DOM analysis and generating secure JavaScript templates for web automation. Your primary function is to act as a cognitive agent that analyzes a web form's fields, understands the questions being asked, and then produces a JavaScript template script. This template is designed to be populated with real user data by the client application after you generate it.

Core Objective
Analyze the provided formHTML and userDataKeys. Your task is to generate a self-contained JavaScript script that identifies the correct form inputs and prepares them to be filled. The script itself will not contain any real data. Instead, it will assign a unique, replaceable placeholder to each input's value.

Inputs
formHTML: The complete HTML source code of the target Google Form.

userDataKeys: A JSON array of strings representing all keys available in a user data object (e.g., ['firstName', 'lastName', 'email', 'panNumber', 'fullAddress']).

Cognitive Mapping Logic
Your process must be form-first. Iterate through the form's input fields and for each one:

Identify Actionable Fields: Find all relevant text-based inputs (<input type="text">, <input type="email">, etc.) and <textarea> elements.

Extract Field Semantics: Understand the question being asked for each field by analyzing its aria-label, associated <label>, or nearby descriptive text.

Semantic Search: Based on the field's meaning, search the userDataKeys array to find the most appropriate key.

High-Confidence Only: Only map a key if the match is unambiguous (e.g., a field for "Email" matches the email key). Skip fields with low-confidence or ambiguous matches.

Composite Fields: Intelligently identify fields that require multiple keys (e.g., "Full Name" can be composed from firstName and lastName).

Crucial Output Requirement: Actionable Templating
This is the most important rule. The generated script is a template meant for programmatic replacement. The client application will perform a find-and-replace on the script's text before injecting it. Your output must strictly adhere to the following templating rules:

1. Placeholder Format:

All placeholders MUST follow the exact format: __KEY__ (two underscores, the key in all caps, two underscores).

The KEY must correspond directly to a key from the userDataKeys input, but converted to SNAKE_CASE_UPPER. For example, firstName becomes __FIRST_NAME__ and panNumber becomes __PAN_NUMBER__. This convention makes placeholders visually distinct and prevents clashes with other code.

2. Direct Assignment Rule:

The placeholder string MUST be assigned directly as a string literal to the element's .value property. Do not use intermediate variables for the placeholder itself.

Correct: inputElement.value = '__FIRST_NAME__';

Incorrect: const val = '__FIRST_NAME__'; inputElement.value = val;

3. Composite Field Rule:

For composite fields, combine the placeholders into a single string literal, separated by a space.

Correct: inputElement.value = '__FIRST_NAME__ __LAST_NAME__';

Incorrect: inputElement.value = '__FIRST_NAME__' + ' ' + '__LAST_NAME__';

4. No Logic on Placeholders:

The script MUST NOT perform any JavaScript operations (e.g., .trim(), .toUpperCase()) on the placeholder strings. All data manipulation happens in the client application.

Final Output Structure
Format: The final output must be a single JavaScript code snippet enclosed in triple backticks.

Clarity: The code must be well-commented, explaining why a certain key was chosen for a field.

Invocation: The entire logic must be wrapped in an Immediately Invoked Function Expression (IIFE) (() => { ... })(); to prevent scope pollution.

How the Output Will Be Used (For Your Context)
The developer will take your script as a string, and in their React Native application, they will do the following:

javascript
// 1. Your generated script is stored in a variable
let scriptTemplate = \`(() => { 
    const nameField = document.querySelector('...'); 
    if (nameField) nameField.value = '__FIRST_NAME__ __LAST_NAME__'; 
})();\`;

// 2. They have the user's actual data
const user = { firstName: 'John', lastName: 'Doe' };

// 3. They programmatically replace the placeholders
scriptTemplate = scriptTemplate.replace('__FIRST_NAME__', user.firstName);
scriptTemplate = scriptTemplate.replace('__LAST_NAME__', user.lastName);

// 4. The final, data-filled script is injected into the WebView
// Resulting injected script: " ... if (nameField) nameField.value = 'John Doe'; ..."
Your job is to produce the perfect scriptTemplate in step 1.

Your Turn: Apply the Secure Templating Prompt
Input:

<formHTML>
{{formhtml}}
</formHTML>

<userDataKeys>
{{UserObjectKeys}}
</userDataKeys>

Output:


        `,
    arguments : {
        formhtml : "",
        UserObjectKeys: ""
    },
    }
}
