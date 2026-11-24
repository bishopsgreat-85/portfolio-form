document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const submitBtn = document.getElementById('submit-btn');
    const postSubmissionBox = document.getElementById('post-submission-box');
    const whatsappLink = document.getElementById('whatsapp-link');

    // Paste your Google Apps Script Web App URL here
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx9i-pDud7HTiZAxCc9841JfvI-JUp0eHsvn-FPVha2PRG6cwUa4JbZDeYg_RVUY_S_2A/exec';

    // Level-specific WhatsApp Group invite links
    const levelGroupLinks = {
        "100":"https://chat.whatsapp.com/EWs38dSkngN99l8T3aPkUN?s=cl&p=a&iam=2",
        "200": "https://chat.whatsapp.com/DWeIiqP0yDHJKP77P9nAtA?s=cl&p=a&iam=2",
        "300": "",
        "400": "",
        "500": ""
    };

    const defaultGroup = "https://chat.whatsapp.com/FRGeSiJoH2M2BmD21vdJo6?s=cl&p=a&mlu=4&ilr=4";

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop the page from refreshing

        // Show loading state on button
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        const selectedLevel = document.getElementById('level-select').value;
        const formData = new FormData(form);

        // Send data to Google Sheets
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                // Set the right WhatsApp group link for the student's level
                whatsappLink.href = levelGroupLinks[selectedLevel] || defaultGroup;

                // Hide the form and reveal the WhatsApp Join Group button
                form.style.display = 'none';
                postSubmissionBox.style.display = 'block';
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("There was an error submitting your form. Please try again.");
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit";
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
        "500": "https://chat.whatsapp.com/YOUR_500_LEVEL_GROUP_LINK"
    };

    // Default group link if no level is selected yet
    const defaultGroup = "https://chat.whatsapp.com/YOUR_DEFAULT_GROUP_LINK";

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