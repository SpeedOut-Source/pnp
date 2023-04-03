import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 | Biplob Sutradhar</title>
        <meta name="description" content="404 | Biplob Sutradhar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="errorSplash container mx-auto">
        <div>
          404 <span>|</span> This page is not found
        </div>
      </main>
    </>
  );
}
