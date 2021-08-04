import styles from "./quote.module.css"
import typography from "../../styles/typography.module.css";
import cn from "classnames";

export default function Quote({text, source, className}) {
    return (
        <div className={cn(styles.root, className)}>
            <blockquote className={cn(typography["t--delta"])}>
                »{text}«
            </blockquote>

            <span className={cn(typography["t--epsilon"], styles.source)}>
               {source}
            </span>
        </div>
    )
}