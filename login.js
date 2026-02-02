$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        // Admin check (hardcoded)
        if (email === "admin@care.com" && password === "admin123") {
            localStorage.setItem("currentUser", JSON.stringify({
                fullname: "Admin",
                email: "admin@care.com"
            }));
            alert("Welcome Admin!");
            window.location.href = "managerpanel.html";
            return;
        }

        // Regular user login via API
        $.ajax({
            url: `${API_URL}/users/login`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email, password }),
            success: function(response) {
                // Save user info to localStorage
                localStorage.setItem("currentUser", JSON.stringify(response));
                window.location.href = "user-dashboard.html";
            },
            error: function(xhr) {
                if (xhr.status === 401) {
                    alert("Incorrect email or password.");
                } else {
                    alert("Login failed. Please try again.");
                }
            }
        });
    });
});