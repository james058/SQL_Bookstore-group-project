const express = require("express");
const mysql = require("mysql2");
const path = require("path");

//create connection to database
const username = "root";
const password = "Lilchidz2003";

let connection = mysql.createConnection({
    host: "127.0.0.1",
    user: username,
    password: password,
    database: "LOOKINNABOOK",
});

//connect
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const app = express();
app.use(express.static("public"));
app.get("/ownerverification/:name", (req, res) => {
    let sql = `SELECT * FROM OWNERS WHERE owner_name = "${req.params.name}"`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/userverification/:name", (req, res) => {
    let sql = `SELECT *FROM USERS WHERE customer_name = "${req.params.name}"`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/cart/:id", (req, res) => {
    let sql = `SELECT * FROM CART WHERE customer_id = ${req.params.id}`
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})
app.get("/carttotal/:id", (req, res) => {
    let sql = `SELECT SUM(b_quantity * book_price) FROM CART WHERE customer_id = ${req.params.id};`
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.post("/books", express.json(), (req, res) => {
    let sql = `
    SELECT * FROM BOOKS JOIN AUTHOR ON author_id = AUTHOR.a_id JOIN PUBLISHER ON publisher_id = PUBLISHER.id
    WHERE book_name LIKE "${req.body.name}%"
    AND book_genre LIKE "${req.body.genre}%"
    AND book_ISBN LIKE "${req.body.isbn}%"
    AND book_price LIKE "${req.body.price}%"
    AND pages LIKE "${req.body.pages}%"
    AND author_name LIKE "${req.body.aname}%"
    AND publisher_name LIKE "${req.body.pname}%";
    `
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
app.post("/addbook", express.json(), function(req, res, next) {
    let book_name = req.body.book_name;
    let book_genre = req.body.book_genre;
    let book_ISBN = req.body.book_ISBN;
    let book_price = req.body.book_price;
    let pages = req.body.pages;
    let author_id = req.body.author_id;
    let publisher_id = req.body.publisher_id;

    if (
        book_name === undefined ||
        book_genre === undefined ||
        book_ISBN === undefined ||
        book_price === undefined ||
        pages === undefined ||
        author_id === undefined ||
        publisher_id === undefined
    ) {
        res.status(400).send("The body of the request is not properly formatted");
    } else {
        let sql = `INSERT INTO BOOKS(book_name, book_genre, book_ISBN, book_price, pages, quantity, author_id, publisher_id)
        VALUES("${book_name}", "${book_genre}", ${book_ISBN}, ${book_price}, ${pages}, ${1000}, ${author_id}, ${publisher_id});`;
        let query = connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send("The body of the request is improperly formatted");
                console.log(err);
            } else {
                res.status(200).send(req.body);
            }
        });
    }
});

app.post("/adduser", express.json(), function(req, res, next) {
    let customer_name = req.body.customer_name;
    if (customer_name === undefined) {
        res.status(400).send("The body of the request is not properly formatted");
    } else {
        let sql = `INSERT INTO USERS(customer_name)
        VALUES("${customer_name}");`;
        let query = connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send();
            } else {
                res.status(200).send(req.body);
            }
        });
    }
});

app.post("/updatecart", express.json(), function(req, res, next) {
    let book_name = req.body.book_name
    let book_price = req.body.book_price
    let book_ISBN = req.body.book_ISBN
    let customer_id = req.body.id
    let b_quantity = req.body.b_quantity

    let sqll = `SELECT * FROM CART WHERE book_ISBN = ${book_ISBN};`
    let queryy = connection.query(sqll, (err, result) => {
        if (result.length === 0) {
            let sql = `INSERT INTO CART VALUES("${book_name}", ${book_price}, ${book_ISBN}, ${customer_id}, ${b_quantity});`
            let query = connection.query(sql, (err, result) => {
                if (err) throw err
                res.status(200).send(req.body)
                console.log(req.body)
            })
        } else if (result.length > 0) {
            let sql = `UPDATE CART 
                       SET b_quantity = ${result[0].b_quantity + b_quantity}
                       WHERE book_ISBN = ${book_ISBN};`

            let query = connection.query(sql, (err, result) => {
                if (err) throw err
                res.status(200).send(req.body)
            })

        }
    })


})

app.delete("/deletebook/:isbn", function(req, res, next) {
    let isbn = req.params.isbn;
    let sql = `DELETE FROM BOOKS WHERE book_ISBN = ${isbn};`;
    let query = connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else if (result.affectedRows == 0) {
            res.status(404).send();
        } else {
            res.status(200).send();
        }
    });
});

app.delete("/deleteitem", function(req, res, next) {
    let sql = `DELETE FROM CART WHERE b_quantity = 0;`;
    let query = connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else if (result.affectedRows == 0) {
            res.status(404).send();
        } else {
            res.status(200).send();
        }
    });
})


app.delete("/deleteitem/:name/:id", function(req, res, next) {
    let name = req.params.name;
    let id = req.params.id;

    let sql = `UPDATE CART 
                       SET b_quantity = CART.b_quantity - 1
                       WHERE book_name= "${name}" AND customer_id = ${id} AND b_quantity > 0;`
    let query = connection.query(sql, (err, result) => {
        if (err) throw err
        res.status(200).send(req.body)
    })
})

app.delete("/delete10items/:name/:id", function(req, res, next) {
    let name = req.params.name;
    let id = req.params.id;

    let sql = `UPDATE CART 
                       SET b_quantity = CART.b_quantity - 10
                       WHERE book_name= "${name}" AND customer_id = ${id} AND b_quantity > 9;`
    let query = connection.query(sql, (err, result) => {
        if (err) throw err
        res.status(200).send(req.body)
    })
})


app.listen("3000", () => {
    console.log("Server started on port 3000");
});