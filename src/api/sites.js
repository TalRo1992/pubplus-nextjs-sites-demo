
export const getSiteData = async (domain) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/sites?filters[domain][$eq]=${domain}&populate=*`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data?.data[0];
}

export const getTermsOfService = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/terms-of-service`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.data.attributes;
}

export const getPrivacyPolicy = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/privacy-policy`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.data.attributes;
}

export const getDmcaPolicy = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/dmca-policy`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.data.attributes;
}

export const getContactUs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contact-us`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.data.attributes;
}