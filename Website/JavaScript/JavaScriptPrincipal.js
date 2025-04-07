window.onload = function () {
  // Getting the button elements
  const buttonAddData = document.getElementById("buttonAddUser");
  const buttonDeleteData = document.getElementById("buttonDeleteUser");

  // Setting buttons functions
  buttonAddData.onclick = function () {
    window.open("../HTML/PopUpAddUser.html", "_blank", "width=631,height=300");
  };
  buttonDeleteData.onclick = function () {
    window.open("../HTML/SelectUser.html", "_blank", "width=631,height=300");
  };

  // For select a product id and see the information apart
  document.querySelectorAll(".idSquare").forEach((square) => {
    square.addEventListener("click", function () {
      let row = this.closest("tr");
      let id = row.children[0].textContent.trim();

      window.open(
        `../PHP/ShowProductPage.php?id=${encodeURIComponent(id)}`,
        "_blank",
        "width=631,height=200"
      );
    });
  });

  // To avoid a infinite loop
  if (localStorage.getItem("hasLoaded")) {
    localStorage.removeItem("hasLoaded");
    return;
  }

  // Fetch to the PHP file
  fetch("http://localhost/M.A.E.K.-LMS-/Website/PHP/BDExport.php")
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received:", data);
      localStorage.setItem("hasLoaded", "true");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error al hacer fetch:", error);
    });
};
