$(document).ready(function () {
    $("#registerForm").submit(function (e) {
        e.preventDefault();

        const fullname = $("#fullname").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        $.ajax({
            url: `${API_URL}/users/register`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ fullname, email, password }),
            success: function(response) {
                alert("Account created! You can now login.");
                window.location.href = "login.html";
            },
            error: function(xhr) {
                if (xhr.status === 400) {
                    alert("Email already registered.");
                } else {
                    alert("Registration failed. Please try again.");
                }
            }
        });
    });
});