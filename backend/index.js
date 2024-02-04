import express, { response } from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";

const app = express();

//middleware for parsing json data
app.use(express.json()); //It allows us to access the request body as req.body in the routes

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack!");
}); // GET request to the server (read) - fetch() in frontend (React)
// use request to get data from the client and response to send data to the client
// request and response are objects with properties and methods (functions) that we can use to get data from the client and send data to the client respectively

//route to save a book to the database
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedYear
    ) {
      return response.status(400).send({
        message: " Send all required fields: title, author, publishedYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishedYeared: request.body.publishedYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// The first argument is the path of the route, the second argument is a callback function that will be executed when the client makes a POST request to the server
// Working with MongoDB is asynchronous, so we need to use async/await
// The try/catch block is used to handle errors

// get all books from the database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).send(books);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get a book by id from the database
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    return response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for updating a book in the database by id
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedYear
    ) {
      return response.status(400).send({
        message: " Send all required fields: title, author, publishedYear",
      });
    }
    const { id } = request.params;

    const result = await book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });


  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    }); //Callback functions
  })
  .catch((error) => {
    console.log(error);
  });
