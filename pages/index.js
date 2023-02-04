import Filters from "@/components/Filters";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import Homes from "@/components/Homes";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TeslaCapsule Co.</title>
        <meta name="description" content="TeslaCapsule Co" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Filters/>
      {/* <Homes /> */}
      <Footer />
    </>
  );
}
