const apiUrl = "/api/students/";
const tableBody = document.querySelector("#studentTable tbody");

// 🔹 Function: Load all students
function loadStudents() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      tableBody.innerHTML = "";
      data.forEach(student => {
        const row = `
          <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.city}</td>
            <td>
              <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
          </tr>`;
        tableBody.innerHTML += row;
      });
      showToast("The data has been loaded successfully.");
    });
}

// 🔹 Function: Add student
document.getElementById("addBtn").addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const city = document.getElementById("city").value;

  if (name && roll && city) {
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, roll, city })
    })
      .then(res => res.json())
      .then(data => {
        loadStudents();  // Reload table
        document.getElementById("name").value = "";
        document.getElementById("roll").value = "";
        document.getElementById("city").value = "";
      });
  } else alert("Fill all fields!");
});

// 🔹 Function: Delete student
function deleteStudent(id) {
  fetch(`${apiUrl}${id}/`, { method: "DELETE" })
    .then(res => {
      if (res.ok) loadStudents();  // Reload table
    });
}

// 🔹 Excel export
document.getElementById("exportBtn").addEventListener("click", function () {
  window.location.href = "/api/export-excel/";
});

// 🔹 Initial load
// 🔹 Initial load
loadStudents();

// 🔹 Toast Function
function showToast(message) {
  var x = document.getElementById("toast");
  x.innerText = message;
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
