window.onload = function () {
  const buttonAddClient = document.getElementById("buttonAddClient");

  buttonAddClient.onclick = function () {
    client_dni = document.getElementById("fdni").value;
    client_name = document.getElementById("lname").value;
    client_gender = document.querySelector(
      "input[name='gender']:checked"
    ).value;
    client_phone = document.getElementById("lphone").value;
    client_image = document.getElementById("limg").value;
    client_vip = document.querySelector("input[name='vip']:checked");

    if (vip !== null) {
      vip = vip.value;
    }

    fetch(
      `../PHP/index.php?dni=${client_dni}&name${client_name}&gender${client_gender}&phone${client_phone}&image${client_image}&vip${client_vip}`
    );
  };
};
