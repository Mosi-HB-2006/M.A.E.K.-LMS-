window.onload = function () {
  const buttonAddData = document.getElementById("buttonAddUser");
  const buttonDeleteData = document.getElementById("buttonDeleteUser");

  buttonAddData.onclick = function () {
    window.open("../HTML/PopUp.html", "_blank", "width=631,height=300");
  };
  buttonDeleteData.onclick = function () {
    window.open("../HTML/SelectUser.html", "_blank", "width=631,height=300");
  };
};
