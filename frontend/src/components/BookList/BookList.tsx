import "./BookList.css";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeBook, toggleFavorite } from "../../redux/slices/booksSlice";

export default function BookList() {
  const dispatch = useAppDispatch();

  const filterTitleValue = useAppSelector((state) => state.filter.title);
  const filterAuthorValue = useAppSelector((state) => state.filter.author);
  const filterOnlyFavorite = useAppSelector(
    (state) => state.filter.onlyFavorite
  );
  const { books } = useAppSelector((state) => state.books);

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(filterTitleValue.toLowerCase());
    const matchersAuthor = book.author
      .toLowerCase()
      .includes(filterAuthorValue.toLowerCase());
    const mathesIsFavorite = filterOnlyFavorite ? book.isFavorite : true;
    return matchesTitle && matchersAuthor && mathesIsFavorite;
  });

  const deleteBookOnClick = (id: string) => dispatch(removeBook(id));
  const toggleFavoriteOnClick = (id: string) => dispatch(toggleFavorite(id));

  const highlightFound = (
    text: string,
    filter: string
  ): string | (string | JSX.Element)[] => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, i) => {
      if (filter.toLowerCase() === substring.toLowerCase()) {
        return (
          <span className="highlight" key={i}>
            {substring}
          </span>
        );
      } else return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length ? (
        <ul>
          {filteredBooks.map((book, i) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++i}. {highlightFound(book.title, filterTitleValue)}{" "}
                  <strong>
                    {highlightFound(book.author, filterAuthorValue)}
                  </strong>
                  {` (${book.sourse})`}
                </div>
                <div className="book-actions">
                  <span onClick={() => toggleFavoriteOnClick(book.id)}>
                    {book.isFavorite ? (
                      <BsBookmarkStarFill className="star-icon" />
                    ) : (
                      <BsBookmarkStar className="star-icon" />
                    )}
                  </span>
                  <button onClick={() => deleteBookOnClick(book.id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
}
