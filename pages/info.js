import React, { Fragment, useState } from "react";
import Meta from "../components/meta";
import joinClassNames from "../utilities/joinClassNames";
import Link from "next/link";
import Image from "../components/Image/image";
import axios from "axios";
import { getImage } from "../utilities/data";
import styles from "../styles/info.module.css";
import typography from "../styles/typography.module.css";
import Toggle from "../components/Accordion/toggle";
import utilities from "../styles/utilities.module.css";

const PieceListItem = ({ piece, setPreviewPiece, key, ...rest }) => {
  return (
    <li className={styles.item} {...rest}>
      <Link href={piece.slug}>
        <a
          className={joinClassNames(typography["t--zeta"], styles.itemTitle)}
          onMouseLeave={() => setPreviewPiece(null)}
          onMouseEnter={() => setPreviewPiece(piece)}
        >
          {piece.title}
        </a>
      </Link>
    </li>
  );
};

const AccordionItem = ({ category, setPreviewPiece, ...rest }) => {
  const [dropped, setDropped] = useState(false);

  return (
    <li className={styles.accordionItem} {...rest}>
      <div
        className={styles.accordionItemHeader}
        onClick={() => setDropped(!dropped)}
      >
        <h3
          className={joinClassNames(
            typography["t--delta"],
            styles.accordionItemHeaderTitle
          )}
        >
          {category.list_title}
        </h3>

        <Toggle dropped={dropped} />
      </div>

      <div
        className={joinClassNames(
          styles.accordionItemContent,
          dropped ? styles["accordionItemContent--dropped"] : null
        )}
      >
        <ul className={joinClassNames(typography["t--zeta"], styles.yearList)}>
          {Object.keys(category.pieces).map((year, index) => {
            return (
              <li
                className={styles.yearListItem}
                key={`year-list-item-${index}`}
              >
                <span
                  className={joinClassNames(
                    typography["t--zeta"],
                    styles.yearListItemYear
                  )}
                >
                  {year}
                </span>

                <ul>
                  {Object.values(category.pieces[year]).map((piece, index) => (
                    <PieceListItem
                      setPreviewPiece={setPreviewPiece}
                      piece={piece}
                      key={`piece-list-item-${index}`}
                    />
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default function Info({ categories }) {
  const [previewPiece, setPreviewPiece] = useState(null);

  return (
    <Fragment>
      <Meta title={"Info"} />

      <div className={joinClassNames(
          utilities.grid,
          utilities.offset
      )}>
      </div>

      <div className={joinClassNames(utilities.grid)}>
        <div className={styles.bioGrid}>
          <div>
            <p className={joinClassNames(typography["t--iota"])}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <br />

            <a
              href="mailto:p.mens@seznam.cz"
              className={joinClassNames(typography["t--iota"])}
            >
              E-Mail: p.mens@seznam.cz
            </a>
          </div>
        </div>

        <div className={styles.indexGrid}>
          <h2
            className={joinClassNames(
              typography["t--theta"],
              styles.indexTitle
            )}
          >
            Index
          </h2>

          <ul className={styles.accordion}>
            {categories.map((category, index) => (
              <AccordionItem
                setPreviewPiece={setPreviewPiece}
                category={category}
                key={`accordion-item-${index}`}
              />
            ))}
          </ul>
        </div>
      </div>

      {previewPiece && (
        <Fragment>
          <Image
            src={previewPiece.image}
            alt={previewPiece.title}
            manipulations={{ w: 400 }}
            className={styles.previewPiece}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

export async function getStaticProps() {
  const {
    data: { data: categories },
  } = await axios.get("https://cms.petrmens.art/petrmens/items/category", {
    params: {
      fields: "*.*.*",
    },
  });

  const {
    data: { data: pieces },
  } = await axios.get("https://cms.petrmens.art/petrmens/items/piece", {
    params: {
      fields: "*.*",
      limit: 500,
    },
  });

  return {
    props: {
      categories: [...categories].map((category) => {
        return {
          list_title: category.list_title,
          pieces: pieces
            .filter((piece) => piece.category.title === category.title)
            .map((piece) => {
              return {
                title: piece.title,
                title_en: piece.title_en,
                slug: `/${category.slug}/${piece.slug}`,
                year: piece.year,
                image: getImage(piece.image),
              };
            })
            .reduce((rv, x) => {
              (rv[x["year"]] = rv[x["year"]] || []).push(x);

              return rv;
            }, {}),
        };
      }),
    },
    revalidate: 10,
  };
}
