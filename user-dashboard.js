$(document).ready(function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    $("#username").text(user.fullname);

    $.ajax({
        url: `${API_URL}/appointments/user/${encodeURIComponent(user.email)}`,
        method: "GET",
        success: function(appointments) {
            const tbody = $("#appointmentsTable tbody");
            tbody.empty();

            if (appointments.length === 0) {
                tbody.append(`<tr><td colspan="3" class="text-center text-muted">No appointments yet.</td></tr>`);
                return;
            }

            appointments.forEach((app) => {
                tbody.append(`
                    <tr>
                        <td>${app.doctor}</td>
                        <td>${app.date}</td>
                        <td>${app.time}</td>
                    </tr>
                `);
            });
        },
        error: function() {
            alert("Failed to load appointments.");
        }
    });

    $("#logoutBtn").click(function () {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
});