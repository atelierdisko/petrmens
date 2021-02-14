import axios from "axios";
import React, {Fragment, useContext, useEffect} from "react";
import {getImage} from "../../utilities/data";
import Image from "../../components/Image/image";
import utilities from "../../styles/utilities.module.css";
import joinClassNames from "../../utilities/joinClassNames";
import typography from "../../styles/typography.module.css";
import styles from "../../styles/piece.module.css";
import Meta from "../../components/meta";
import {AppContext} from "../_app";

export default function Piece({piece}) {
    const {setHeaderBackLink} = useContext(AppContext);

    useEffect(() => {
        setHeaderBackLink(`/${piece.category.slug}`)
    }, [])

    const tags = piece.tags
        .map((tag) => {
            return tag.tag_id.title;
        })
        .join();

    return (
        <Fragment>
            <Meta
                title={piece.title}
                description={`${piece.title}. A piece by Petr Menš created in ${piece.year}. ${tags} ${piece.dimensions}`}
                image={getImage(piece.image)}
            />

            <div
                className={joinClassNames(utilities.grid, styles.root)}
                style={{
                    marginTop: `26px`,
                }}
            >
                <Image
                    src={getImage(piece.image)}
                    alt={piece.title}
                    className={styles.image}
                    progressiveLoading={true}
                    manipulations={{w: 1200}}
                />

                <div className={styles.meta}>
                    <p className={joinClassNames(styles.metaItem, typography["t--zeta"])}>
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

export async function getStaticProps({params}) {
    const {
        data: {data: piece},
    } = await axios.get(
        `https://cms.petrmens.art/petrmens/items/piece?filter[slug][eq]=${params.pieceSlug}&single=true&fields=*.*.*`
    );

    return {
        props: {
            piece,
        },
        revalidate: 10,
    };
}

export async function getStaticPaths() {
    const {
        data: {data: categories},
    } = await axios.get("https://cms.petrmens.art/petrmens/items/category");
    const {
        data: {data: pieces},
    } = await axios.get("https://cms.petrmens.art/petrmens/items/piece?fields");

    categories.forEach((category) => {
        category.pieces = pieces.filter((piece) => piece.category === category.id);
    });

    const paths = [];

    categories.forEach((category) => {
        category.pieces.forEach((piece) => {
            paths.push(`/${category.slug}/${piece.slug}`);
        });
    });

    return {
        paths: paths,
        fallback: false,
    };
}
