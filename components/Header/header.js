import React from "react"
import styles from "./header.module.css"
import typography from "./../../styles/typography.module.css"
import joinClassNames from "../../utilities/joinClassNames"
import Link from "next/link"
import ArrowLeft from "../Icon/arrowRight";

const Header = ({backLink, text}) => {

    return (
        <header className={joinClassNames(styles.root)}>
            <nav className={styles.nav}>
                <Link href={"/"}>
                    <span className={styles.logo}>
                        <a className={joinClassNames(
                            typography["t--epsilon"],
                            styles.item
                        )}>
                            Petr Menš
                        </a>

                        <span>{text}</span>
                    </span>


                </Link>

                <div className={styles.navRight}>
                    {/* <Link href={"/through-time"}>
                        <a className={joinClassNames(
                            typography["t--epsilon"],
                            styles.item
                        )}>
                            Through time
                        </a>
                    </Link>*/}

                    <Link href={"/info"}>
                        <a className={joinClassNames(
                            typography["t--epsilon"],
                            styles.item
                        )}>
                            Info
                        </a>
                    </Link>
                </div>
            </nav>

            {backLink && (
                <nav className={styles["nav--secondary"]}>
                    <Link href={backLink}>
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
