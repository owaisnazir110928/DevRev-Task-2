import "../App.css";
function Popup({ onClose, children }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>DEVREV Round 2</h2>
        <div className="features-summary">
          <p>
            <strong>Made Using:</strong> MERN Stack from scratch.
          </p>
          <p>
            <strong>List of books:</strong> Displays fetched books.
          </p>
          <p>
            <strong>Infinite scroll:</strong> Loads more books on reaching the
            bottom.
          </p>
          <p>
            <strong>Search bar:</strong> Search books by name.
          </p>
          <p>
            <strong>Sorting options:</strong> Sort by name, author, date,
            availability.
          </p>
          <p>
            <strong>Counts:</strong> Searched books, available copies, total
            count.
          </p>
          <p>
            <strong>Cart functionality:</strong> Add books, remove from cart.
          </p>
          <p>
            <strong>User authentication:</strong> Required for adding books to
            cart.
          </p>
          <p>
            <strong>Cart display:</strong> Shows added books, allows removal.
          </p>
          <p>
            <strong>Loading skeletons:</strong> Visual placeholders during
            fetching.
          </p>
          <p>
            <strong>Search suggestions:</strong> Provides suggestions while
            typing.
          </p>
          <p>
            <strong>Dynamic results:</strong> Updates based on search and
            sorting.
          </p>
          <p>
            <strong>
              !!! It May Take Time At First For Loading Because The Server Is
              Hosted On A Free Platform
            </strong>
          </p>
          <p>
            <strong>Dummy Login:</strong> | email: owais@gmail.com |
            password:Hello
          </p>
        </div>
      </div>
    </div>
  );
}
export default Popup;
