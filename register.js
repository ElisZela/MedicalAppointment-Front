$(document).ready(function () {
    $("#registerForm").submit(function (e) {
        e.preventDefault();

        const fullname = $("#fullname").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.email === email)) {
            alert("Email already registered.");
            return;
        }

        users.push({ fullname, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created! You can now login.");
        window.location.href = "login.html";
    });
});
