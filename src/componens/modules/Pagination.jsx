import styles from "./pagination.module.css";

const Pagination = ({ page, setQuery, totalPages }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.wrapper}>
      <button
        onClick={() =>
          setQuery((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))
        }
        disabled={page === 1}
      >
        &lt; قبلی
      </button>
      <ul className={styles.numbers}>
        {pageNumbers?.map((number, index) => (
          <li
            key={index}
            className={`${number === page && styles.activePage} ${
              styles.number
            }`}
            onClick={() => setQuery((prev) => ({ ...prev, page: number }))}
          >
            {number}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setQuery((prev) => ({ ...prev, page: prev.page + 1 }))}
        disabled={page === totalPages}
      >
        بعدی &gt;
      </button>
    </div>
  );
};

export default Pagination;
