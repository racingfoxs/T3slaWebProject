import React, { useMemo } from "react";

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pages.push(i);
    }
    return pages;
  }, [totalProducts, productsPerPage]);

  return (
    <div className="container flex items-center lg:items-start flex-col flex-wrap justify-center p-6 mx-auto sm:py-2 lg:py-2 lg:flex-row lg:justify-center gap-10 ">
      <nav
        aria-label="Pagination"
        className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-100"
      >
        <ul className="pagination">
          {pageNumbers.map((number, index) => (
            <li
              key={index}
              className={`${
                currentPage === index + 1 ? " bg-violet-400" : null
              } inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700`}
            >
              <a onClick={(e) =>{ 
                e.preventDefault();
                paginate(number)}} href="#">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(Pagination);
