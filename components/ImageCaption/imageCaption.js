import styles from "./imageCaption.module.css";
import joinClassNames from "../../utilities/joinClassNames";
import typography from "../../styles/typography.module.css";
import cn from "classnames";

export default function ImageCaption({title, className, children}) {
    return (
        <div className={cn(styles.root, className)}>
            <p
                className={joinClassNames(
                    styles.paragraph,
                    styles.title,
                    typography["t--zeta"]
                )}
            >
                {title}
            </p>

            <p className={joinClassNames(styles.paragraph, styles.meta, typography["t--zeta"])}>
                {children}
            </p>
        </div>
    )
}