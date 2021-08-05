import React from "react"
import styles from "./header.module.css"
import typography from "./../../styles/typography.module.css"
import joinClassNames from "../../utilities/joinClassNames"
import Link from "next/link"
import cn from "classnames";

export function HeaderCrumb({label, href}) {
    return (
        <>
            <span className={cn(typography["t--epsilon"], styles.crumbSeparator)}>
                /
            </span>

            {href ? (
                <Link href={href}>
                    {label}
                </Link>
            ) : label}
        </>
    )
}

const Header = ({children}) => {

    return (
        <header className={joinClassNames(styles.root)}>
            <nav className={styles.nav}>
                    <span className={styles.logo}>
                        <Link href={"/"}>
                        <a className={joinClassNames(
                            typography["t--epsilon"],
                            styles.logoText
                        )}>
                            Petr Menš
                        </a>
                                </Link>

                        {children}
                    </span>

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
        </header>
    );
}

export default Header
