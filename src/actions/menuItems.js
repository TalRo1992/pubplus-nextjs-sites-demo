'use server'
export default async function getSiteMenuItems(domain) {
    if (!domain) return undefined;
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/sites?filters[domain][$eq]=${domain}&fields[0]=domain&fields[1]=mainColor&populate[0]=categories&populate[1]=logo`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data?.data[0];
}