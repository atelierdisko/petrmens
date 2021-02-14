import React from "react"
import Link from "next/link"

const Footer =  () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href="/imprint">Imprint</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer