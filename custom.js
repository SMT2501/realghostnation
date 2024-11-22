document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById("eventForm");
    const eventPasscode = document.getElementById("eventPasscode");
    const eventFields = document.getElementById("eventFields");
    const eventsDisplay = document.getElementById("eventsDisplay");
  
    const passcode = "GhostNation2024"; // Change this passcode
  
    // Check passcode and reveal form
    eventPasscode.addEventListener("input", () => {
      if (eventPasscode.value === passcode) {
        eventFields.classList.remove("d-none");
      } else {
        eventFields.classList.add("d-none");
      }
    });
  
    // Fetch and display events
    async function loadEvents() {
      const response = await fetch("events.json");
      const events = await response.json();
      eventsDisplay.innerHTML = events
        .map((event) => `
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${event.title}</h5>
                <p>${event.description}</p>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
              </div>
            </div>
          </div>`)
        .join("");
    }
  
    // Submit event to backend
    eventForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const event = {
        title: document.getElementById("eventTitle").value,
        description: document.getElementById("eventDescription").value,
        date: document.getElementById("eventDate").value,
        location: document.getElementById("eventLocation").value,
      };
  
      const response = await fetch("save_event.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
  
      if (response.ok) {
        alert("Event added successfully!");
        eventForm.reset();
        eventFields.classList.add("d-none");
        eventPasscode.value = "";
        $("#addEventModal").modal("hide");
        loadEvents();
      } else {
        alert("Failed to add event. Please try again.");
      }
    });
  
    // Load events on page load
    loadEvents();
  });
  