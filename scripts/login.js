$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        // Simple admin login check
        if (email === "admin@care.com" && password === "admin123") {
            // Save admin as logged in user
            localStorage.setItem("currentUser", JSON.stringify({
                fullname: "Admin",
                email: "admin@care.com"
            }));

            alert("Welcome Admin!");
            window.location.href = "managerpanel.html";
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert("Incorrect email or password.");
            return;
        }

        // Save current user login
        localStorage.setItem("currentUser", JSON.stringify(user));

        window.location.href = "user-dashboard.html";
    });
});
