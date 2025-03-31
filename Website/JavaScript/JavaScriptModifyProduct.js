window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const squareId = urlParams.get('id');

    if (squareId) {
        document.getElementById("fid").value = squareId;
    }
}