document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'live-ciJeEB5wWqAqU1iOPg9Mdw0ZM1BpQOlVv3VB-tjrkBpsKGktdsHZESDCu9NhlP4wUm2y7C5JXcjns0cj';
    const apiUrl = 'https://api.charityapi.org/api/organizations/search/food';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'apikey': apiKey,
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const projectList = document.querySelector("#project-list");

        if (!data.data || data.data.length === 0) {
            projectList.innerHTML = "<p>No charity projects found.</p>";
            return;
        }

        data.data.forEach(charity => {
            const name = charity.name || "Unnamed Charity";
            const city = charity.city || "Unknown City";
            const state = charity.state || "Unknown State";
            const address = charity.street || "Address not available";
            const ein = charity.ein || "N/A";

            const projectCard = document.createElement("div");
            projectCard.classList.add("charity-card");
            projectCard.innerHTML = `
                <h3>${name}</h3>
                <p><strong>Location:</strong> ${city}, ${state}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>EIN:</strong> ${ein}</p>
                <a href="https://www.google.com/search?q=${encodeURIComponent(name)}" target="_blank">Learn More</a>
            `;
            projectList.appendChild(projectCard);
        });

        // ✅ Now AFTER adding cards, add hover effect
        const charityCards = document.querySelectorAll(".charity-card");
        charityCards.forEach(card => {
            card.addEventListener("mouseover", function() {
                const extraInfo = document.createElement("div");
                extraInfo.classList.add("extra-info");
                extraInfo.innerHTML = `
                    <p><strong>Details:</strong> This charity focuses on providing critical services like food distribution and healthcare to underserved communities.</p>
                `;
                card.appendChild(extraInfo);
            });

            card.addEventListener("mouseout", function() {
                const extraInfo = card.querySelector(".extra-info");
                if (extraInfo) {
                    card.removeChild(extraInfo);
                }
            });
        });

    })
    .catch(error => {
        console.error('Error fetching data:', error);
        const projectList = document.querySelector("#project-list");
        projectList.innerHTML = "<p>Sorry, there was an issue fetching the charity data. Please try again later.</p>";
    });

    // ✅ Volunteer button (this can stay here)
    const volunteerButton = document.querySelector(".volunteer-btn button");
    if (!volunteerButton) {
        console.error("Volunteer button not found!");
        return;
    }

    volunteerButton.addEventListener("click", function(e) {
        e.preventDefault();
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
});




