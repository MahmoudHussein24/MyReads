import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import * as BooksAPI from '../../BooksAPI';
import { getAll } from '../../BooksAPI';
import Shelf from '../../component/Shelf';
import Spinner from '../../component/Spinner/spinner';

function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeShelf = (newShelf, book) => {
    console.log(book, newShelf);
    BooksAPI.update(book, newShelf)
      .then(() => {
        let found = false;
        let newBooks = books.map((b) => {
          if (b.id === book.id) {
            b.shelf = newShelf;
            found = true;
          }
          return b;
        });
        if (!found) {
          book.shelf = newShelf;
          newBooks.push(book);
        }
        setBooks(newBooks);
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

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <Shelf
              books={books.filter((book) => book.shelf === 'currentlyReading')}
              title='Currently Reading'
              handleChangeShelf={handleChangeShelf}
            />
            <Shelf
              books={books.filter((book) => book.shelf === 'wantToRead')}
              title='Want to Read'
              handleChangeShelf={handleChangeShelf}
            />
            <Shelf
              books={books.filter((book) => book.shelf === 'read')}
              title='Read'
              handleChangeShelf={handleChangeShelf}
            />
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
