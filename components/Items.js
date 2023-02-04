import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts, setProducts } from "../store/productSlice";
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
  const { statusQuery, typeQuery, dateQuery } = useSelector(
    (state) => state.filterSlice
  );

  //Saving FilterData from Products
  // const [filterData, setFilterData] = useState([]);
  const [dataFilter, setDataFilter] = useState([])
  console.log("setDataFilter",dataFilter)


  //For new pagination
  const [page, setPage] = useState(1);
  const pageHandle = useCallback(
    (prev) => {
      if (prev > 0 && prev <= Math.round(products.length / 4) && prev !== page)
        setPage(prev);
    },
    [products, page, setPage]
  );

  useEffect(() => {
          dispatch(fetchProducts());
        }, [dispatch]);
  
  useEffect(() => {
    if (loading === "loaded" && !error) {
      setDataFilter([...products]);
      console.log("setDataFilter UseEffect",dataFilter)
    }
  }, [loading, error, products]);
  
  
  // console.log("Render")
  // useEffect(() => {
  //   if (loading === "ideal") {
  //     dispatch(fetchProducts());
  //   }
  //   if (loading === "loaded") {
  //     const dataFilter = products.filter(
  //       (product) =>
  //         product.status.includes(statusQuery) &&
  //         product.type.includes(typeQuery) &&
  //         formatDate(product.original_launch).includes(dateQuery)
  //     );
  //     setFilterData(dataFilter);
  //   }
  // }, [dispatch, products, statusQuery, typeQuery, dateQuery]);

  //OnChnage Select Tag
  const onChangeQuery = (type, event) => {
    switch (type) {
      case "status":
        dispatch(setStatusQuery(event.target.value));
        break;
      case "type":
        dispatch(setTypeQuery(event.target.value));
        break;
      case "date":
        dispatch(setDateQuery(event.target.value));
        break;
      default:
        break;
    }
  };

  //Reset button onClickHandler
  const onReset = (e) => {
    e.preventDefault();
    setDataFilter(products)
    dispatch(setStatusQuery(""));
    dispatch(setTypeQuery(""));
    dispatch(setDateQuery(""));
  };

  //Filter for Status
  const allStatus = useMemo(
    () => [
      ...products
        .reduce((map, obj) => map.set(obj.status, obj), new Map())
        .values()
    ],
    [products]
  );


  const onChangeQueryNew = (e) => {
    if(e.length>0){
    // dispatch(setTypeQuery(e));
    const typeFilters = products.filter(
      (product) =>
      product.type.includes(e)
      );
      setDataFilter(typeFilters) }
    };
    
  // Filter for Types
  const allTypes = [...products
        .reduce((map, obj) => map.set(obj.type, obj), new Map())
        .values()]

  
  // const allTypes = [...products
  //   .reduce((map, obj) => map.set(obj.type, obj), new Map())
  //   .values()];


  //Function to conver and get year only
  
const formatDate = useCallback((dateString) => {
  const options = { year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}, []);

  //Filter for Date
  const allDatesUnix = useMemo(
    () => [
      ...products
        .reduce(
          (map, obj) => map.set(formatDate(obj.original_launch), obj),
          new Map()
        )
        .values()
    ],
    [products, formatDate]
  );

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
                    value={dateQuery}
                    onChange={(event) => onChangeQuery("date", event)}
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
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  Status
                </label>
                <div>
                  <select
                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                    value={statusQuery}
                    onChange={(event) => onChangeQuery("status", event)}
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
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="type" className="text-sm">
                  Type
                </label>
                <div>
                  <select
                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                    value={typeQuery}
                    onChange={(e) => onChangeQueryNew(e.target.value)}
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
          {/* {loading === "loaded" && filterData.length === 0 ? (
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
          ) : null} */}
        </div>
        <div className="bg-gray-800 text-gray-100">
          <div className="container flex items-center lg:items-start flex-col flex-wrap justify-center mx-auto lg:flex-row lg:justify-center gap-10 ">
            {loading === "loaded" ? (
              dataFilter
                .slice(page * 4 - 4, page * 4)
                .map((nproducts, index) => {
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
          <nav
            aria-label="Pagination"
            className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-100"
          >
            {loading === "loaded" && Math.round(products.length / 4) > 4 ? (
              <>
                <button
                  aria-label="previous"
                  type="button"
                  className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-700"
                  onClick={() => pageHandle(page - 1)}
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
                </button>
                {[...Array(Math.round(products.length / 4))].map(
                  (_, index) => {
                    return (
                      <button
                        type="button"
                        aria-label={`page ${index + 1}`}
                        className={`${
                          page === index + 1 ? " bg-violet-400" : null
                        } inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700`}
                        key={index}
                        onClick={() => pageHandle(index + 1)}
                      >
                        {index + 1}
                      </button>
                    );
                  }
                )}
                <button
                  aria-label="next"
                  type="button"
                  className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-700"
                  onClick={() => pageHandle(page + 1)}
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
                </button>
              </>
            ) : null}
          </nav>
        </div>
      </section>
      {/* Modal Element */}
      {loading === "loaded" && modalProduct ? (
        <section className="relative">
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
