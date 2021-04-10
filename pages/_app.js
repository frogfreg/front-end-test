import "../styles/tailwind.css";
import { useEffect, useState } from "react";
import { TokenContext } from "../context/tokenContext.js";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Component {...pageProps} />
    </TokenContext.Provider>
  );
}

export default MyApp;
