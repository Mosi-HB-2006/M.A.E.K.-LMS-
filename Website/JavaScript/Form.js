function submitForm(event) {
  event.preventDefault();

  // Create the formData object with the values from the form inputs
  const formData = {
    dni: document.getElementById("fdni").value,
    name: document.getElementById("lname").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    phone: document.getElementById("lphone").value,
    image: document.getElementById("limg").value,
    vip: document.getElementById("vip").checked,
  };

  // If the validation rules are not satisfied, exit the function
  if (!validateForm(formData)) {
    return false;
  }

  // Show a confirmation dialog. If the user cancels, stop execution; otherwise, proceed with processFormData
  if (!confirm("Are you sure you want to add this user to the DB?")) {
    return false;
  }

  processFormData(formData);
}

// Function to validate if the form data meets all validation rules
function validateForm(formData) {
  // Check if required fields are not empty
  if (!formData.dni || !formData.name || !formData.phone || !formData.image) {
    alert("Please fill all required fields");
    return false;
  }

  // Validate DNI format: 8 digits followed by an uppercase letter
  if (!/^\d{8}[A-Z]$/.test(formData.dni)) {
    alert("DNI must be 8 numbers followed by a capital letter");
    return false;
  }

  // Validate phone number: exactly 9 digits
  if (!/^\d{9}$/.test(formData.phone)) {
    alert("Phone number must be 9 digits");
    return false;
  }

  // If all checks pass, return true
  return true;
}

// Function to send a request to the PHP script with form data as query parameters
function processFormData(formData) {
  fetch(
    `http://localhost/M.A.E.K.-LMS-/Website/PHP/BDInsert.php?dni=${encodeURIComponent(
      formData.dni
    )}&name=${encodeURIComponent(formData.name)}&gender=${encodeURIComponent(
      formData.gender
    )}&phone=${encodeURIComponent(formData.phone)}&image=${encodeURIComponent(
      formData.image
    )}&vip=${encodeURIComponent(formData.vip)}`
  )
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Server response:", data);

      // If addUserXSLT window is still open, reload it and close the PopUp window
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
