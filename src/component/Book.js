import { shelfOptions } from '../constants/shelfOptions';

const Book = ({ book, handleChangeShelf }) => {
  return (
    <li key={book.id}>
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`,
            }}
          ></div>
          <div className='book-shelf-changer'>
            <select
              defaultValue={book.shelf ? book.shelf : 'none'}
              onChange={(e) => {
                handleChangeShelf(e.target.value, book);
              }}
            >
              <option value='move' disabled>
                Move to...
              </option>
              {shelfOptions.map((option, idx) => {
                return (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        {book?.authors?.map((author, i) => {
          return (
            <div key={i} className='book-authors'>
              {author};
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default Book;
