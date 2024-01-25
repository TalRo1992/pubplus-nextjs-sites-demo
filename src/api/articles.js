
export const getArticleData = async (articleName) => {
    if (!articleName) return undefined;
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate[0]=Item&populate[1]=sites&populate[2]=sites.logo&populate[3]=sites.logo.media&populate[4]=primary_site&populate[5]=Author&populate[6]=sites.categories&populate[7]=Item.image.media&populate[8]=category&filters[slug][$eq]=${articleName}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data?.data[0];
}

export const getCategoriesData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/categories?populate[articles][populate][0]=Item.image.media&[populate][1]=Item`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data?.data;
}

export const getCategoryArticles = async (category) => {
    if (!category) return undefined;
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate[0]=category&populate[1]=Author&populate[2]=sites&populate[3]=Item.image.media&filters[category][slug][$eq]=${category}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data?.data;
}

export const getSiteMenuCategories = async (domain) => {
    if (!domain) return undefined;
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/sites?filters[domain][$eq]=${domain}&fields[0]=domain&fields[1]=mainColor&populate[0]=categories&populate[1]=logo`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data?.data[0];
}

export const getRecentArticles = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate[0]=Item.image.media&populate[1]=category&pagination[limit]=3&orderBy=createdAt:desc`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data?.data;
}