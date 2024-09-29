import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteBook,
  toggleFavorite,
  selectBooks,
} from "../../redux/slices/booksSlice";
import { RiBookmark3Fill, RiBookmark3Line } from "react-icons/ri";
import "./BookList.css";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";

const BookList = () => {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  const dispatch = useDispatch();
  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const filtredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, `gi`);

    // console.log(text.split(regex));
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filtredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. <b>{highlightMatch(book.title, titleFilter)}</b>
                &nbsp; by <i>{highlightMatch(book.author, authorFilter)}</i> (
                {book.source})
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {Boolean(book.isFavorite) ? (
                    <RiBookmark3Fill className="star-icon" />
                  ) : (
                    <RiBookmark3Line className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>Del</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
