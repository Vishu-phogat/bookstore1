import Book, { find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/bookModel';

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, isbn, publishedDate } = req.body;
    const book = new Book({ title, author, isbn, publishedDate });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all books
const getBooks = async (req, res) => {
    const { title, author, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
  
    try {
      const books = await Book.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit);
      const count = await Book.countDocuments(query);
      
      res.status(200).json({
        books,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Get a book by ID
const getBookById = async (req, res) => {
  try {
    const book = await findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
  try {
    const book = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const book = await findByIdAndDelete(req.params.id);
    if (book) {
      res.status(200).json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
