import "../styles/normalizations.css";
import "../styles/variables.css";
import "../styles/typography.module.css";
import {createContext, useEffect, useState} from "react";
import Header from "../components/Header/header";
import usePersistentState from "../hooks/usePersistentState";
import {useRouter} from "next/router";

export const AppContext = createContext({});

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

const MyApp = ({Component, pageProps}) => {
    const {pathname} = useRouter();
    const [intro, setIntro] = usePersistentState("intro", true, "session");
    const [headerBackLink, setHeaderBackLink] = useState(false);
    const [headerText, setHeaderText] = useState(null);

    useEffect(() => {
        if (pathname !== "/info") {
            setHeaderText(null);
        }

    }, [pathname]);

    return (
        <AppContext.Provider
            value={{
                intro,
                setIntro,
                setHeaderBackLink,
                setHeaderText
            }}
        >
            <Header backLink={headerBackLink} text={headerText}/>
            <Component {...pageProps} />
        </AppContext.Provider>
    );
};

export default MyApp;
