window.onload = function () {
  // Get product data from the url
  const urlParams = new URLSearchParams(window.location.search);
  const squareId = urlParams.get("id");
  const squareName = urlParams.get("name");
  const squarePrice = urlParams.get("price");

  if (squareId) {
    document.getElementById("lid").textContent = squareId;
    document.getElementById("fname").value = squareName;
    document.getElementById("fprice").value = squarePrice;
  }
};

function submitForm(event) {
  event.preventDefault();

  if (!confirm("Are you sure?")) {
    return false;
  }

  const formData = {
    id: document.getElementById("lid").textContent,
    name: document.getElementById("fname").value,
    price: document.getElementById("fprice").value,
  };

  if (!validateForm(formData)) {
    return false;
  }

  processFormData(formData);
  return false;
}

// Function to validate if the form data meets all validation rules
function validateForm(formData) {
  // Check if required fields are not empty
  if (!formData.name || !formData.price) {
    alert("Please fill all required fields");
    return false;
  }
  // Check if the price is negative
  if (formData.price < 0) {
    alert("Please use a valid price");
    return false;
  }
  return true;
}

// Function to send a request to the PHP script with form data as query parameters
function processFormData(formData) {
  // Fetch to the PHP file
  fetch(
    `http://localhost/M.A.E.K.-LMS-/basex/BDModify.php?id=${encodeURIComponent(
      formData.id
    )}&name=${encodeURIComponent(formData.name)}&price=${encodeURIComponent(
      formData.price
    )}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Response from server:", data);
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
