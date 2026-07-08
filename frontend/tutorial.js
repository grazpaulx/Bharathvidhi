document.addEventListener("DOMContentLoaded", function () {
    // ✅ Toggle Subcategory Visibility
    document.querySelectorAll(".subcategory").forEach(subcategory => {
        subcategory.addEventListener("click", function () {
            let subOptions = subcategory.nextElementSibling;
            let arrow = subcategory.querySelector(".arrow");

            if (subOptions) {
                let isVisible = subOptions.style.display === "block";
                subOptions.style.display = isVisible ? "none" : "block";
                arrow.classList.toggle("rotate", !isVisible);
            }
        });
    });

    // ✅ Search Functionality
    document.getElementById("searchBar").addEventListener("keyup", function () {
        let filter = this.value.toLowerCase();
        let items = document.querySelectorAll(".tutorial-item");
        let subcategories = document.querySelectorAll(".subcategory");

        items.forEach(item => {
            let text = item.textContent.toLowerCase();
            item.style.display = text.includes(filter) ? "block" : "none";
        });

        // Ensure relevant subcategories remain open
        subcategories.forEach(subcategory => {
            let nextList = subcategory.nextElementSibling;
            if (nextList) {
                let visibleItems = nextList.querySelectorAll(".tutorial-item:not([style*='display: none'])");
                nextList.style.display = visibleItems.length > 0 ? "block" : "none";
                subcategory.querySelector(".arrow").classList.toggle("rotate", visibleItems.length > 0);
            }
        });
    });

    // ✅ Complete Tutorials List (Now Includes Missing Tutorials)
    let tutorials = {
        
        "Introduction:History of Indian Constitution": { name: "Introduction:History of Indian Constitution",  video:"https://www.youtube.com/embed/aE6Pdy-Bs6g?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Nature of Indian Constitution": { name: "Nature of Indian Constitution",  video: "https://www.youtube.com/embed/7-yrvYPSWIE?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Salient Features": { name: "Salient Features", video:"https://www.youtube.com/embed/nuDmAgo2w8M?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "The preamble of Indian Constitution": { name: "The preamble of Indian Constitution",  video: "https://www.youtube.com/embed/xYvLe6mw4uM?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY"  },
        "Union and Territories": { name: "Union and Territories",  video: "https://www.youtube.com/embed/BkeZxArXgu8?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Citizenship": { name: "Citizenship",  video: "https://www.youtube.com/embed/o8_tfdm4ZyQ?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY"},
        "Fundamental Rights Article:12": { name: "Fundamental Rights Article:12",  video: "https://www.youtube.com/embed/a57ltfASutY?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Fundamental Rights Article:13": { name: "Fundamental Rights Article:13",  video: "https://www.youtube.com/embed/VL0b7Z7oaCU?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Fundamental Rights Article:14": { name: "Fundamental Rights Article:14",  video: "https://www.youtube.com/embed/8Oiw8s9LkH0?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Fundamental Rights Article:15": { name: "Fundamental Rights Article:15",  video: "https://www.youtube.com/embed/ele23D7b7No?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Fundamental Rights Article:16": { name: "Fundamental Rights Article:16",  video: "https://www.youtube.com/embed/REbmc3FO8QE?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Fundamental Rights Article:17-18": { name: "Fundamental Rights Article:17-18",  video: "https://www.youtube.com/embed/o9SxA8SKLDM?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Fundamental Rights Article:19": { name: "Fundamental Rights Article:19",  video: "https://www.youtube.com/embed/vkK5mDI0bzM?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Fundamental Rights Article:20": { name: "Fundamental Rights Article:20",  video: "https://www.youtube.com/embed/-SzZTD0BrOE?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Fundamental Rights Article:21": { name: "Fundamental Rights Article:21",  video: "https://www.youtube.com/embed/SPQyO1Y-xX8?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Right to Freedom Education": { name: "Right to Freedom Education",  video: "https://www.youtube.com/embed/f207jXg2xvA?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY"},
        "Right to Freedom Religion": { name: "Right to Freedom Religion",  video: "https://www.youtube.com/embed/hmnSfA1edns?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Right to Freedom Constitutionl Remedies": { name: "Right to Freedom Constitutionl Remedies",  video: "https://www.youtube.com/embed/TjQytOc9X-o?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "The state liablity": { name: "The state liablity",  video: "https://www.youtube.com/embed/6ERug_wWsLU?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Elections": { name: "Elections",  video: "https://www.youtube.com/embed/7zHVfK0cx08?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Official language": { name: "Official language",  video: "https://www.youtube.com/embed/mEFoVouwf3s?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Emergency under Indian Constitution": { name: "Emergency under Indian Constitution",  video: "https://www.youtube.com/embed/MYlZI1IE6SI?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" },
        "Amendment of Indian Constitution": { name: "Amendment of Indian Constitution",  video: "https://www.youtube.com/embed/4NbvPN3Omj0?list=PLApF_J7NFBhhfVjDPT0kMTzLTcA0JHqgY" }, 
    };

    // ✅ Function to Show/Hide Tutorial Content
    function showTutorial(tutorialKey, clickedItem) {
        let tutorialData = tutorials[tutorialKey];

        // Remove any existing tutorial content before adding a new one
        document.querySelectorAll(".tutorial-content").forEach(el => el.remove());

        if (tutorialData) {
            let tutorialContent = document.createElement("div");
            tutorialContent.classList.add("tutorial-content");

            let stepsHTML = tutorialData.steps 
                ? `<h3>${tutorialData.name}</h3>
                   <h4>Step-by-Step Guide</h4>
                   <ul>${tutorialData.steps.map(step => `<li>${step}</li>`).join("")}</ul>`
                : `<h3>${tutorialData.name}</h3>`;

            let videoHTML = tutorialData.video.trim() !== "" 
                ? `<h3>Video Tutorial</h3>
                   <iframe width="100%" height="315" src="${tutorialData.video}" frameborder="0" allowfullscreen></iframe>`
                : "";

            tutorialContent.innerHTML = `${stepsHTML}${videoHTML}`;
            clickedItem.after(tutorialContent); // Insert content after the clicked item
        }
    }

    // ✅ Event Listener for Tutorial Clicks
    document.querySelectorAll(".tutorial-item").forEach(item => {
        item.addEventListener("click", function () {
            let tutorialKey = this.dataset.name;
            if (tutorials[tutorialKey]) {
                showTutorial(tutorialKey, this);
            } else {
                alert("Tutorial not found!");
            }
        });
    });
});
// Fetch tutorials from the backend and populate the page
fetch("http://localhost:4000/tutorials")
  .then((response) => response.json())
  .then((data) => {
    const tutorialContainer = document.querySelector(".sub-options");
    tutorialContainer.innerHTML = ""; // Clear any existing content

    data.forEach((tutorial) => {
      const tutorialItem = document.createElement("div");
      tutorialItem.className = "tutorial-item";
      tutorialItem.dataset.name = tutorial.name; // Use the 'name' column from your database
      tutorialItem.innerText = tutorial.name; // Display the tutorial name
      tutorialContainer.appendChild(tutorialItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching tutorials:", error);
  });
