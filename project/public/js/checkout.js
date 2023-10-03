let submitt = document.getElementById("submit_info");

submitt.addEventListener("click", function(event) {
    event.preventDefault()
})

function sendAddPostRequest() {
    let address = document.getElementById("address");
    let card_num = document.getElementById("card_num");
    let pin = document.getElementById("card_pin");

    let requestBody = {
        customer_address: address.value,
        card_number: card_num.value,
        card_pin: pin.value,
        customer_id: id,
        cutomer_name: name,
        order_number: order_number
    };

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            alert("Your Order has been processed")
            document.getElementById("address").value = ""
            document.getElementById("card_num").value = ""
            document.getElementById("card_pin").value = ""
        } else if (xhttp.status === 400) {
            alert("Please fill out all the fields")
        } else if (xhttp.status === 500) {
            alert("Please verify your inputs")
        }
    };

    let url = "http://localhost:3000/addcheckout";

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send(JSON.stringify(requestBody));
}