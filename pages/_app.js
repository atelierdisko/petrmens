import "../styles/normalizations.css";
import "../styles/variables.css";
import "../styles/typography.module.css";
import { createContext, useState } from "react";
import Header from "../components/Header/header";
import usePersistentState from "../hooks/usePersistentState";

export const AppContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const [intro, setIntro] = usePersistentState("intro", true, "session");
  const [headerBackLink, setHeaderBackLink] = useState(null);

  return (
    <AppContext.Provider
      value={{
        intro,
        setIntro,
        headerBackLink,
        setHeaderBackLink,
      }}
    >
      <Header />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
};

export default MyApp;
