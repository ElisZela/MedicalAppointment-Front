$(document).ready(function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const doctor = JSON.parse(localStorage.getItem("selectedDoctor"));

    if (!doctor) {
        alert("Error loading doctor.");
        window.location.href = "doctors.html";
        return;
    }

    $("#doctorName").val(doctor.name + " " + doctor.surname);

    const times = [
        "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00",
        "15:00", "16:00", "17:00"
    ];

    times.forEach(t => {
        $("#time").append(`<option value="${t}">${t}</option>`);
    });

    $("#bookingForm").submit(function (e) {
        e.preventDefault();

        const date = $("#date").val();
        const time = $("#time").val();

        if (!date || !time) {
            alert("Please select date and time.");
            return;
        }

        $.ajax({
            url: `${API_URL}/appointments?userEmail=${encodeURIComponent(user.email)}`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                doctorId: doctor.id,
                date: date,
                time: time
            }),
            success: function(response) {
                alert("Appointment booked!");
                window.location.href = "user-dashboard.html";
            },
            error: function() {
                alert("Failed to book appointment. Please try again.");
            }
        });
    });
});