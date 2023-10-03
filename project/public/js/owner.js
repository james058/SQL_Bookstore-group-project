let xhttp;
let button = document.getElementById("submit");

if (button) {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        let name = document.getElementById("myform").elements[0].value;
        requestOwnerVerification(
            "http://localhost:3000/ownerverification/" + String(name)
        );
    });
}

let add_button = document.getElementById("add_submit");
if (add_button) {
    add_button.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("this");
        sendAddPostRequest();
        console.log("after");
    });

}

function requestOwnerVerification(URL) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = processOwnerVerification;
    xhttp.open("GET", URL, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send();
}

function processOwnerVerification() {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
        let data = xhttp.responseText;
        let mainData = JSON.parse(data);
        console.log(mainData.length);
        if (mainData.length > 0) {
            document.getElementById("form").style.display = "none";
            document.getElementById("selection").style.display = "block";
        } else {
            document.getElementById("error").style.display = "block";
        }
    } else {
        console.log("There was an error in ur response");
    }
}

function sendAddPostRequest() {
    let name = document.getElementById("name");
    let genre = document.getElementById("genre");
    let isbn = document.getElementById("ISBN");
    let price = document.getElementById("price");
    let pages = document.getElementById("pages");
    let aid = document.getElementById("aid");
    let pid = document.getElementById("pid");

    let requestBody = {
        book_name: name.value,
        book_genre: genre.value,
        book_ISBN: isbn.value,
        book_price: price.value,
        pages: pages.value,
        author_id: aid.value,
        publisher_id: pid.value,
    };

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            alert("The book was successfully added")
            document.getElementById("name").value = ""
            document.getElementById("genre").value = ""
            document.getElementById("ISBN").value = ""
            document.getElementById("price").value = ""
            document.getElementById("pages").value = ""
            document.getElementById("aid").value = ""
            document.getElementById("pid").value = ""
        } else if (xhttp.status === 400) {
            alert("Please fill out all the fields")
        } else if (xhttp.status === 500) {
            alert("Please verify your inputs")
        }
    };

    let url = "http://localhost:3000/addbook";

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send(JSON.stringify(requestBody));
}