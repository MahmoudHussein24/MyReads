import Book from './Book';

const Shelf = ({ books, title, handleChangeShelf }) => {
  return (
    <>
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{title}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {books.map((book, index) => (
              <Book
                key={book.id}
                book={book}
                handleChangeShelf={handleChangeShelf}
                index={index}
              />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Shelf;
