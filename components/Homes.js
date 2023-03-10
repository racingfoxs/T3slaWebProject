import Image from "next/image";
import Link from "next/link";
import React from "react";
import Items from "./Items";

const Homes = () => {
  return (
    <>
      <section className=" bg-gray-800 text-gray-100">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl">
              TAKING <span className="text-violet-400">HUMANS</span> TO
              SPACE
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              In 2020, SpaceX returned America’s ability to fly NASA astronauts
              to and from the International Space Station on American vehicles
              for the first time since 2011.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link
                rel="noopener noreferrer"
                href="#"
                className="hover:scale-105 hover:border border hover:bg-gray-800 hover:text-gray-100 hover:border-gray-100 transition-all ease-in-out px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900"
              >
                Learn More
              </Link>
              <Link
                rel="noopener noreferrer"
                href="#"
                className="hover:scale-105 hover:border hover:bg-violet-400 hover:text-gray-100 hover:border-gray-100 transition-all ease-in-out px-8 py-3 text-lg font-semibold rounded  text-gray-100 border "
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center lg:flex-grow justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <Image src="/capsuleMain.webp" priority={true} alt="Capsule Hero Image" width="500" height="540"/>
          </div>
        </div>
      </section>
      <Items />
    </>
  );
};

export default Homes;
