export const scripts = {
    "get-cookies": `
    (function() {
        function sendCookies() {
            const cookies = document.cookie;
            console.log('Sending cookies:', cookies);
            window.ReactNativeWebView.postMessage(cookies);
        }

        // Try immediately
        sendCookies();

        // Also try after a delay to ensure page is loaded
         setTimeout(sendCookies, 2000);

        // And try when the page is fully loaded
        // if (document.readyState === 'complete') {
        //     sendCookies();
        // } else {
        //     window.addEventListener('load', sendCookies);
        // }

        // Log when script is injected
        // console.log('Cookie collection script injected');
        // true;
    })();
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
  }, 1000);`,
  "logout-google-account":`
            let timer = setTimeout(() => {    
                    window.location.href = "https://accounts.google.com/Logout";
            }
            , 1000);
            window.addEventListener("beforeunload", () => {
                clearTimeout(timer);
            });
  `,
  // 'logout-google-account':`
  //   (function() {
  //       function clearCookies() {
  //           const cookies = document.cookie.split("; ");
  //           for (let i = 0; i < cookies.length; i++) {
  //               const cookie = cookies[i];
  //               const eqPos = cookie.indexOf("=");
  //               const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //               document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  //           }
  //           console.log('All cookies cleared');
  //       }

  //       // Clear cookies immediately
  //       clearCookies();

  //       // Also clear cookies after a delay to ensure page is loaded
  //       // setTimeout(clearCookies, 2000);
  //   })();
  // `,
  "auth-check":`
        (function() {
            try {
                // Check if user is logged into Google
                const checkAuth = () => {
                    // Try to access Google account info or check for auth cookies
                    if (document.cookie.includes('SAPISID') || document.cookie.includes('SSID')) {
                        window.ReactNativeWebView.postMessage('authenticated');
                        return true;
                    } else {
                        window.ReactNativeWebView.postMessage('');
                        return false;
                    }
                };
                
                // Run check after page loads
                if (document.readyState === 'complete') {
                    checkAuth();
                } else {
                    window.addEventListener('load', checkAuth);
                }
                
                // Also check periodically for auth changes
                setInterval(checkAuth, 5000);
            } catch (error) {
                console.log('Auth check error:', error);
                window.ReactNativeWebView.postMessage('');
            }
        })();
        true;
        `
}