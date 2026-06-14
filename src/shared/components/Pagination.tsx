interface Props {
  totalItems: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage?: number;
}

export function Pagination({ totalItems, page, setPage, itemsPerPage = 8 }: Props) {
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1;
  const isLastPage = page >= totalPages;

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className="m-4 md:m-10 flex flex-col md:flex-row justify-between items-center gap-3">
      <p className="text-xs font-medium">
        Mostrando{" "}
        <span className="font-bold">
          {startItem} - {endItem}
        </span>{" "}
        de <span className="font-bold"> {totalItems}</span> productos
      </p>

      <div className="flex gap-3">
        <button
          className="btn-paginated"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Anterior
        </button>

        <button
          className="btn-paginated"
          onClick={handleNextPage}
          disabled={isLastPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}