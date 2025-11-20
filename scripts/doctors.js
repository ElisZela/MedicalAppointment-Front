$(document).ready(function () {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    const container = $("#doctorsContainer");
    container.empty();

    doctors.forEach((doc, index) => {
        container.append(`
            <div class="col-md-4 mb-4">
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${doc.name} ${doc.surname}</h5>
                        <p class="card-text"><strong>Specialty:</strong> ${doc.specialty}</p>
                        <button class="btn btn-primary w-100 book-btn" data-index="${index}">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        `);
    });

    // FIXED: store full doctor object instead of index
    $(document).on("click", ".book-btn", function () {
        const index = $(this).data("index");
        const selectedDoctor = doctors[index];

        localStorage.setItem("selectedDoctor", JSON.stringify(selectedDoctor));

        window.location.href = "booking.html";
    });
});
