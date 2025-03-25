window.onload = function() {
    const buttonAddData = document.getElementById("buttonAddUser");
    const buttonAddClient = document.getElementById("buttonAddClient");
    const buttonAddProduct = document.getElementById("buttonAddProduct");

    buttonAddData.onclick = function() {
        window.open("../PopUp.html", "_blank", "width=631,height=349");
    };
    buttonAddClient.onclick = function() {
        window.open("https://stackoverflow.com/questions/24282604/window-open-with-target-blank-opens-a-new-browser-window", "_blank");
    };
    buttonAddProduct.onclick = function() {
        window.open("https://stackoverflow.com/questions/24282604/window-open-with-target-blank-opens-a-new-browser-window", "_blank");
    };
}