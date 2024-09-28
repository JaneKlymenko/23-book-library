import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import { RiBookmark3Fill, RiBookmark3Line } from "react-icons/ri";
import "./BookList.css";
import { selectTitleFilter } from "../../redux/slices/filterSlice";

const BookList = () => {
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);
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
    // console.log({ title: book.title, matchesTitle });
    return matchesTitle;
  });
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
                {++i}. <b>{book.title}</b> by <i>{book.author}</i>
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
