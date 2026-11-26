document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const submitBtn = document.getElementById('submit-btn');
    const successBox = document.getElementById('success-box');
    const whatsappLink = document.getElementById('whatsapp-link');

    // Paste your Google Apps Script Web App URL here
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwR97GXyukN8i54BszjS4IwUV4m-K3JRh7K9wlESxp_wYEesECIyboNTN4uW8kTiluzXg/exec';

    // Level-specific WhatsApp Group invite links
    const levelGroupLinks = {
        "100":"https://chat.whatsapp.com/EWs38dSkngN99l8T3aPkUN?s=cl&p=a&iam=2",
        "200": "https://chat.whatsapp.com/DWeIiqP0yDHJKP77P9nAtA?s=cl&p=a&iam=2",
        "300": "",        "500": ""
    };

    const defaultGroup = "";

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop the page from refreshing

        // Show loading state on button
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        const selectedLevel = document.getElementById('level-select').value;
        const formData = new FormData(form);

         fetch(scriptURL, {
             method: 'POST',
             mode: 'no-cors',
             body: new URLSearchParams(new FormData(form))
    })
            .then(() => {
               // 4. Hide form and reveal success box containing the WhatsApp button
             document.getElementById('registration').style.display = 'none';
             document.getElementById('success-box').style.display = 'block';
            })
            .catch(error => {
                console.error('Error!', error.message);
                if (submitBtn) submitBtn.textContent = 'Submit';
                alert('There was an error in submitting your form. Please try again.');
            })
            .then(response => {
                // Set the right WhatsApp group link for the student's level
                whatsappLink.href = levelGroupLinks[selectedLevel];
                whatsappLink.textContent = `Join ${selectedLevel} Level Whatsapp Group`;

                // Hide the form and reveal the WhatsApp Join Group button
                form.style.display = 'none';
                successBox.style.display = 'block';
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("There was an error submitting your form. Please try again.");
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit Registration";
            });
    });
});

function showCourses() {
          var dropdown =document.getElementById("level-select");
          if (!dropdown) {
            alert("CRITICAL ERROR: Your dropdown <select> element is missing id='level-select'!");
            return;  
          }

          var selectedLevel = dropdown.value;
          console.log("Selected Level is:", selectedLevel);

          var sections = document.querySelectorAll(".course-section");
          sections.forEach(function(section) {
            section.style.display = "none";
          });

          if (selectedLevel !== "") {
            var targetSection = document.getElementById("courses-" + selectedLevel);
            console.log("Looking for element with ID: courses-" + selectedLevel, targetSection);
          

          if (targetSection) {
            targetSection.style.display = "block";
          } else {
            alert("CRITICAL ERROR: Could not find a course section with id='courses-" + selectedLevel +"'");
           }
          }
        }   
     
       document.addEventListener('DOMContentLoaded', function () {
    const levelDropdown = document.getElementById('level-select');
    const whatsappLink = document.getElementById('whatsapp-link');

    // WhatsApp Group invite links for each level
    const levelGroupLinks = {
        "100": "https://chat.whatsapp.com/EWs38dSkngN99l8T3aPkUN?s=cl&p=a&iam=2",
        "200": "https://chat.whatsapp.com/DWeIiqP0yDHJKP77P9nAtA?s=cl&p=a&iam=2",
        "300": "",
        "400": "",
        "500": ""
    };

    // Default group link if no level is selected yet
    const defaultGroup = "";

    if (levelDropdown && whatsappLink) {
        levelDropdown.addEventListener('change', function () {
            const selectedLevel = this.value;

            // Change link to the group corresponding to the selected level
            if (levelGroupLinks[selectedLevel]) {
                whatsappLink.href = levelGroupLinks[selectedLevel];
            } else {
                whatsappLink.href = defaultGroup;
            }
        });
    }
});