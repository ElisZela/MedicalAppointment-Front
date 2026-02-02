$(document).ready(function () {
    $.ajax({
        url: `${API_URL}/doctors`,
        method: "GET",
        success: function(doctors) {
            const container = $("#doctorsContainer");
            container.empty();

            doctors.forEach((doc) => {
                container.append(`
                    <div class="col-md-4 mb-4">
                        <div class="card shadow-sm h-100">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${doc.name} ${doc.surname}</h5>
                                <p class="card-text"><strong>Specialty:</strong> ${doc.specialty}</p>
                                <button class="btn btn-primary w-100 book-btn" data-id="${doc.id}" data-name="${doc.name}" data-surname="${doc.surname}">
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                `);
            });
        },
        error: function() {
            alert("Failed to load doctors.");
        }
    });

    $(document).on("click", ".book-btn", function () {
        const doctorId = $(this).data("id");
        const doctorName = $(this).data("name");
        const doctorSurname = $(this).data("surname");

        localStorage.setItem("selectedDoctor", JSON.stringify({
            id: doctorId,
            name: doctorName,
            surname: doctorSurname
        }));

        window.location.href = "booking.html";
    });
});