import React, { Fragment, useContext, useEffect } from "react";
import axios from "axios";
import { getImage } from "../../utilities/data";
import utilities from "../../styles/utilities.module.css";
import joinClassNames from "../../utilities/joinClassNames";
import typography from "../../styles/typography.module.css";
import styles from "../../styles/category.module.css";
import Link from "next/link";
import Image from "../../components/Image/image";
import Meta from "../../components/meta";
import { AppContext } from "../_app";

export default function Category({ category }) {
  const { setHeaderBackLink } = useContext(AppContext);

  useEffect(() => {
    setHeaderBackLink("/");
  }, []);

  return (
    <Fragment>
      <Meta title={category.list_title} description={`${category.list_title}`}/>

      <div className={joinClassNames(utilities.grid, utilities.offset)}>
        <h1 className={joinClassNames(typography["t--delta"], styles.title)}>
          {category.list_title}
        </h1>
      </div>

      <div className={joinClassNames(styles.list, utilities.grid)}>
        {category.pieces.map((piece) => {
          return (
            <div className={styles.piece}>
              <a href={"#"}>
                <Link href={piece.slug}>
                  <Image
                    manipulations={{ w: 400 }}
                    src={piece.image}
                    alt={piece.title}
                  />
                </Link>

                <div className={styles.pieceMeta}>
                  <Link href={piece.slug}>
                    <Fragment>
                      <p
                        className={joinClassNames(
                          typography["t--zeta"],
                          styles.pieceMetaItem
                        )}
                      >
                        {piece.title} / {piece.title_en}
                      </p>

                      <p
                        className={joinClassNames(
                          typography["t--zeta"],
                          styles.pieceMetaItem
                        )}
                      >
                        {piece.year}
                      </p>
                    </Fragment>
                  </Link>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const {
    data: { data: categories },
  } = await axios.get("https://cms.petrmens.art/petrmens/items/category");

  const {
    data: { data: pieces },
  } = await axios.get("https://cms.petrmens.art/petrmens/items/piece", {
    params: {
      fields: "*.*.*",
      limit: 500,
    },
  });

  const category = categories.find(
    (category) => category.slug === params.categorySlug
  );
  category.pieces = pieces.filter(
    (piece) => piece.category.title === category.title
  );

  return {
    props: {
      category: {
        list_title: category.list_title,
        title: category.title,
        pieces: category.pieces
          .map((piece) => {
            return {
              title: piece.title,
              title_en: piece.title_en,
              slug: `/${category.slug}/${piece.slug}`,
              year: piece.year,
              image: getImage(piece.image),
              dimensions: piece.dimensions,
              craft: piece.craft ? piece.craft : null,
            };
          })
          .sort((a, b) => b.year - a.year),
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const {
    data: { data: categories },
  } = await axios.get("https://cms.petrmens.art/petrmens/items/category");

  return {
    paths: categories.map((category) => `/${category.slug}`),
    fallback: false,
  };
}
