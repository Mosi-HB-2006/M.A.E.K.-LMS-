window.onload = function () {
  const buttonAddData = document.getElementById("buttonAddUser");
  const buttonDeleteData = document.getElementById("buttonDeleteUser");

  buttonAddData.onclick = function () {
    window.open("PopUp.html", "_blank", "width=631,height=300");
  };
  buttonDeleteData.onclick = function () {
    window.open("SelectUser.html", "_blank", "width=631,height=300");
  };

  if (localStorage.getItem("hasLoaded")) {
    localStorage.removeItem("hasLoaded");
    return;
  }

  fetch("http://localhost/M.A.E.K.-LMS-/basex/BDExport.php")
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos recibidos:", data);
      localStorage.setItem("hasLoaded", "true");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error al hacer fetch:", error);
    });
};
