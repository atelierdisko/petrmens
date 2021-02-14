import axios from "axios";

const getImage = (imageProperty) => {
    if (!imageProperty.data) {
        return null;
    }

    return imageProperty.data.full_url;
};

const getCategory = async() => {

    const {data: {data: categories}} = await axios.get("https://cms.petrmens.art/petrmens/items/category");

    const {
        data: {data: pieces},
    } = await axios.get("https://cms.petrmens.art/petrmens/items/piece", {
        params: {
            fields: "*.*.*",
            limit: 500,
        },
    });

    const category = categories.find(category => category.slug === params.categorySlug);
    category.pieces = pieces.filter((piece) => piece.category.title === category.title);


    return category;
}

export {getImage}