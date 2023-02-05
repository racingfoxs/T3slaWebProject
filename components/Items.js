import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts } from "../store/productSlice";
import Pagination from "./Pagination";
import ProductsModal from "./ProductsModal";
import {
  setStatusFilter,
  setTypeFilter,
  setDateFilter,
} from "../store/filterSlice";

const Items = () => {
  const dispatch = useDispatch();

  // Getting data from Redux store
  const { products, loading, error } = useSelector(selectProducts);
  const { statusFilter, typeFilter, dateFilter } = useSelector(
    (state) => state.filterSlice
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  const filteredProducts = products.filter(
    (product) =>
      product.status.toLowerCase().includes(statusFilter.toLowerCase()) &&
      product.type.toLowerCase().includes(typeFilter.toLowerCase()) &&
      (dateFilter === "" ||
        new Date(product.original_launch)
          .getFullYear()
          .toString()
          .includes(dateFilter))
  );

  //Getting Dynamic Select Optioins
  const optionStatus = [...new Set(products.map((product) => product.status))];
  const optionTypes = [...new Set(products.map((product) => product.type))];

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Reset Button
  const onReset = (e) => {
    e.preventDefault();
    dispatch(setStatusFilter(""));
    dispatch(setTypeFilter(""));
    dispatch(setDateFilter(""));
  };

  //modal code start here by raj
  const [singleCapsule, setSingleCapsule] = useState([]);
  const [modalProduct, setModalProduct] = useState(false);

  const modalProductClick = useCallback(
    (e, nproducts) => {
      e.preventDefault();
      setSingleCapsule(nproducts);
      setModalProduct(true);
    },
    [setSingleCapsule, setModalProduct]
  );

  return (
    <>
      <section className="p-6 pt-10 pb-10 md:pt-5 lg:pt-5 bg-gray-800 text-gray-50">
        <form
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Search Form</p>
              <p className="text-xs">
                Filter your imagination to get your desiered result.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstname" className="text-sm">
                  Original launch
                </label>
                <div>
                  <select
                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                    value={dateFilter}
                    onChange={(e) => {
                      setCurrentPage(1);
                      dispatch(setDateFilter(e.target.value));
                    }}
                  >
                    <option value="">All</option>
                    {Array.from(
                      new Set(
                        products.map((product) =>
                          new Date(product.original_launch).getFullYear()
                        )
                      )
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  Status
                </label>
                <div>
                  <select
                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                    value={statusFilter}
                    onChange={(e) => {
                      setCurrentPage(1);
                      dispatch(setStatusFilter(e.target.value));
                    }}
                  >
                    <option value="">All</option>
                    {optionStatus.map((option) => (
                      <option key={option} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="type" className="text-sm">
                  Type
                </label>
                <div>
                  <select
                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                    value={typeFilter}
                    onChange={(e) => {
                      setCurrentPage(1);
                      dispatch(setTypeFilter(e.target.value));
                    }}
                  >
                    <option value="">All</option>
                    {optionTypes.map((option) => (
                      <option key={option} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 flex justify-start items-end">
                <button
                  type="button"
                  onClick={onReset}
                  className="px-4 py-2 border rounded-md border-gray-100 hover:bg-violet-400 hover:text-gray-50"
                >
                  Reset All
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="bg-gray-800 text-gray-100">
        <div className="container flex items-center lg:items-start flex-col flex-wrap justify-center p-6 mx-auto lg:flex-row lg:justify-center gap-10 ">
          {loading === "error" && error ? `Error: ${error}` : null}
          {loading === "loaded" && filteredProducts.length <= 0 ? (
            <div className="flex items-center h-full sm:p-16 bg-gray-900 text-gray-100">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-40 h-40 text-gray-600"
                >
                  <path
                    fill="currentColor"
                    d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
                  ></path>
                  <rect
                    width="176"
                    height="32"
                    x="168"
                    y="320"
                    fill="currentColor"
                  ></rect>
                  <polygon
                    fill="currentColor"
                    points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
                  ></polygon>
                  <polygon
                    fill="currentColor"
                    points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
                  ></polygon>
                </svg>
                <p className="text-3xl">Sorry ! No Result Found</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="bg-gray-800 text-gray-100">
          <div className="container flex items-center lg:items-start flex-col flex-wrap justify-center mx-auto lg:flex-row lg:justify-center gap-10 ">
            {loading === "loaded" ? (
              currentProducts.map((nproducts, index) => {
                return (
                  <div
                    key={index}
                    className=" max-w-xs p-6 rounded-md shadow-md bg-gray-900 text-gray-50 hover:scale-105 transition-all ease-in-out"
                  >
                    <span className="block pb-4 text-xs font-medium tracking-widest uppercase text-violet-400">
                      {nproducts.type}
                    </span>
                    <img
                      src="./capsuleitem.webp"
                      alt="Capsule Image"
                      className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
                    />
                    <div className="mt-6 mb-2">
                      <h2 className="text-xl font-semibold tracking-wide">
                        {nproducts.missions.length > 0
                          ? nproducts.missions.map((d, i) => {
                              return (
                                <span key={i}>
                                  {d.name.slice(0, 24)}
                                  {i < nproducts.missions.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              );
                            })
                          : "To Be Announced"}
                      </h2>
                    </div>
                    <p className="text-gray-100">
                      {products &&
                      nproducts.details &&
                      nproducts.details.length > 0
                        ? nproducts.details.slice(0, 33) + "..."
                        : "Details Coming soon..."}
                    </p>
                    <div className="flex justify-center item-center">
                      <button
                        onClick={(e) => modalProductClick(e, nproducts)}
                        type="button"
                        className="hover:scale-105 hover:border border border-gray-900 hover:bg-gray-900 hover:text-gray-100 hover:border-gray-100 transition-all ease-in-out mt-5 px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
                <div className="h-60 rounded-t bg-gray-700"></div>
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-900">
                  <div className="w-full h-6 rounded bg-gray-700"></div>
                  <div className="w-full h-6 rounded bg-gray-700"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* New Pagination */}

        <div className="container flex items-center lg:items-start flex-col flex-wrap justify-center p-6 mx-auto sm:py-12 lg:py-20 lg:flex-row lg:justify-center gap-10 ">
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </section>
      {/* Modal Element */}
      {loading === "loaded" && modalProduct ? (
        <section>
          <ProductsModal
            setModalProduct={setModalProduct}
            singleCapsule={singleCapsule}
          />
        </section>
      ) : null}
    </>
  );
};

export default React.memo(Items);
