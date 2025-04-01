window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const squareId = urlParams.get('id');
    const squareName = urlParams.get('name');
    const squarePrice = urlParams.get('price');

    if (squareId) {
        document.getElementById("lid").textContent = squareId;
        document.getElementById("fname").value = squareName;
        document.getElementById("fprice").value = squarePrice;
    }

    document.getElementById("modifyProductForm").addEventListener("submit", function (event) {
        submitForm(event, squareId);
    });
};

function submitForm(event, squareId) {
    event.preventDefault();

    const formData = {
        id: squareId,
        name: document.getElementById("fname").value,
        price: document.getElementById("fprice").value
    };

    if (!validateForm(formData)) {
        return false;
    }

    processFormData(formData);
}

function validateForm(formData) {
    if (!formData.name || !formData.price) {
        alert("Please fill all required fields");
        return false;
    }
    return true;
}

function processFormData(formData) {
    fetch(
        `http://localhost/M.A.E.K.-LMS-/basex/BDModify.php?id=${formData.id}&name=${formData.name}&price=${formData.price}`
    )

    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })

    .then((data) => {
        console.log("Response from server:", data);
        if (window.opener && !window.opener.closed) {
            window.opener.location.reload();
            window.close();
        }
    })

    .catch((error) => {
        console.error("Error:", error);
        alert("Error sending the request: " + error.message);
    });
}
