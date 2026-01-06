if (localStorage.getItem("role") !== "admin") {
  window.location = "index.html";
}

async function upload() {
  const file = document.getElementById("excel").files[0];
  if (!file) return alert("Select Excel file");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:5000/api/admin/upload", {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token")
    },
    body: formData
  });

  const msg = await res.text();
  alert(msg);
}

function logout() {
  localStorage.clear();
  window.location = "index.html";
}
