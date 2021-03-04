import axios from "axios";
import React, { Fragment, useContext, useEffect } from "react";
import { getImage } from "../../utilities/data";
import Image from "../../components/Image/image";
import utilities from "../../styles/utilities.module.css";
import joinClassNames from "../../utilities/joinClassNames";
import typography from "../../styles/typography.module.css";
import styles from "../../styles/piece.module.css";
import Meta from "../../components/meta";
import { AppContext } from "../_app";

export default function Piece({ piece }) {
  const { setHeaderBackLink } = useContext(AppContext);

  useEffect(() => {
    setHeaderBackLink(`/${piece.category.slug}`);
  }, []);

  if (!piece) {
    return null;
  }

  const tags = piece.tags
    .map((tag) => {
      return tag.tag_id.title;
    })
    .join(", ");

  return (
    <Fragment>
      <Meta
        title={piece.title}
        description={`${piece.title} – piece by Petr Menš created in ${piece.year}. ${tags} ${piece.dimensions}`}
        image={getImage(piece.image)}
      />

      <h1
        style={{
          display: "none",
        }}
      >
        Petr Mens –{" "}
        {`${piece.title} – piece by Petr Menš created in ${piece.year}. ${tags} ${piece.dimensions}`}
        Petr Menš –{" "}
        {`${piece.title} – piece by Petr Menš created in ${piece.year}. ${tags} ${piece.dimensions}`}
      </h1>

      <div
        className={joinClassNames(
          utilities.grid,
          utilities.offset,
          styles.root
        )}
      >
        <Image
          src={getImage(piece.image)}
          alt={`${piece.title} – a piece by Petr Menš created in ${piece.year}.`}
          className={styles.image}
          progressiveLoading={true}
          manipulations={{ w: 1200 }}
        />

        <div className={styles.meta}>
          <p
            className={joinClassNames(
              styles.metaItem,
              styles.metaItemTitle,
              typography["t--zeta"]
            )}
          >
            {piece.title} / {piece.title_en}
          </p>

          <p className={joinClassNames(styles.metaItem, typography["t--zeta"])}>
            {piece.year}, {tags}, {piece.dimensions}
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const {
    data: { data: piece },
  } = await axios.get(
    `https://cms.petrmens.art/petrmens/items/piece?filter[slug][eq]=${params.pieceSlug}&single=true&fields=*.*.*`
  );

  if (!piece) {
    console.log(params);
  }

  return {
    props: {
      piece,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const {
    data: { data: categories },
  } = await axios.get("https://cms.petrmens.art/petrmens/items/category");

  const {
    data: { data: pieces },
  } = await axios.get("https://cms.petrmens.art/petrmens/items/piece", {
    params: {
      limit: 500,
    },
  });

  const paths = [];

  pieces.forEach((piece) => {
    if (!piece.slug) {
      return;
    }

    const category = categories.find(
      (category) => category.id === piece.category
    );

    const path = `/${category.slug}/${piece.slug}`;

    paths.push(path);
  });

  return {
    paths: paths,
    fallback: true,
  };
}
