import React, {useContext, useEffect, useState} from "react";
import Meta from "../components/meta";
import Link from "next/link";
import Image from "../components/Image/image";
import axios from "axios";
import {getImage} from "../utilities/data";
import styles from "../styles/info.module.css";
import typography from "../styles/typography.module.css";
import Toggle from "../components/Accordion/toggle";
import utilities from "../styles/utilities.module.css";
import cn from "classnames";
import {AppContext} from "./_app";

const PieceListItem = ({piece, setPreviewPiece, key, ...rest}) => {
    return (
        <li className={styles.item} {...rest}>
            <Link href={piece.slug}>
                <a
                    className={cn(typography["t--theta"], styles.itemTitle)}
                    onMouseLeave={() => setPreviewPiece(null)}
                    onMouseEnter={() => setPreviewPiece(piece)}
                >
                    {piece.title} / {piece.title_en}
                </a>
            </Link>
        </li>
    );
};

const AccordionItem = ({category, setPreviewPiece, ...rest}) => {
    const [dropped, setDropped] = useState(false);

    return (
        <li className={styles.accordionItem} {...rest}>
            <div
                className={styles.accordionItemHeader}
                onClick={() => setDropped(!dropped)}
            >
                <h3
                    className={cn(
                        typography["t--delta"],
                        styles.accordionItemHeaderTitle
                    )}
                >
                    {category.list_title}
                </h3>

                <Toggle dropped={dropped}/>
            </div>

            <div
                className={cn(
                    styles.accordionItemContent,
                    dropped ? styles["accordionItemContent--dropped"] : null
                )}
            >
                <ul className={cn(typography["t--zeta"], styles.yearList)}>
                    {Object.keys(category.pieces).map((year, index) => {
                        return (
                            <li
                                className={styles.yearListItem}
                                key={`year-list-item-${index}`}
                            >
                <span
                    className={cn(
                        typography["t--theta"],
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

const bio = [
    {
        year: 1943,
        text: "Petr Menš is born on October 30 in Mladá Boleslav. His parents, Josef and Marie Menš (née Jiráková) are both teachers, and his father is also a painter."
    },
    {
        year: 1945,
        text: "The family moves to Děčín, where Petr’s father teaches at a primary school and opens a studio which Petr begins visiting."
    },
    {
        year: 1957,
        text: "Petr starts at an 11-year secondary school. In the same year the North Bohemian art group Step 57 is founded. Petr’s father is a member and Petr gets to know Step 57 artists living in Děčín. Important contacts for the future painter are Richard Ťápal, a painter and expert on colour, and especially a younger artist, Zdeněk Chotěnovský, a successful illustrator and poster designer. He encourages 16-year-old Petr to apply to František Muzika’s studio at the Academy of Arts, Architecture and Design, rather than the Academy of Fine Arts as his father wishes."
    },
    {
        year: 1960,
        text: "Petr passes the school leaving examination. He starts studying at the Academy of Arts, Architecture and Design in Prague, and in the preparatory year he is taught by Josef Novák. He meets Antonín Tomalík and Josef Vyleťal, and become friends with two other students, Aleš Krejča and the sculptor Jiří Velinger."
    },
    {
        year: 1961,
        text: "This year marks a turning point. Petr moves to a hall of residence belonging to the University of Transport in the former Convent of the Sisters of Mercy of St. Borromeo in Ostrovní ulice, where he meets older students, mostly from the Academy of Fine Arts: Zdeněk Beran, Zbyšek Sion and Antonín Málek, who are involved in the clandestine Confrontations I and II exhibitions. Friends among his peers include the sculptor Peter Oriešek and the painter Jiří Sopko, as well as artists he would later stay in touch with in North Bohemia: Josef Kochrda, Jiří Nepasický, Pavel Werner and Vratislav K. Novák. His mother dies on November 21 after a long illness."
    },
    {
        year: 1962,
        text: "Petr and several friends visit Mikuláš Medek’s studio, and Medek visits them in Jiří Velinger’s studio."
    },
    {
        year: 1963,
        text: "Petr Menš ends his Art Informel period and starts producing surrealist works. He marries Eva Roztočilová (1940), a student from František Muzika’s studio, and eventually they have two daughters, Michaela and Markéta."
    },
    {
        year: 1964,
        text: "He starts working on his graduation project."
    },
    {
        year: 1965,
        text: "He finishes his studies at the Academy by defending his graduation project, the graphic design for a special edition of Vladimír Holan’s poem “The Vanished Cathedral”, illustrated with lithographs. He starts his one-year compulsory military service."
    },
    {
        year: 1966,
        text: "He returns to Děčín and gets his first studio, in Teplická ulice."
    },
    {
        year: 1968,
        text: "He exhibits his paintings for the first time with the North Bohemian branch of the Czechoslovak Fine Artists Association, in Ústí nad Labem, Brno and České Budějovice. He earns his living from graphic design, working primarily on corporate prospectuses and catalogues. His main client is the state-owned company Desta Děčín. He undertakes his first architectural commission, a wall panel for the Sněžník cinema in Děčín."
    },
    {
        year: 1975,
        text: "The artist’s first solo exhibition is in Duchcov. He takes part in the Introducing the Young exhibition at Dílo in Ústí nad Labem. Menš’s painting Tellumo has to be removed from the exhibition. He causes another scandal at an exhibition of artists from North Bohemia with his large painting The Other Side of the Elbe, with its dangerous allusion to the occupation of Děčín Castle by Soviet troops. Menš’s surrealist period ends and he starts working on large paintings for Český Krumlov Castle as well as building a house for his family, which takes almost five years."
    },
    {
        year: 1979,
        text: "Menš paints his first imaginary portraits, a subject he continues to work on for almost a decade."
    },
    {
        year: 1983,
        text: "In a figural composition, Break, his portraits become dramatic figural scenes.67"
    },
    {
        year: 1989,
        text: "He anonymously enters a public competition for a safety curtain for what was then the Zdeněk Nejedlý State Theatre in Ústí nad Labem, winning first prize. Alongside the curtain he paints figural compositions inspired by the theme of the Commedia dell’arte; they also incorporate the artist’s memories of his study visits to Italy."
    },
    {
        year: 1992,
        text: "The North Bohemian Opera and Ballet Theatre opens in Ústí nad Labem with a new safety curtain by Petr Menš"
    },
    {
        year: 1997,
        text: "The painting Terme di Caracalla ends the period of compositions that began with preparatory work for the theatre curtain. Privatisation means Menš has to vacate his studio in Děčín. He converts a large wooden building in Velká Bukovina into an apartment and a spacious studio. He starts teaching art at the Glassmaking School in Kamenický Šenov, where he heads the glass shaping and painting department. His new home in the countryside brings about a transformation in his art, and he starts painting seemingly abstract landscapes of his surroundings, something he has continued to work on ever since."
    },
    {
        year: 2004,
        text: "Menš injures his shoulder in a skiing accident, which for a time prevents him from painting while standing at his easel. He spreads large sheets of paper on the floor and starts using new techniques such as spraying and pouring paint, using craquelure with layers of enamel, and other methods. He spends three years working on large-format drawings inspired by the landscape around Velká Bukovina."
    },
    {
        year: 2008,
        text: "He stops working with glass."
    },
    {
        year: 2011,
        text: "Milan Bárta publishes a long article on Petr Menš on the internet, covering a number of significant aspects of his life and art."
    },
    {
        year: 2013,
        text: "Menš has a large retrospective exhibition at the Municipal Museum in Ústí nad Labem, which also features his glass work."
    },
    {
        year: 2015,
        text: "He opens the decorative painting department at the Glassmaking School in Kamenický Šenov."
    }
];

export default function Info({categories}) {
    const [previewPiece, setPreviewPiece] = useState(null);
    const {setHeaderText} = useContext(AppContext);

    useEffect(() => {
        setHeaderText(", painter, graphic designer, art teacher.")
    }, []);

    return (
        <>
            <Meta title={"Info"}/>

            <h1
                style={{
                    display: "none",
                }}
            >
                Petr Mens – Info Petr Menš – Info
            </h1>

            <div className={cn(utilities.grid, utilities.offset, styles.page)}>
                <div className={styles.left}>
                    <div>
                        <h2
                            className={cn(
                                typography["t--theta"],
                                styles.indexTitle,
                                utilities.offset
                            )}
                        >
                            Biographical information
                        </h2>

                        <ul className={cn(styles.bio, typography["t--theta"])}>
                            {bio.map(item => (
                                <li className={styles.bioItem} key={item.year}>
                                    <strong>{item.year}</strong>
                                    <span>{item.text}</span>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>

                <div className={styles.right}>
                    <h2
                        className={cn(
                            typography["t--theta"],
                            utilities.offset,
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
                <>
                    <Image
                        src={previewPiece.image}
                        alt={`${previewPiece.title} – a piece by Petr Menš created in ${previewPiece.year}.`}
                        manipulations={{w: 400}}
                        className={styles.previewPiece}
                    />
                </>
            )}
        </>
    );
}

export async function getStaticProps() {
    const {
        data: {data: categories},
    } = await axios.get("https://cms.petrmens.art/petrmens/items/category", {
        params: {
            fields: "*.*.*",
        },
    });

    const {
        data: {data: pieces},
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
                        .filter(
                            (piece) =>
                                piece.category && piece.category.title === category.title
                        )
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
