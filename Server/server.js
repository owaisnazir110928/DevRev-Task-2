const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

const User = require("./models/user");
const Book = require("./models/book");

app.post("/users", async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    await user.save();

    res.json({ msg: "saved" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.json({ msg: "successfull", userData: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/getuser", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).populate("books_rented");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.books_rented);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const {
      bookName,
      authorName,
      genre,
      yearOfPublishing,
      numOfAvailableCopies,
      imageLink,
    } = req.body;

    const book = new Book({
      bookName,
      authorName,
      genre,
      yearOfPublishing,
      numOfAvailableCopies,
      imageLink,
    });

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/books/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const perPage = 8;
    const startIndex = (page - 1) * perPage;

    const books = await Book.find().skip(startIndex).limit(perPage);

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/books/rent", async (req, res) => {
  try {
    const { email, bookIds } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const books = await Book.find({ _id: { $in: bookIds } });

    if (books.length !== bookIds.length) {
      return res.status(400).json({ error: "One or more books not found" });
    }

    const unavailableBooks = books.filter(
      (book) => book.numOfAvailableCopies === 0
    );
    if (unavailableBooks.length > 0) {
      return res
        .status(400)
        .json({ error: "One or more books are not available" });
    }

    books.forEach((book) => {
      user.books_rented.push(book);
      book.numOfAvailableCopies--;
    });

    await user.save();
    await Promise.all(books.map((book) => book.save()));

    res.json({ msg: "successfull" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
