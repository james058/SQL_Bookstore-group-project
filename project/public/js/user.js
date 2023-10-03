let xhttp;
let name;
let order_number;
let id;
let signin = document.getElementById("signin");
let submit1 = document.getElementById("sub");
let signup = document.getElementById("signup");
let submit2 = document.getElementById("submit2");

if (signin) {
    signin.addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("intro").style.display = "none";
        document.getElementById("si_form").style.display = "block";
    });
}

if (signup) {
    signup.addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("intro").style.display = "none";
        document.getElementById("su_form").style.display = "block";
    });
}



if (submit1) {
    submit1.addEventListener("click", function(event) {
        event.preventDefault();
        name = document.getElementById("form").elements[0].value;
        requestUserVerification("http://localhost:3000/userverification/" + name);
    });
}

if (submit2) {
    submit2.addEventListener("click", function(event) {
        event.preventDefault();
        createNewUser();

    })
}

function requestUserVerification(URL) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = proccesUserVerification;
    xhttp.open("GET", URL, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send();
}

function proccesUserVerification() {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
        let data = xhttp.responseText;
        let mainData = JSON.parse(data);
        if (mainData.length > 0) {
            document.getElementById("si_form").style.display = "none";
            document.getElementById("main").style.display = "block";
            id = mainData[0].customer_id
            console.log(id)
        } else {
            alert("Please enter a valid user");
        }
    }
}

function createNewUser() {
    let name = document.getElementById("uname");

    let requestBody = {
        customer_name: name.value,
    };

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            alert("Sign up successful")
            location.reload();
        } else if (xhttp.status === 400) {
            alert("Please verify your input")
        } else if (xhttp.status === 500) {
            alert("Please verify your input")
        }
    }

    let url = "http://localhost:3000/adduser";

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send(JSON.stringify(requestBody));
}