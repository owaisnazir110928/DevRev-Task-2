const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  yearOfPublishing: {
    type: Number,
    required: true
  },
  numOfAvailableCopies: {
    type: Number,
    required: true
  },
  imageLink: {
    type: String
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
