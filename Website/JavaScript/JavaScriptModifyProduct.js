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

  // Adding button function
  document
    .getElementById("modifyProductForm")
    .addEventListener("submit", function (event) {
      if (confirm("Are you sure?")) {
        submitForm(event, squareId);
      }
    });
};

// Function for control the form submit
function submitForm(event, squareId) {
  event.preventDefault();

  const formData = {
    id: squareId,
    name: document.getElementById("fname").value,
    price: document.getElementById("fprice").value,
  };

  if (!validateForm(formData)) {
    return false;
  }

  processFormData(formData);
}

// Apply restrictions
function validateForm(formData) {
  if (!formData.name || !formData.price) {
    alert("Please fill all required fields");
    return false;
  }

  if (formData.price < 0) {
    alert("Please use a valid price");
    return false;
  }
  return true;
}

// Fetch to the PHP file
function processFormData(formData) {
  fetch(
    `http://localhost/M.A.E.K.-LMS-/basex/BDModify.php?id=${formData.id}&name=${formData.name}&price=${formData.price}`
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
