// Simple jQuery script to add a doctor and save to localStorage
$(document).ready(function () {
  $("#doctorForm").submit(function (event) {
    event.preventDefault(); // stop form from reloading the page

    // Get the input values
    const name = $("#name").val().trim();
    const surname = $("#surname").val().trim();
    const specialty = $("#specialty").val().trim();
    const wage = $("#wage").val().trim();

    // Check if all fields are filled
    if (!name || !surname || !specialty || !wage) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if wage is a number
    if (isNaN(wage) || wage < 0) {
      alert("Please enter a valid wage.");
      return;
    }

    // Get existing doctors from localStorage (or empty array)
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    // Add new doctor
    const newDoctor = { name, surname, specialty, wage };
    doctors.push(newDoctor);

    // Save back to localStorage
    localStorage.setItem("doctors", JSON.stringify(doctors));

    alert("Doctor added successfully!");

    // Redirect back to manager panel
    window.location.href = "managerpanel.html";
  });
});
