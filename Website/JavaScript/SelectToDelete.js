window.onload = function () {
  const selectElement = document.getElementById("selectUser"); // Selected ID

  fetch("http://localhost/M.A.E.K.-LMS-/basex/BDGetDNI.php") // Fetch to the PHP file
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Change this from response.text() to response.json()
    })
    .then((data) => {
      console.log("Response from server:", data);

      if (data.error) {
        console.error("Error obtaining data:", data.error);
        return;
      }

      // We need access data.data since data is the entire JSON object and data.data is the array we want
      // Checking that it is an array prevents us from the error of trying to traverse something that is not an array
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        console.log("Received data:", data.data);

        // Clear select to add the new data
        selectElement.innerHTML = "";

        // Loop through data and aggregate it to select
        data.data.forEach((cliente) => {
          let option = document.createElement("option");
          option.value = cliente;
          option.textContent = cliente;
          // appendChild to add a option to the select
          selectElement.appendChild(option);
        });
      } else {
        selectElement.innerHTML =
          "<option>There are no clients available.</option>";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error sending the request: " + error.message);
    });
};

// Cancel button
function exit() {
  window.close();
}

function deleteUser() {
  // Obtain the selected DNI
  const dni = document.getElementById("selectUser").value;
  console.log("Selected DNI:", dni);

  if (dni === "") {
    alert("Please, select a user to be deleted.");
    return;
  }

  if (
    confirm("Are you sure you want to delete the client with DNI " + dni + "?")
  ) {
    fetch(`http://localhost/M.A.E.K.-LMS-/basex/BDDelete.php?dni=${dni}`)
      .then((response) => response.text())
      .then((data) => {
        console.log("Server response:", data);
        alert("Client deleted correctly.");
        window.close();
      })
      .catch((error) => {
        console.error("Error deleting the client:", error);
        alert("Error deleting the client. Please, try again.");
      });
  }
}
