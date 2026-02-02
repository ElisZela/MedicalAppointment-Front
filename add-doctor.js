$(document).ready(function () {
  $("#doctorForm").submit(function (event) {
    event.preventDefault();

    const name = $("#name").val().trim();
    const surname = $("#surname").val().trim();
    const specialty = $("#specialty").val().trim();
    const wage = $("#wage").val().trim();

    if (!name || !surname || !specialty || !wage) {
      alert("Please fill in all fields.");
      return;
    }

    if (isNaN(wage) || wage < 0) {
      alert("Please enter a valid wage.");
      return;
    }

    $.ajax({
        url: `${API_URL}/doctors`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ 
            name, 
            surname, 
            specialty, 
            wage: parseFloat(wage) 
        }),
        success: function(response) {
            alert("Doctor added successfully!");
            window.location.href = "managerpanel.html";
        },
        error: function() {
            alert("Failed to add doctor. Please try again.");
        }
    });
  });
});
