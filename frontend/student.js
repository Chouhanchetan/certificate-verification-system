if (localStorage.getItem("role") !== "student") {
  window.location = "index.html";
}

async function verify() {
  const certId = document.getElementById("certId").value;

  const res = await fetch(`http://localhost:5000/api/certificate/${certId}`, {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });

  const resultDiv = document.getElementById("result");

  if (!res.ok) {
    resultDiv.style.color = "red";
    resultDiv.innerText = "Invalid Certificate ID";
    return;
  }

  const cert = await res.json();
  resultDiv.style.color = "green";
  resultDiv.innerHTML = `
    ✅ Certificate Verified <br><br>
    <b>Name:</b> ${cert.name}<br>
    <b>Course:</b> ${cert.course}<br>
    <b>Issue Date:</b> ${cert.issueDate}<br><br>
    <a href="http://localhost:5000/api/certificate/download/${cert.certId}">
      Download Certificate (PDF)
    </a>
  `;
}

function logout() {
  localStorage.clear();
  window.location = "index.html";
}
