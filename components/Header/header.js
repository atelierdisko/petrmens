import React, {useContext} from "react"
import styles from "./header.module.css"
import typography from "./../../styles/typography.module.css"
import joinClassNames from "../../utilities/joinClassNames"
import Link from "next/link"
import ArrowLeft from "../Icon/arrowRight";
import {AppContext} from "../../pages/_app";

const Header = () => {
    const {headerBackLink} = useContext(AppContext)

    return (
        <header className={joinClassNames(styles.root)}>
            <nav className={styles.nav}>
                <Link href={"/"}>
                    <a className={joinClassNames(
                        typography["t--epsilon"],
                        styles.item
                    )}>
                        Petr Menš
                    </a>
                </Link>

                <Link href={"/info"}>
                    <a className={joinClassNames(
                        typography["t--epsilon"],
                        styles.item
                    )}>
                        Info
                    </a>
                </Link>
            </nav>

            {headerBackLink && (
                <nav className={styles.nav} style={{marginTop: "10px"}}>
                    <Link href={headerBackLink}>
                        <a className={joinClassNames(
                            typography["t--zeta"],
                            styles.item
                        )}>
                            <ArrowLeft style={{
                                marginRight: "4px"
                            }}/> back
                        </a>
                    </Link>
                </nav>
            )}

        </header>
    );
}

export default Header
