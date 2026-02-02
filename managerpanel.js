$(document).ready(function () {
  
  function renderTable() {
    $.ajax({
        url: `${API_URL}/doctors`,
        method: "GET",
        success: function(doctors) {
            const tbody = $("#doctorTable tbody");
            tbody.empty();

            if (doctors.length === 0) {
              tbody.append(`<tr><td colspan="6" class="text-center text-muted">No doctors added yet.</td></tr>`);
              return;
            }

            doctors.forEach((doc) => {
              const row = `
                <tr data-id="${doc.id}">
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
        },
        error: function() {
            alert("Failed to load doctors.");
        }
    });
  }

  // Handle Delete
  $(document).on("click", ".delete-btn", function () {
    const id = $(this).closest("tr").data("id");
    
    if (confirm("Are you sure you want to delete this doctor?")) {
      $.ajax({
          url: `${API_URL}/doctors/${id}`,
          method: "DELETE",
          success: function() {
              renderTable();
          },
          error: function() {
              alert("Failed to delete doctor.");
          }
      });
    }
  });

  // Handle Edit
  $(document).on("click", ".edit-btn", function () {
    const row = $(this).closest("tr");
    const id = row.data("id");
    
    const name = row.find(".name").text();
    const surname = row.find(".surname").text();
    const specialty = row.find(".specialty").text();
    const wage = row.find(".wage").text();

    row.html(`
      <td><input type="text" class="form-control form-control-sm name-input" value="${name}"></td>
      <td><input type="text" class="form-control form-control-sm surname-input" value="${surname}"></td>
      <td><input type="text" class="form-control form-control-sm specialty-input" value="${specialty}"></td>
      <td><input type="number" class="form-control form-control-sm wage-input" value="${wage}"></td>
      <td>
        <button class="btn btn-sm btn-success save-btn">Save</button>
      </td>
      <td>
        <button class="btn btn-sm btn-secondary cancel-btn">Cancel</button>
      </td>
    `);
  });

  // Handle Save
  $(document).on("click", ".save-btn", function () {
    const row = $(this).closest("tr");
    const id = row.data("id");

    const updatedDoctor = {
      name: row.find(".name-input").val().trim(),
      surname: row.find(".surname-input").val().trim(),
      specialty: row.find(".specialty-input").val().trim(),
      wage: parseFloat(row.find(".wage-input").val().trim())
    };

    if (!updatedDoctor.name || !updatedDoctor.surname || !updatedDoctor.specialty || !updatedDoctor.wage) {
      alert("All fields are required.");
      return;
    }

    $.ajax({
        url: `${API_URL}/doctors/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedDoctor),
        success: function() {
            renderTable();
        },
        error: function() {
            alert("Failed to update doctor.");
        }
    });
  });

  // Handle Cancel
  $(document).on("click", ".cancel-btn", function () {
    renderTable();
  });

  // Initial render
  renderTable();
});
