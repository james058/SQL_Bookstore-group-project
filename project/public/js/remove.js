let xhttp;

let btn = document.getElementById("sub")
btn.addEventListener("click", function(event) {
    event.preventDefault();
    sendDeleteRequest();
})

function sendDeleteRequest() {
    let url = "http://localhost:3000/deletebook/"
    let isbn = document.getElementById("ISBN").value;

    url += isbn

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            alert("The book was succesfully deleted");
            document.getElementById("ISBN").value = ""
        } else if (xhttp.status === 404) {
            alert("Please make sure the ISBN is correct")
        }
    };


    xhttp.open("DELETE", url, true);
    xhttp.send();
}