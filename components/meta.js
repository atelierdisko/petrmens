import Head from "next/head";
import React from "react";

const defaultDescription = "Petr Menš, painter, graphic designer, art teacher from north bohemia."

const Meta = ({title, description = defaultDescription, image}) => {

    let url = null;

    if (typeof document !== "undefined") {
        url = document.location.href;
    }

    const defaultImage = "https://img.jansasinka.de/petrmens/cms/a3d90cce-4a2a-4b97-bc53-e3b9f6a5da2e.jpg";

    return (
        <Head>
            <title>Petr Menš | {title}</title>
            <meta
                name="description"
                content={description}
            />
            <meta property="og:title" content={`Petr Menš – ${title}`}/>
            <meta
                property="og:description"
                content={description}
            />

            <meta property="og:type" content="website"/>
            <meta property="og:url" content={url}/>
            <link rel="icon" type="image/ico" href="/favicon.ico"/>

            <meta
                property="og:image"
                content={`${image ? image : defaultImage}?w=1200&h=627&fit=crop`}
            />

            <meta name="robots" content="index,follow"/>
        </Head>
    )
}

export default Meta