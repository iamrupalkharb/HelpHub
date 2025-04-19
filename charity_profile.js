document.addEventListener("DOMContentLoaded", function() {
    // Fetch Charity Projects from GlobalGiving API
    const apiKey = '2d4de8e8-6b70-469e-8345-e4b3ff6f872f';  // Your actual GlobalGiving API key
    const apiUrl = `https://api.globalgiving.org/api/public/projectservice/all/projects?api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();  // Get the response as text (XML format)
        })
        .then(xmlText => {
            // Parse the XML response
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            // Get the project elements from the XML
            const projects = xmlDoc.getElementsByTagName("project");
            const projectList = document.querySelector("#project-list");

            if (projects.length === 0) {
                projectList.innerHTML = "<p>No charity projects found.</p>";
                return;
            }

            // Loop through each project and display it
            Array.from(projects).forEach(project => {
                const title = project.getElementsByTagName("title")[0].textContent;
                const cause = project.getElementsByTagName("themeName")[0].textContent;
                const location = project.getElementsByTagName("country")[0].textContent;
                const description = project.getElementsByTagName("summary")[0].textContent;
                const projectUrl = project.getElementsByTagName("projectLink")[0].textContent;
                const imageUrl = project.getElementsByTagName("imageLink")[0].textContent;

                // Create the HTML for the project card
                const projectCard = document.createElement("div");
                projectCard.classList.add("charity-card");
                projectCard.innerHTML = `
                    <img src="${imageUrl}" alt="${title}" class="charity-image">
                    <h3>${title}</h3>
                    <p><strong>Cause:</strong> ${cause}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p>${description}</p>
                    <a href="${projectUrl}" target="_blank">Learn more</a>
                `;
                projectList.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const projectList = document.querySelector("#project-list");
            projectList.innerHTML = "<p>Sorry, there was an issue fetching the charity data. Please try again later.</p>";
        });

    // Volunteer Now Button (Open in a New Window)
    const volunteerButton = document.querySelector(".volunteer-btn button");
    if (!volunteerButton) {
        console.error("Volunteer button not found!");
        return;
    }

    console.log("Volunteer button found!");

    // Open a new window with the volunteer form
    volunteerButton.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("Volunteer button clicked!");

        // Open a new window with the volunteer form
        const formWindow = window.open('', '_blank', 'width=600,height=600');
        
        formWindow.document.write(`
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Volunteer Sign-Up</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        max-width: 600px;
                        margin: auto;
                    }
                    h2 {
                        text-align: center;
                    }
                    label {
                        display: block;
                        margin-bottom: 10px;
                    }
                    input, textarea {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    button {
                        width: 100%;
                        padding: 10px;
                        background-color: #1a73e8;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #0d5fa3;
                    }
                </style>
            </head>
            <body>
                <h2>Volunteer Sign-Up</h2>
                <form id="volunteerForm">
                    <label for="name">Full Name:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>

                    <label for="message">Why do you want to volunteer?</label>
                    <textarea id="message" name="message" required></textarea>

                    <button type="submit">Submit</button>
                </form>
                
                <script>
                    // Handle form submission in the new window
                    const volunteerForm = document.getElementById('volunteerForm');
                    volunteerForm.addEventListener("submit", function(e) {
                        e.preventDefault();
                        const name = document.getElementById("name").value;
                        const email = document.getElementById("email").value;
                        const message = document.getElementById("message").value;

                        if (name && email && message) {
                            alert('Thank you, ' + name + '! Your volunteer sign-up has been submitted.');
                            window.close();  // Close the form window after submission
                        } else {
                            alert("Please fill out all fields.");
                        }
                    });
                </script>
            </body>
            </html>
        `);
    });

    // Hover Effect on Charity Cards
    const charityCards = document.querySelectorAll(".charity-card");

    // Log to verify if charity cards are selected correctly
    console.log(charityCards);

    // Check if charity cards exist
    if (charityCards.length > 0) {
        charityCards.forEach(card => {
            card.addEventListener("mouseover", function() {
                const extraInfo = document.createElement("div");
                extraInfo.classList.add("extra-info");
                extraInfo.innerHTML = `
                    <p><strong>Details:</strong> This charity focuses on providing critical services like food distribution and healthcare to underserved communities.</p>
                `;
                card.appendChild(extraInfo); // Append the additional info
            });

            card.addEventListener("mouseout", function() {
                const extraInfo = card.querySelector(".extra-info");
                if (extraInfo) {
                    card.removeChild(extraInfo); // Remove the extra info when mouse leaves
                }
            });
        });
    } else {
        console.error("No charity cards found.");
    }
});






