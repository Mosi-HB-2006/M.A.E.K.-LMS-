function submitForm(event) {
  event.preventDefault();

  const formData = {
    dni: document.getElementById("fdni").value,
    name: document.getElementById("lname").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    phone: document.getElementById("lphone").value,
    image: document.getElementById("limg").value,
    vip: document.getElementById("vip").checked,
  };

  if (!validateForm(formData)) {
    return false;
  }

  processFormData(formData);
  return false;
}

function validateForm(formData) {
  if (!formData.dni || !formData.name || !formData.phone || !formData.image) {
    alert("Please fill all required fields");
    return false;
  }

  if (!/^\d{8}[A-Z]$/.test(formData.dni)) {
    alert("DNI must be 8 numbers followed by a capital letter");
    return false;
  }

  if (!/^\d{9}$/.test(formData.phone)) {
    alert("Phone number must be 9 digits");
    return false;
  }

  return true;
}

function processFormData(formData) {
  fetch(
    `http://localhost/M.A.E.K.-LMS-/basex/BDAccess.php?dni=${formData.dni}&name=${formData.name}&gender=${formData.gender}&phone=${formData.phone}&image=${formData.image}&vip=${formData.vip}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Response from server:", data);
      // Only reload and close after successful PHP execution
      if (window.opener && !window.opener.closed) {
        window.opener.location.reload();
        window.close();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error sending the request: " + error.message);
    });
}
