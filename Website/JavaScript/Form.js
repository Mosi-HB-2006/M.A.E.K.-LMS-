window.onload = function () {
  const buttonAddClient = document.getElementById("buttonAddClient");

  buttonAddClient.onclick = function () {
    dni = document.getElementById("fdni").value;
    name = document.getElementById("lname").value;
    gender = document.querySelector("input[name='gender']:checked").value;
    phone = document.getElementById("lphone").value;
    image = document.getElementById("limg").value;
    vip = document.querySelector("input[name='vip']:checked");

    if (vip !== null) {
      vip = vip.value;
    }
    console.log(dni, name, gender, phone, image, vip);
  };
};
