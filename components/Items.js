import React from "react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts } from "../store/productSlice";

const Items = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(selectProducts);
  let itemsPerPage = 4;
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemstotal, setItemstotal] = useState();
  const items = [...Array(itemstotal).keys()];
  const [capsule, setCapsule] = useState([]);
  const [query, setQuery] = useState("");
  const [tquery, setTquery] = useState("");
  const [dquery, setDquery] = useState("");

  const onSelect = (event) => {
    setQuery(event.target.value);
  };
  const onTypeSelect = (event) => {
    setTquery(event.target.value);
  };

  const onDateSelect = (event) => {
    setDquery(event.target.value);
  };
  const onReset = () => {
    setQuery("");
    setTquery("");
    setDquery("");
  };

  useEffect(() => {
    if (loading === "ideal") {
      dispatch(fetchProducts());
      console.log("checking if fetch");
    }
    console.log(loading);
    console.log(capsule);

    const endOffset = itemOffset + itemsPerPage;
    if (loading === "loaded") {
      const dataFilter = products.filter(
        (product) =>
          product.status.includes(query) &&
          product.type.includes(tquery) &&
          JSON.stringify(formatDate(product.original_launch)).includes(dquery)
      );
      console.log("Data Filter value", dataFilter);

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
    query,
    tquery,
    dquery,
  ]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const allStatus = [
    ...products
      .reduce((map, obj) => map.set(obj.status, obj), new Map())
      .values(),
  ];
  const allTypes = [
    ...products
      .reduce((map, obj) => map.set(obj.type, obj), new Map())
      .values(),
  ];
  const allDatesUnix = [
    ...products
      .reduce((map, obj) => map.set(obj.original_launch, obj), new Map())
      .values(),
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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
                      onChange={onDateSelect}
                    >
                      <option value="">All</option>
                      {loading === "loaded"
                        ? allDatesUnix.map((items, index) => {
                            return (
                              <option
                                key={index}
                                value={JSON.stringify(
                                  formatDate(items.original_launch)
                                )}
                              >
                                {formatDate(items.original_launch)}
                              </option>
                            );
                            // {new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(items.original_launch)}
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
                      onChange={onSelect}
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
                  className="px-4 py-2 border rounded-md dark:border-gray-100 hover:bg-green-800 hover:text-gray-200"
                >
                  Reset
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col flex-wrap justify-center p-6 mx-auto sm:py-12 lg:py-20 lg:flex-row lg:justify-center gap-10 ">
          {loading === "error" && error ? `Error: ${error}` : null}

          {loading === "loaded" ? (
            capsule.map((nproducts, index) => {
              return (
                <div
                  key={index}
                  className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50"
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

        <div className="flex justify-center items-center pb-32">
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="<"
            pageClassName="inline-flex items-center px-6 py-2 text-sm font-bold border dark:border-gray-700"
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
        </div>
      </section>
    </>
  );
};

export default Items;
