window.onload = function () {
  const buttonAddData = document.getElementById("buttonAddUser");
  const buttonDeleteData = document.getElementById("buttonDeleteUser");

  buttonAddData.onclick = function () {
    window.open("../HTML/PopUpAddUser.html", "_blank", "width=631,height=300");
  };
  buttonDeleteData.onclick = function () {
    window.open("../HTML/SelectUser.html", "_blank", "width=631,height=300");
  };

  document.querySelectorAll(".idSquare").forEach((square) => {
    square.addEventListener("click", function () {
      let row = this.closest("tr");
      let id = row.children[0].textContent.trim();

      window.open(
        `../../basex/ShowProductPage.php?id=${id}`,
        "_blank",
        "width=631,height=200"
      );
    });
  });

  if (localStorage.getItem("hasLoaded")) {
    localStorage.removeItem("hasLoaded");
    return;
  }

  fetch("http://localhost/M.A.E.K.-LMS-/basex/BDExport.php")
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
