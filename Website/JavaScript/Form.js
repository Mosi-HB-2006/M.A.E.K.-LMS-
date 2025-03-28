window.onload = function () {
  const buttonAddClient = document.getElementById("buttonAddClient");

  buttonAddClient.onclick = function () {
    let client_dni = document.getElementById("fdni").value;
    let client_name = document.getElementById("lname").value;
    let client_gender = document.querySelector(
      "input[name='gender']:checked"
    )?.value;
    let client_phone = document.getElementById("lphone").value;
    let client_image = document.getElementById("limg").value;
    let client_vip = document.getElementById("vip").checked ? "VIP" : "";

    // Verifica que todos los campos están completos
    if (
      !client_dni ||
      !client_name ||
      !client_gender ||
      !client_phone ||
      !client_image
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    fetch(
      `http://localhost/M.A.E.K.-LMS-/basex/BDAccess.php?dni=${client_dni}&name=${client_name}&gender=${client_gender}&phone=${client_phone}&image=${client_image}&vip=${client_vip}`
    )
      .then((response) => {
        console.log("Request sent successfully");
        // No need to return response.text() since we're not expecting any data
      })
      .catch((error) => {
        console.log("Error sending the request:", error);
      });
  };
};
