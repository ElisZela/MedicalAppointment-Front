$(document).ready(function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    $("#username").text(user.fullname);

    let allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let userApps = allAppointments.filter(a => a.userEmail === user.email);

    const tbody = $("#appointmentsTable tbody");
    tbody.empty();

    userApps.forEach((app, i) => {
        tbody.append(`
            <tr data-index="${i}">
                <td>${app.doctor}</td>
                <td>${app.date}</td>
                <td>${app.time}</td>
            </tr>
        `);
    });

    $("#logoutBtn").click(function () {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
});
