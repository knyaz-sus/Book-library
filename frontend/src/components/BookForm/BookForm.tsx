import "./BookForm.css";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks";
import booksData from "../../data/books.json";
import { addBook, fetchBook } from "../../redux/slices/booksSlice";
import { setError } from "../../redux/slices/errorSlice";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const dispatch = useAppDispatch();
  const { isLoadingViaAPI } = useAppSelector((state) => state.books);
  const addRandomBook = (): void => {
    const randomBook = booksData[Math.floor(Math.random() * booksData.length)];
    dispatch(addBook(randomBook, "random"));
  };

  const addRandomBookViaAPI = () => {
    dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (title && author) {
      dispatch(addBook({ title, author }, "manual"));
      setAuthor("");
      setTitle("");
    } else {
      dispatch(setError("Make sure you provided book's title and author"));
    }
  };
  return (
    <div className="app-block book-form">
      <h2> Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add a New Book</button>
        <button type="button" onClick={addRandomBook}>
          Add a Random Book
        </button>
        <button
          disabled={isLoadingViaAPI}
          type="button"
          onClick={addRandomBookViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add a Random Book Via API"
          )}
        </button>
      </form>
    </div>
  );
}
