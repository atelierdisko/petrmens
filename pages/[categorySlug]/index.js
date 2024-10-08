import React, {Fragment, useContext, useEffect} from "react";
import axios from "axios";
import {getImage} from "../../utilities/data";
import utilities from "../../styles/utilities.module.css";
import joinClassNames from "../../utilities/joinClassNames";
import typography from "../../styles/typography.module.css";
import styles from "../../styles/category.module.css";
import Link from "next/link";
import Image from "../../components/Image/image";
import Meta from "../../components/meta";
import {AppContext} from "../_app";
import {HeaderCrumb} from "../../components/Header/header";

const Piece = ({id, slug, title, englishTitle, image, year}) => (
    <div className={styles.piece} key={`piece-${id}`}>
        <Link href={slug}>
                <Image manipulations={{w: 400}} src={image} alt={title}/>
        </Link>

        <div className={styles.pieceMeta}>
            <Link href={slug}>
                    <p
                        className={joinClassNames(
                            typography["t--zeta"],
                            styles.pieceMetaItem,
                            styles.pieceMetaTitle
                        )}
                    >
                        {title} / {englishTitle}
                    </p>
            </Link>

            <p
                className={joinClassNames(typography["t--zeta"], styles.pieceMetaItem)}
            >
                {year}
            </p>
        </div>
    </div>
);

export default function Category({category}) {
    const {setHeaderBackLink, setHeaderChildren} = useContext(AppContext);

    useEffect(() => {
        setHeaderBackLink("/");
        setHeaderChildren(<HeaderCrumb label={category.list_title}/>)
    }, []);

    return (
        <>
            <Meta
                title={category.list_title}
                description={`${category.list_title}`}
            />

            <h1
                style={{
                    display: "none",
                }}
            >
                Petr Mens – {category.list_title}
                Petr Menš – {category.list_title}
            </h1>

            <div className={joinClassNames(styles.list, utilities.grid, utilities.offset)}>
                {category.pieces.map((item) => {
                    const isCollection = item.latestYear;

                    if (isCollection) {
                        return (
                            <Fragment key={`collection-${item.id}`}>
                                {/*<h2 className={joinClassNames(
                                    typography["t--epsilon"],
                                    styles.collectionTitle
                                )}>
                                    {item.title}
                                </h2>*/}

                                {item.pieces.map((piece) => (
                                    <Piece
                                        title={piece.title}
                                        slug={piece.slug}
                                        id={`piece-${piece.id}`}
                                        image={piece.image}
                                        englishTitle={piece.title_en}
                                        year={piece.year}
                                    />
                                ))}
                            </Fragment>
                        );
                    }

                    return (
                        <Piece
                            title={item.title}
                            slug={item.slug}
                            id={`piece-${item.id}`}
                            image={item.image}
                            englishTitle={item.title_en}
                            year={item.year}
                        />
                    );
                })}
            </div>
        </>
    );
}

export async function getStaticProps({params}) {
    // fetch all categories
    const {
        data: {data: categories},
    } = await axios.get("https://cms.petrmens.art/petrmens/items/category");

    // fetch all collections
    let {
        data: {data: collections},
    } = await axios.get("https://cms.petrmens.art/petrmens/items/series", {
        params: {
            fields: "*.*",
        },
    });

    // filter current category by slug
    const category = categories.find(
        (category) => category.slug === params.categorySlug
    );

    // fetch all pieces in current category
    let {
        data: {data: pieces},
    } = await axios.get(`https://cms.petrmens.art/petrmens/items/piece`, {
        params: {
            fields: "*.*",
            limit: 500,
            "filter[category][eq]=": category.id,
        },
    });

    // remove unneeded data
    pieces = pieces.map((piece) => {
        return {
            id: piece.id,
            title: piece.title,
            title_en: piece.title_en,
            slug: `/${category.slug}/${piece.slug}`,
            year: piece.year,
            image: getImage(piece.image),
        };
    });

    // pre sort pieces by creation year
    pieces.sort((a, b) => (a.year > b.year ? -1 : 1));

    // join piece date into collections
    collections.forEach((collection) => {
        collection.pieces = collection.pieces.map((collectionPiece) => {
            const match = pieces.find(
                (piece) => collectionPiece.piece_id === piece.id
            );

            if (!match && process.env !== "production") {
                /* console.warn(
                  `No match for piece ${collectionPiece.piece_id} of collection '${collection.title}'`
                );*/
            }

            return match;
        });

        // if all collection items belong to current category, calculate latest and average piece creation years
        if (collection.pieces.every((item) => item !== undefined)) {
            collection.latestYear = [...collection.pieces].sort((a, b) =>
                a.year > b.year ? -1 : 1
            )[0].year;

            collection.yearAverage =
                collection.pieces.reduce((a, {year}) => a + year, 0) /
                collection.pieces.length;

            collection.pieceIds = collection.pieces.map((piece) => piece.id);
        }
    });

    // filter out collections with pieces not in current category
    collections = collections.filter(
        (collection) => collection.latestYear !== undefined
    );

    let collectionPieceIds = collections.map((collection) => {
        return collection.pieces.map((collectionPiece) => collectionPiece.id);
    });

    collectionPieceIds = [].concat(...collectionPieceIds);

    let data = [];

    pieces.forEach((piece) => {
        // if piece is part of a collection
        if (collectionPieceIds.includes(piece.id)) {
            const collection = collections.find((collection) => {
                return collection.pieceIds.includes(piece.id);
            });

            if (!data.includes(collection)) {
                data.push(collection);
            }
        } else {
            data.push(piece);
        }
    });

    return {
        props: {
            category: {
                list_title: category.list_title,
                title: category.title,
                slug: category.slug,
                pieces: data,
            },
        },
        revalidate: 10,
    };
}

export async function getStaticPaths() {
    const {
        data: {data: categories},
    } = await axios.get("https://cms.petrmens.art/petrmens/items/category");

    return {
        paths: categories.map((category) => `/${category.slug}`),
        fallback: false,
    };
}
