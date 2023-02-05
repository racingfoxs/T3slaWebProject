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
        <ul className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-100">
          
          {currentPage>1 && <li  className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-700">
            <a
            aria-label="Previous"
              onClick={(e) => {
                e.preventDefault();
                paginate(currentPage - 1);
              }}
              href="#"
            >
             <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
            </a>
          </li>}
          {pageNumbers.map((number, index) => (
            <li
              key={index}
              className={`${
                currentPage === index + 1 ? " bg-violet-400" : null
              } inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700`}
            >
              <a
              aria-label={number}
                onClick={(e) => {
                  e.preventDefault();
                  paginate(number);
                }}
                href="#"
              >
                {number}
              </a>
            </li>
          ))}
          {currentPage<pageNumbers.length && <li className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-700"
                 >
            <a
            aria-label="Next"
              onClick={(e) => {
                e.preventDefault();
                
                paginate(currentPage + 1);
              }}
              href="#"
            >
               <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
            </a>
          </li>}
        </ul>
      </nav>
    </div>
  );
};

export default React.memo(Pagination);
