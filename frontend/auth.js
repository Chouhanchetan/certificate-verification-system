async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    if (data.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "verify.html";
    }

  } catch (error) {
    console.error(error);
    alert("Server not reachable");
  }
}
