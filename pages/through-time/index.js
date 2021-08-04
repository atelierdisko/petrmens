import Meta from "../../components/meta";
import Image from "../../components/Image/image";
import styles from "../../styles/troughTime.module.css"
import utilities from "../../styles/utilities.module.css";
import typography from "../../styles/typography.module.css";
import cn from "classnames";
import ImageCaption from "../../components/ImageCaption/imageCaption";
import Quote from "../../components/Quote/quote";
import "swiper/swiper.min.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {useContext, useEffect} from "react";
import {AppContext} from "../_app";

const GalleryBlock = ({items}) => {
    return (
        <div
            className={cn(styles.block, utilities.gridOffset)}>
            <Swiper slidesPerView={2.75}
                    spaceBetween={32}
                    scrollbar={true}
                    mousewheel={true}
                    freeMode={true}
                    direction={'horizontal'}>
                {items.map(item => (
                    <SwiperSlide>
                        <Image src={item.src} alt={item.title}/>
                        <ImageCaption title={item.title}>
                            {item.meta}
                        </ImageCaption>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

const TextBlock = ({children}) => (
    <div className={cn(utilities.grid, styles.block, styles.textBlock)}>
        {children}
    </div>
)

const QuoteBlock = ({...rest}) => (
    <div className={cn(utilities.grid, styles.block, styles.quoteBlock)}>
        <Quote {...rest}/>
    </div>
)

const WideSplitBlock = ({left, right}) => (
    <div className={cn(utilities.grid, styles.block, styles.wideSplitBlock)}>
        <div>
            <Image src={left.src} alt={left.title}/>
            <ImageCaption title={left.title}>
                {left.meta}
            </ImageCaption>
        </div>

        <div>
            <Image src={right.src} alt={right.title}/>
            <ImageCaption title={right.title}>
                {right.meta}
            </ImageCaption>
        </div>
    </div>
)

const NarrowSplitBlock = ({left, right}) => (
    <div className={cn(utilities.grid, styles.block, styles.narrowSplitBlock)}>
        <div>
            <Image src={left.src} alt={left.title}/>
            <ImageCaption title={left.title}>
                {left.meta}
            </ImageCaption>
        </div>

        <div>
            <Image src={right.src} alt={right.title}/>
            <ImageCaption title={right.title}>
                {right.meta}
            </ImageCaption>
        </div>
    </div>
)

const blockTypeMap = {
    quote: QuoteBlock,
    text: TextBlock,
    gallery: GalleryBlock,
    wideSplit: WideSplitBlock,
    narrowSplit: NarrowSplitBlock
}

const blocks = [
    {
        type: "narrowSplit",
        props: {
            left: {
                src: "https://cdn.petrmens.art/petrmens/cms/91907f2d-9b25-4bf8-802a-384357361b12.jpg?w=920",
                title: "Koloběh / Cycle",
                meta: "1963, Canvas, 160 x90 cm"
            },
            right: {
                src: "https://cdn.petrmens.art/petrmens/cms/4023bb8c-31f3-466a-8863-7fb06a9ac159.jpg?w=920",
                title: "Ukřižování / Crucifixion",
                meta: "1962, Wood, 60x45 cm"
            }
        }
    },
    {
        type: "wideSplit",
        props: {
            left: {
                src: "https://cdn.petrmens.art/petrmens/cms/91406d9d-d084-4105-85e5-3ed0cfc81be7.jpg?w=920",
                title: "Kašpárkovo pokušení / Kasper’s Temptation",
                meta: "1967"
            },
            right: {
                src: "https://cdn.petrmens.art/petrmens/cms/d9db3976-b2d3-4ae5-970e-cdf98a53e84c.jpg?w=920",
                title: "Zmizelá katedrála / The Vanished Cathedral",
                meta: "1965"
            }
        }
    },
    {
        type: "quote",
        props: {
            text: "There are therefore as many worlds as there are waking beings and like-living, like-feeling groups of beings. The supposedly single, independent and external world that each believes to be common to all is really an ever-new, uniquely occurring and non-recurring experience in the existence of each (...)",
            source: "Oswald Spengler"
        }
    },
    {
        type: "text",
        props: {
            children: (
                <p>
                    Although Petr Menš’s art is gradually emerging from obscurity, it is still little known by art
                    lovers and critics. For critics the places where he paints, Děčín and Velká Bukovina, are too
                    distant, but it is also true that Menš has done little to publicise his art and is reluctant to
                    part with paintings and drawings. The subtitle for Petr Menš’s exhibition in Litoměřice, Through
                    Time, has two aspects that define his work. Across suggests opposition, and Petr Menš has often
                    rebelled – first against his father, then against his teachers, and finally against whichever trend
                    happened to dominate this or that decade. Across also suggests moving through time, there and back.
                </p>
            )
        }
    },
    {
        type: "gallery",
        props: {
            items: [
                {
                    src: "https://cdn.petrmens.art/petrmens/cms/5c8f8374-f592-4c30-8b6d-8d2f4347b8d4.jpg?w=920",
                    title: "Hrobař / Gravedigger",
                    meta: "1968"
                },
                {
                    src: "https://cdn.petrmens.art/petrmens/cms/ccf608bd-8dac-454c-98b1-b2ba50602d24.jpg?w=920",
                    title: "Velká bublina / Large Bubble",
                    meta: "1969"
                },
                {
                    src: "https://cdn.petrmens.art/petrmens/cms/2fd27875-8e9d-4d8b-90b6-b2b61e0945cd.jpg?w=920",
                    title: "Stigmatizované plátno / Stigmatised Canvas",
                    meta: "1969"
                },
                {
                    src: "https://cdn.petrmens.art/petrmens/cms/069d305d-2d3a-47aa-b542-0100035e51b8.jpg?w=920",
                    title: "Zahrada fetišistova / The Fetishist’s Garden",
                    meta: "1968"
                },
            ]
        }
    },
    {
        type: "text",
        props: {
            children: (
                <>
                    <p>
                        Working in isolation does not necessarily mean finding stable and unchanging sources of
                        inspiration
                        that are sufficient for the entirety of one’s life. On the contrary, Menš is a complicated
                        artist,
                        sensitive to all manner of influences from the world of art. It makes no difference whether he
                        finds
                        inspiration in one of his immediate predecessors or contemporaries, or in the masters of the
                        Renaissance, mannerism, or the Baroque. It is just as natural that specific events in his life
                        have
                        found their way into his work: vivid impressions from his travels, especially in Italy, and in
                        recent years the things he sees on his daily outings in a landscape full of the mysterious
                        processes
                        of things coming into being and passing away. Added to this are his thoughts on the world today,
                        and
                        on a civilisation in peril.
                    </p>

                    <p>
                        None of this stops Petr Menš from carefully cultivating all the different aspects of his art,
                        including its execution, which requires time and great self-discipline. Although historical
                        reminiscences are more frequent in Menš’s work than with other artists, his art carries an
                        entirely
                        contemporary message and testimony.
                    </p>
                </>
            )
        }
    },
]

export default function Index() {
    const {setHeaderBackLink} = useContext(AppContext);

    useEffect(() => {
        setHeaderBackLink("/");
    }, []);

    return (
        <>
            <Meta title={"Through time"} description={"Petr Menš, painter, graphic designer, art teacher."}/>

            <div className={cn(utilities.grid, styles.split)}>
                <div className={styles.splitLeft}>
                    <Image
                        src={"https://cdn.petrmens.art/petrmens/cms/63679a6c-35b7-4fcf-bdb2-125385bf4605.jpg"}
                        alt={"Před oknem / Before the Window"}/>

                    <ImageCaption title={'Před oknem / Before the Window'} children={'1978'}
                                  className={utilities.gridOffset}/>
                </div>

                <div className={styles.splitRight}>
                    <div>
                        <h2 className={cn(styles.splitSubtitle, typography["t--epsilon"])}>
                            PETR MENŠ
                        </h2>

                        <h1 className={cn(styles.splitTitle, typography["t--beta"])}>
                            NAPŘÍČ ČASEM <br/>
                            THROUGH TIME
                        </h1>
                    </div>
                </div>
            </div>

            {blocks.map(block => {
                const Block = blockTypeMap[block.type];

                if (!Block) {
                    return null;
                }

                return <Block {...block.props}/>
            })}
        </>
    )
}