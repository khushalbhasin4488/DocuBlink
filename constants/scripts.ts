export const scripts = {
    "get-cookies":`
    let timeout =setTimeout(() => {
      window.ReactNativeWebView.postMessage(document.cookie);
    }, 2000);  // Give some time for the page to load cookies
    true;
  `,
  "fill-form":`setTimeout(() => {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
      const labelId = input.getAttribute('aria-labelledby');
      if (labelId) {
        const label = document.getElementById(labelId.split(' ')[0]);
        if (label) {
          const questionText = label.innerText.toLowerCase();

          if (questionText.includes('name') && !questionText.includes('survey') ) {
            input.value = 'name';
          } else if (questionText.includes('pan card') && !questionText.includes('survey')) {
            input.value = 'pan_number';
          } else if (questionText.includes('adhaar') && !questionText.includes('survey')) {
            input.value = 'adhaar_number';
          } else if (questionText.includes('email') && !questionText.includes('survey')) {
            input.value = 'email_id';
          } else if (questionText.includes('phone') && !questionText.includes('survey')) {
            input.value = 'phone_number';
          } else if (questionText.includes('portfolio') && !questionText.includes('survey')) {
            input.value = 'portfolio_id';
          }
        }
      }
    });
  }, 1000);`
}