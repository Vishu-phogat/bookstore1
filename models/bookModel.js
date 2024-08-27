import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: 
  { type: String, 
    required: true },
  author: 
  { type: String, 
    required: true },
  isbn: 
  { type: String, 
    unique: true, 
    required: true },
  publishedDate: 
  { type: Date, 
    default: Date.now },
});

const Book = model('Book', bookSchema);
export default Book;
