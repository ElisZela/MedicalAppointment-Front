$(document).ready(function () {
    // Make sure user is logged in
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // FIXED: get full doctor object, not index
    const doctor = JSON.parse(localStorage.getItem("selectedDoctor"));

    if (!doctor) {
        alert("Error loading doctor.");
        window.location.href = "doctors.html";
        return;
    }

    // Show doctor name
    $("#doctorName").val(doctor.name + " " + doctor.surname);

    // Time slots
    const times = [
        "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00",
        "15:00", "16:00", "17:00"
    ];

    times.forEach(t => {
        $("#time").append(`<option value="${t}">${t}</option>`);
    });

    // Booking submission
    $("#bookingForm").submit(function (e) {
        e.preventDefault();

        const date = $("#date").val();
        const time = $("#time").val();

        if (!date || !time) {
            alert("Please select date and time.");
            return;
        }

        // Save appointment
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

        appointments.push({
            userEmail: user.email,
            doctor: doctor.name + " " + doctor.surname,
            date,
            time
        });

        localStorage.setItem("appointments", JSON.stringify(appointments));

        alert("Appointment booked!");
        window.location.href = "user-dashboard.html";
    });
});
