// Start the server
import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server's up! Listening on port ${port}...`);
});

// For retrieving info from submitted forms
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));

// So EJS files can have access to the images and styles we placed in "public"
app.use(express.static("public"));

import pg from "pg";
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booknotes",
  password: "Yahya1918!",
  port: 5432,
});
db.connect();

app.get("/", async (req, res) => {
    const books = await db.query(`SELECT * FROM books ORDER BY id`);
    res.render("index.ejs", {books: books.rows});
})

app.get("/book", async (req, res) => {
    const book = await db.query(`SELECT * FROM books WHERE id=${req.query.id}`)
    const notes = await db.query(`SELECT * FROM notes WHERE id=${req.query.id} ORDER BY note_id`)
    res.render("book.ejs", {book: book.rows[0], notes: notes.rows},)
})

app.post("/new-book", async (req,res) => {
    console.log(req.body)
    try {
        await db.query(`
            INSERT INTO books (title, isbn, date_read, rating_out_of_ten, description)
            VALUES(
            '${req.body.title}', ${req.body.ISBN}, '${req.body.date}', 
            ${req.body.rating}, '${req.body.description}'
            )
            `)
    } catch (error) {
        console.log(error)
    }
    res.redirect("/");
})

app.post("/new-note", async (req, res) => {
    console.log(req.body);
    try {
        await db.query(`INSERT INTO notes VALUES($1, $2)`, [req.body.id, req.body.note])
    } catch (error) {
        console.log(error);
    }
    res.redirect(`/book?id=${req.body.id}`)
})

app.post("/delete-note", async (req, res) => {
    await db.query(`DELETE FROM notes WHERE note_id=${req.body.id}`)
    res.redirect(`/book?id=${req.body.bookId}`)
})

app.post("/delete-book", async (req, res) => {
    await db.query(`DELETE FROM books WHERE id=${req.body.id}`)
    res.redirect("/")
})

app.post("/edit-book", async (req, res) => {
    try {
        await db.query(
            `UPDATE books SET
              title=$1,
              isbn=$2,
              date_read=$3,
              rating_out_of_ten=$4,
              description=$5
              WHERE id=$6`,
            [
              req.body.title,
              req.body.ISBN,
              req.body.date,
              req.body.rating,
              req.body.description,
              req.body.id
            ]
          );
    } catch (error) {
        console.log(error)
    }
        res.redirect("/")
})

app.post("/edit-note", async (req, res) => {
    console.log(req.body)
    try {
        await db.query(`UPDATE notes SET note=$1 WHERE note_id=$2`, [req.body.note, req.body.id])
    } catch (error) {
        console.log(error)
    }
    res.redirect(`/book?id=${req.body.book_id}`)
})