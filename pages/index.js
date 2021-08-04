import React, { useState, useContext, useEffect, Fragment } from "react";
import axios from "axios";
import styles from "./../styles/index.module.css";
import joinClassNames from "../utilities/joinClassNames";
import typography from "../styles/typography.module.css";
import Image from "../components/Image/image";
import Link from "next/link";
import { getImage } from "../utilities/data";
import { AppContext } from "./_app";
import Meta from "../components/meta";

export default function Home({ categories }) {
  const [previewCategory, setPreviewCategory] = useState(null);
  const { intro, setIntro, setHeaderBackLink } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      setIntro(false);
    }, 5000);

    setHeaderBackLink(null);
  }, []);

  return (
    <Fragment>
      <Meta title={"Home"}/>

      <h1
        style={{
          display: "none",
        }}
      >
        Petr Mens – Home Petr Menš – Home
      </h1>

      <div
        className={styles.introRoot}
        style={{
          display: intro !== false ? "block" : "none",
        }}
      >
        <div className={styles.intro}>
          <h2
            className={joinClassNames(
              styles.introTitle,
              typography["t--alpha"]
            )}
          >
            <span className={styles.introTitleWord}>Petr</span>{" "}
            <span className={styles.introTitleWord}>Menš</span>
          </h2>
        </div>
      </div>

      <div className={styles.categoriesRoot}>
        <div className={styles.categoriesWrapper}>
          {categories.map((category, index) => {
            return (
              <Fragment key={`category-${index}`}>
                <Link href={category.slug}>
                  <a
                    className={joinClassNames(
                      styles.categoryItem,
                      typography["t--alpha"]
                    )}
                  >
                    <span
                      className={styles.categoryTitle}
                      onMouseEnter={() => setPreviewCategory(category)}
                      onMouseLeave={() => setPreviewCategory(null)}
                    >
                      {category.list_title}
                    </span>

                    <Image
                      onMouseLeave={() => setPreviewCategory(null)}
                      className={joinClassNames(
                        styles.categoryPreview,
                        previewCategory === category
                          ? styles.categoryPreviewActive
                          : null
                      )}
                      manipulations={{
                        w: 800,
                      }}
                      progressiveLoading={false}
                      src={category.featuredPiece.image}
                      alt={category.featuredPiece.title}
                    />
                  </a>
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
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

  return {
    props: {
      categories: categories.map((category) => {
        return {
          list_title: category.list_title,
          slug: category.slug,
          featuredPiece: {
            title: category.featured_piece.title,
            title_en: category.featured_piece.title_en,
            year: category.featured_piece.year,
            image: getImage(category.featured_piece.image),
          },
        };
      }),
    },
    revalidate: 10,
  };
}
