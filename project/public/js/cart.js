let view_cart = document.getElementById("viewcart");


let total;

view_cart.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("cart").style.display = "block";
    document.getElementById("main").style.display = "none";
    displayCart("http://localhost:3000/cart/" + id);
});

function displayCart(URL) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = proccesDisplayCart;
    xhttp.open("GET", URL, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send();
}

function proccesDisplayCart() {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
        let data = xhttp.responseText;
        let mainData = JSON.parse(data);
        document.getElementById("body").innerHTML = `<tr>
        <th>Book Name </th>
        <th>Price </th>
        <th>Quantity</th>
        <th></th>
    </tr>`;
        for (let item of mainData) {
            let b_name = item.book_name;
            let b_price = item.book_price;
            let b_quan = item.b_quantity;

            if (b_quan > 0) {
                let row = document.createElement("tr");
                let name_data = document.createElement("td");
                let price_data = document.createElement("td");
                let quan_data = document.createElement("td");
                let blank = document.createElement("td");
                let remove_btn = document.createElement("button");
                let remove_10btn = document.createElement("button");

                remove_btn.innerHTML = "Remove";
                remove_10btn.innerHTML = "Remove 10";
                remove_btn.classList.add("remove");
                remove_10btn.classList.add("remove10");

                blank.appendChild(remove_btn);
                blank.appendChild(remove_10btn);

                name_data.innerHTML = b_name;
                price_data.innerHTML = b_price;
                quan_data.innerHTML = b_quan;

                row.appendChild(name_data);
                row.appendChild(price_data);
                row.appendChild(quan_data);
                row.appendChild(blank);

                document.getElementById("body").appendChild(row);
            } else {
                let url = "http://localhost:3000/deleteitem";

                xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function() {
                    if (
                        xhttp.readyState === XMLHttpRequest.DONE &&
                        xhttp.status === 200
                    ) {
                        displayCart("http://localhost:3000/cart/" + id);
                    }
                };

                xhttp.open("DELETE", url, true);
                xhttp.send();
            }
        }

        let buttons = document.getElementsByClassName("remove");
        let nodes = Array.from(buttons);

        nodes.forEach((node) => {
            node.addEventListener("click", function handleClick(event) {
                event.preventDefault();
                sendCartDelete(event);
            });
        });

        let buttons10 = document.getElementsByClassName("remove10");
        let nodes10 = Array.from(buttons10);

        nodes10.forEach((node) => {
            node.addEventListener("click", function handleClick(event) {
                event.preventDefault();
                sendCart10Delete(event);
            });
        });

        getTotal("http://localhost:3000/carttotal/" + id)
        document.getElementById("total").innerHTML = "Total: $" + total
        document.getElementById("total").setAttribute("value", String(total))
        let check_out = document.getElementById("checkout");
        console.log(total)
        if (total > 0) {
            check_out.addEventListener("click", function(event) {
                event.preventDefault();
                document.getElementById("cart").style.display = "none"
                document.getElementById("checkdiv").style.display = "block"
                order_number =
                    Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

            })
        } else {
            check_out.disabled = true;
        }
    }
}

function getTotal(URL) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = processGetTotal;
    xhttp.open("GET", URL, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send();
}

function processGetTotal() {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
        let data = xhttp.responseText;
        let main = JSON.parse(data);
        let val = Object.values(main[0])
        total = parseFloat(val[0])
    }
}

function sendCartDelete(event) {
    let url = "http://localhost:3000/deleteitem/";
    let name = event.target.parentElement.parentElement.firstChild.innerHTML;
    let c_id = id;

    url += name;
    url += "/";
    url += c_id;

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            displayCart("http://localhost:3000/cart/" + id);
        }
    };

    xhttp.open("DELETE", url, true);
    xhttp.send();
}

function sendCart10Delete(event) {
    let url = "http://localhost:3000/delete10items/";
    let name = event.target.parentElement.parentElement.firstChild.innerHTML;
    let c_id = id;

    url += name;
    url += "/";
    url += c_id;

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            displayCart("http://localhost:3000/cart/" + id);
        }
    };

    xhttp.open("DELETE", url, true);
    xhttp.send();
}