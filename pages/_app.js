import React from 'react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <Component {...pageProps} />
    </>
  );
}
