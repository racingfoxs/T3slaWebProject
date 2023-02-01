import React from "react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts } from "../store/productSlice";
import {
  setStatusQuery,
  setTypeQuery,
  setDateQuery,
} from "../store/filterSlice";
import ProductsModal from "./ProductsModal";

const Items = () => {
  const dispatch = useDispatch();

  //Getting data from Redux store
  const { products, loading, error } = useSelector(selectProducts);
  const statusQuery = useSelector((state) => state.filterSlice.statusQuery);
  const typeQuery = useSelector((state) => state.filterSlice.typeQuery);
  const dateQuery = useSelector((state) => state.filterSlice.dateQuery);

  //For Pagination
  let itemsPerPage = 4;
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemstotal, setItemstotal] = useState();
  const items = [...Array(itemstotal).keys()];

  //Storing Filter Data to display only 4 items
  const [capsule, setCapsule] = useState([]);

  useEffect(() => {
    if (loading === "ideal") {
      dispatch(fetchProducts());
    }

    const endOffset = itemOffset + itemsPerPage;
    if (loading === "loaded") {
      const dataFilter = products
        .slice()
        .sort((a, b) => (a.status > b.status ? -1 : 1))
        .reverse()
        .filter(
          (product) =>
            product.status.includes(statusQuery) &&
            product.type.includes(typeQuery) &&
            formatDate(product.original_launch).includes(dateQuery)
        );

      setCapsule(dataFilter.slice(itemOffset, endOffset));
      setItemstotal(dataFilter.length);
    }

    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [
    dispatch,
    loading,
    itemstotal,
    itemOffset,
    itemsPerPage,
    statusQuery,
    typeQuery,
    dateQuery,
  ]);

  //Status select onChangeHandler
  const onStatusSelect = (event) => {
    dispatch(setStatusQuery(event.target.value));
  };

  //Type select onChangeHandler
  const onTypeSelect = (event) => {
    dispatch(setTypeQuery(event.target.value));
  };

  //Date select onChangeHandler
  const onDateSelect = (event) => {
    dispatch(setDateQuery(event.target.value));
  };

  //Reset button onClickHandler
  const onReset = (e) => {
    e.preventDefault();
    dispatch(setStatusQuery(""));
    dispatch(setTypeQuery(""));
    dispatch(setDateQuery(""));
  };

  //Array Offset to show how many items should be display
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  //Filter for Status
  const allStatus = [
    ...products
      .reduce((map, obj) => map.set(obj.status, obj), new Map())
      .values(),
  ];

  //Filter for Types
  const allTypes = [
    ...products
      .reduce((map, obj) => map.set(obj.type, obj), new Map())
      .values(),
  ];

  //Function to conver and get year only
  const formatDate = (dateString) => {
    const options = { year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //Filter for Date
  const allDatesUnix = [
    ...products
      .reduce(
        (map, obj) => map.set(formatDate(obj.original_launch), obj),
        new Map()
      )
      .values(),
  ];

  //To Captilized the first letter of array
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  //modal code start here by raj
  const [singleCapsule, setSingleCapsule] = useState([]);
  const [modalProduct, setModalProduct] = useState(false);

  const modalProductClick = (e, nproducts) => {
    e.preventDefault();
    setSingleCapsule(nproducts);
    setModalProduct(true);
  };
  //modal code end here by raj

  return (
    <>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
        <form
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
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
                <div className="raj">
                  <div>
                    <select
                      className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                      value={dateQuery}
                      onChange={onDateSelect}
                    >
                      <option value="">All</option>
                      {loading === "loaded"
                        ? allDatesUnix.map((items, index) => {
                            return (
                              <option
                                key={index}
                                value={formatDate(items.original_launch)}
                              >
                                {formatDate(items.original_launch)}
                              </option>
                            );
                          })
                        : "Loading"}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  Status
                </label>
                <div className="raj">
                  <div>
                    <select
                      className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                      value={statusQuery}
                      onChange={onStatusSelect}
                    >
                      <option value="">All</option>
                      {loading === "loaded"
                        ? allStatus.map((items, index) => {
                            return (
                              <option key={index} value={items.status}>
                                {capitalizeWords(items.status)}
                              </option>
                            );
                          })
                        : "Loading"}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Type
                </label>
                <div className="raj">
                  <div>
                    <select
                      className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                      value={typeQuery}
                      onChange={onTypeSelect}
                    >
                      <option value="">All</option>
                      {loading === "loaded"
                        ? allTypes.map((items, index) => {
                            return (
                              <option key={index} value={items.type}>
                                {items.type}
                              </option>
                            );
                          })
                        : "Loading..."}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 flex justify-start items-end">
                <button
                  type="button"
                  onClick={onReset}
                  className="px-4 py-2 border rounded-md dark:border-gray-100 hover:bg-violet-400 hover:text-gray-50"
                >
                  Reset All
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col flex-wrap justify-center p-6 mx-auto sm:py-12 lg:py-20 lg:flex-row lg:justify-center gap-10 ">
          {loading === "error" && error ? `Error: ${error}` : null}
          {loading === "loaded" && capsule.length === 0 ? (
            <div className="flex items-center h-full sm:p-16 dark:bg-gray-900 dark:text-gray-100">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-40 h-40 dark:text-gray-600"
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
          {loading === "loaded" ? (
            capsule.map((nproducts, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => modalProductClick(e, nproducts)}
                  className=" max-w-xs p-6 rounded-md hover:cursor-pointer shadow-md dark:bg-gray-900 dark:text-gray-50 hover:scale-105 transition-all ease-in-out"
                >
                  <img
                    src="https://dummyimage.com/400x400"
                    alt=""
                    className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                  />
                  <div className="mt-6 mb-2">
                    <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-400">
                      {nproducts.type}
                    </span>
                    <h2 className="text-xl font-semibold tracking-wide">
                      {nproducts.missions.length > 0
                        ? nproducts.missions.map((d, i) => {
                            return (
                              <span key={i}>
                                {d.name}
                                {i < nproducts.missions.length - 1 ? ", " : ""}
                              </span>
                            );
                          })
                        : "To Be Announced"}
                    </h2>
                  </div>
                  <p className="dark:text-gray-100">
                    {products &&
                    nproducts.details &&
                    nproducts.details.length > 0
                      ? nproducts.details
                      : "Details Coming soon..."}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
              <div className="h-60 rounded-t dark:bg-gray-700"></div>
              <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                <div className="w-full h-6 rounded dark:bg-gray-700"></div>
                <div className="w-full h-6 rounded dark:bg-gray-700"></div>
              </div>
            </div>
          )}
        </div>
        {/* pagination part start */}
        <div className="flex justify-center items-center py-12">
          {loading === "loaded" && itemstotal > 4 ? (
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="<"
              pageClassName="inline-flex items-center px-4 py-2 text-sm font-bold border dark:border-gray-700"
              pageLinkClassName=""
              previousClassName="inline-flex items-center px-6 py-2 text-sm font-bold border rounded-l-md dark:border-gray-700"
              previousLinkClassName=""
              nextClassName="inline-flex items-center px-6 py-2 text-sm font-bold border rounded-r-md dark:border-gray-700"
              nextLinkClassName=""
              breakLabel="..."
              breakClassName=""
              breakLinkClassName=""
              containerClassName=""
              activeClassName="inline-flex items-center px-4 py-2 text-sm font-semibold border dark:bg-violet-400 dark:text-gray-900 dark:border-gray-700"
              renderOnZeroPageCount={null}
            />
          ) : null}
        </div>
      </section>

      <section className="relative">
        {loading === "loaded" && modalProduct ? (
          <ProductsModal
            setModalProduct={setModalProduct}
            singleCapsule={singleCapsule}
          />
        ) : null}
      </section>
    </>
  );
};

export default Items;
