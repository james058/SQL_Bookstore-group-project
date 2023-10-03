let form = document.getElementById("searchform");
form.addEventListener("keyup", function() {
    document.getElementById("results").innerHTML = ""
    let bname = document.getElementById("bname");
    let bgenre = document.getElementById("bgenre");
    let bISBN = document.getElementById("bISBN");
    let price = document.getElementById("price");
    let bpages = document.getElementById("bpages");
    let auname = document.getElementById("aname");
    let prname = document.getElementById("pname");

    let reqBody = {
        name: bname.value,
        genre: bgenre.value,
        isbn: bISBN.value,
        price: price.value,
        pages: bpages.value,
        aname: auname.value,
        pname: prname.value
    };

    let url = "http://localhost:3000/books"
    requestBookInfo(url, reqBody);
});

function requestBookInfo(URL, body) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = processbBookInfo;
    xhttp.open("POST", URL, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send(JSON.stringify(body));
}

function processbBookInfo() {
    console.log("was this function even called ")
    console.log(xhttp.status)
    if (xhttp.status === 200) {
        let data = xhttp.responseText;
        let books = JSON.parse(data);
        console.log(books)
        console.log("we here")
        for (let book of books) {
            let div = document.createElement("div");
            div.classList.add("resultChild")

            let name = document.createElement("p");
            name.innerHTML = "Book Name: " + book.book_name;
            name.value = book.book_name

            let genre = document.createElement("p");
            genre.innerHTML = "Book genre: " + book.book_genre;

            let isbn = document.createElement("p");
            isbn.innerHTML = "Book ISBN: " + book.book_ISBN;
            isbn.value = book.book_ISBN

            let price = document.createElement("p");
            price.innerHTML = "Book Price: " + book.book_price;
            price.value = book.book_price

            let pages = document.createElement("p");
            pages.innerHTML = "Pages: " + book.pages;

            let aname = document.createElement("p");
            aname.innerHTML = "Authur name: " + book.author_name;

            let abio = document.createElement("p");
            abio.innerHTML = "Authur bio: " + book.author_bio;

            let pname = document.createElement("p");
            pname.innerHTML = "Publisher name : " + book.publisher_name;

            let label = document.createElement("label");
            label.innerHTML = "Choose a quantity: "

            let line_break = document.createElement("br")
            let line_break2 = document.createElement("br")


            let select = document.createElement("select")
            for (let i = 1; i <= 10; i++) {
                let option = document.createElement("option")
                option.value = i
                option.innerHTML = i
                select.appendChild(option)
            }

            let button = document.createElement("button")
            button.classList.add("button");
            button.innerHTML = "Add book to cart"

            div.appendChild(name);
            div.appendChild(genre);
            div.appendChild(isbn);
            div.appendChild(price);
            div.appendChild(pages);
            div.appendChild(aname);
            div.appendChild(abio);
            div.appendChild(pname);
            div.appendChild(label);
            div.appendChild(select);
            div.appendChild(line_break)
            div.appendChild(line_break2)
            div.appendChild(button);
            document.getElementById("results").appendChild(div)



        }
        let buttons = document.getElementsByClassName("button");
        let nodes = Array.from(buttons)

        nodes.forEach(node => {
            node.addEventListener("click", function handleClick(event) {
                event.preventDefault()
                sendCartPost(event)
            })
        })
    }
}

function sendCartPost(event) {
    let book_name = event.target.parentElement.firstChild.value
    let book_ISBN = parseInt(event.target.parentElement.firstChild.nextElementSibling.nextElementSibling.value)
    let book_price = parseFloat(event.target.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.value)
    let quan = event.target.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.selectedIndex + 1
    let req_body = {
        book_name: book_name,
        book_price: book_price,
        book_ISBN: book_ISBN,
        id: id,
        b_quantity: quan
    }

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
            alert("Book has been added to cart")
        }
    }

    let url = "http://localhost:3000/updatecart"

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send(JSON.stringify(req_body));

}