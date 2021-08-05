import axios from "axios";
import React, {useContext, useEffect} from "react";
import {getImage} from "../../utilities/data";
import Image from "../../components/Image/image";
import styles from "../../styles/piece.module.css";
import utilities from "../../styles/utilities.module.css"
import Meta from "../../components/meta";
import {AppContext} from "../_app";
import ImageCaption from "../../components/ImageCaption/imageCaption";
import cn from "classnames";
import {HeaderCrumb} from "../../components/Header/header";

export default function Piece({piece}) {
    const {setHeaderBackLink, setHeaderChildren} = useContext(AppContext);

    useEffect(() => {
        setHeaderBackLink(`/${piece.category.slug}`);
        setHeaderChildren(
            <>
                <HeaderCrumb href={`/${piece.category.slug}`} label={piece.category.list_title}/>
                <HeaderCrumb label={piece.title}/>
            </>
        )
    }, []);

    if (!piece) {
        return null;
    }

    const tags = piece.tags
        .map((tag) => {
            return tag.tag_id.title;
        })
        .join(", ");

    const {width, height} = piece.image;
    const format = width > height ? "landscape" : "portrait";

    return (
        <>
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

            <div className={cn(styles.root, utilities.offset)}>
                <div>
                    <Image
                        src={getImage(piece.image)}
                        alt={`${piece.title} – a piece by Petr Menš created in ${piece.year}.`}
                        className={cn(styles.image, styles[`is${format.capitalize()}`])}
                        progressiveLoading={true}
                        manipulations={{w: 1200}}
                    />

                    <ImageCaption title={`${piece.title} / ${piece.title_en}`}>
                        {piece.year}, {tags}, {piece.dimensions}
                    </ImageCaption>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps(
    {
        params
    }
) {
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

        if (!category) {
            return;
        }

        const path = `/${category.slug}/${piece.slug}`;

        paths.push(path);
    });

    return {
        paths: paths,
        fallback: true,
    };
}
