$(document).ready(function () {
  // Load all doctors from localStorage
  function getDoctors() {
    return JSON.parse(localStorage.getItem("doctors")) || [];
  }

  // Save doctors back to localStorage
  function saveDoctors(doctors) {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }

  // Render the table
  function renderTable() {
    const doctors = getDoctors();
    const tbody = $("#doctorTable tbody");
    tbody.empty();

    if (doctors.length === 0) {
      tbody.append(`<tr><td colspan="6" class="text-center text-muted">No doctors added yet.</td></tr>`);
      return;
    }

    doctors.forEach((doc, index) => {
      const row = `
        <tr data-index="${index}">
          <td class="name">${doc.name}</td>
          <td class="surname">${doc.surname}</td>
          <td class="specialty">${doc.specialty}</td>
          <td class="wage">${doc.wage}</td>
          <td><button class="btn btn-sm btn-primary edit-btn">Edit</button></td>
          <td><button class="btn btn-sm btn-danger delete-btn">Remove</button></td>
        </tr>
      `;
      tbody.append(row);
    });
  }

  // Handle Delete
  $(document).on("click", ".delete-btn", function () {
    const index = $(this).closest("tr").data("index");
    let doctors = getDoctors();
    if (confirm("Are you sure you want to delete this doctor?")) {
      doctors.splice(index, 1);
      saveDoctors(doctors);
      renderTable();
    }
  });

  // Handle Edit (turn row into input fields)
  $(document).on("click", ".edit-btn", function () {
    const row = $(this).closest("tr");
    const index = row.data("index");
    const doctor = getDoctors()[index];

    row.html(`
      <td><input type="text" class="form-control form-control-sm name-input" value="${doctor.name}"></td>
      <td><input type="text" class="form-control form-control-sm surname-input" value="${doctor.surname}"></td>
      <td><input type="text" class="form-control form-control-sm specialty-input" value="${doctor.specialty}"></td>
      <td><input type="number" class="form-control form-control-sm wage-input" value="${doctor.wage}"></td>
      <td>
        <button class="btn btn-sm btn-success save-btn">Save</button>
      </td>
      <td>
        <button class="btn btn-sm btn-secondary cancel-btn">Cancel</button>
      </td>
    `);
  });

  // Handle Save (store edits)
  $(document).on("click", ".save-btn", function () {
    const row = $(this).closest("tr");
    const index = row.data("index");

    const updatedDoctor = {
      name: row.find(".name-input").val().trim(),
      surname: row.find(".surname-input").val().trim(),
      specialty: row.find(".specialty-input").val().trim(),
      wage: row.find(".wage-input").val().trim()
    };

    if (!updatedDoctor.name || !updatedDoctor.surname || !updatedDoctor.specialty || !updatedDoctor.wage) {
      alert("All fields are required.");
      return;
    }

    let doctors = getDoctors();
    doctors[index] = updatedDoctor;
    saveDoctors(doctors);
    renderTable();
  });

  // Handle Cancel
  $(document).on("click", ".cancel-btn", function () {
    renderTable();
  });

  // Initial render
  renderTable();
});
