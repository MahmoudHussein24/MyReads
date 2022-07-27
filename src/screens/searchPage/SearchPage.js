import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { getAll, search, update } from '../../BooksAPI';
import Book from '../../component/Book';
import Spinner from '../../component/Spinner/spinner';

const shelfOptions = [
  { label: 'Currenlty Reading', value: 'currentlyReading' },
  { label: 'want to read', value: 'wantToRead' },
  {
    label: 'read',
    value: 'read',
  },
  { label: 'none', value: 'none' },
];
function SearchPage() {
  const [bookValue, setBookValue] = useState('');
  const [FilteredBooks, setFilteredBooks] = useState([]);

  const [books, setBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const SearchBook = () => {
    if (!bookValue) {
      setFilteredBooks([]);
      return;
    }
    setIsLoading(true);

    search(bookValue)
      .then((response) => {
        if (typeof response !== 'undefined') {
          if (response.error === 'empty query') {
            setFilteredBooks([]);
            setIsLoading(false);
          } else {
            const searchBooks = response.map((book) => {
              //check if the books in the one of the shelves
              const foundBook = books.find((b) => b.id === book.id);
              if (foundBook) {
                book.shelf = foundBook.shelf;
              } else {
                book.shelf = 'none';
              }
              return book;
            });
            setFilteredBooks(searchBooks);
            setIsLoading(false);
          }
        } else {
          setFilteredBooks([]);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShelfChange = (value, book) => {
    update(book, value)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsLoading(true);
    getAll()
      .then((data) => {
        setBooks(data);
      })
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      SearchBook();
    }, 1000);

    // if this effect run again, because `value` changed, we remove the previous timeout
    return () => clearTimeout(timeout);
  }, [bookValue]);

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              value={bookValue}
              onChange={(e) => {
                setBookValue(e.target.value);
              }}
              placeholder='Search by title or author'
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {FilteredBooks?.map((book, index) => (
              <Book
                key={book.id}
                book={book}
                handleChangeShelf={handleShelfChange}
                shelfOptions={shelfOptions}
              />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
