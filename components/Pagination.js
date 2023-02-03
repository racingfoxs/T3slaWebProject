import {
  fetchProducts,
  selectProducts,
  setProducts,
} from "@/store/productSlice";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(selectProducts);
  
  useEffect(() => {
    console.log("USE EFFECT ")
      dispatch(fetchProducts());
  }, []);

  const [page, setPage] = useState(1);

  const pageHandle = (prev) => {
    if (prev > 0 && prev <= Math.round(products.length / 4) && prev !== page)
      return setPage(prev);
  };

  return (
    
    <section>
      {products.length &&
        products.slice(page * 4 - 4, page * 4).map((items, index) => {
          return <h1 key={index}>{items.capsule_serial}</h1>;
        })}
      {products.length > 0 && (
        <>
          <button type="button"
            className="inline-flex items-center px-6 py-2 text-sm font-bold border rounded-l-md border-gray-700"
            onClick={() => pageHandle(page - 1)}
          >
            Prev
          </button>
          {[...Array(Math.round(products.length / 4))].map((_, index) => {
            return (
              <button
                className={`${
                  page === index + 1 ? " bg-violet-400" : null} inline-flex items-center px-4 py-2 text-sm font-bold border border-gray-700`}
                key={index}
                onClick={() => pageHandle(index + 1)}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            className="inline-flex items-center px-6 py-2 text-sm font-bold border rounded-r-md border-gray-700"
            onClick={() => pageHandle(page + 1)}
          >
            Next
          </button>
        </>
      )}
      </section>
    
  );
};

export default Pagination;
