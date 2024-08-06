export const BookCard = ({ book }) => {
  return (
    <div
      onClick={() => {
        setSelectedBook(book);
      }}
    >
      {book.title}
    </div>
  );
};
