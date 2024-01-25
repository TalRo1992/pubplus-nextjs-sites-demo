import { allCategories, allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import SingleColFeed from '@/components/shared/SingleColFeed'
import { headers } from "next/headers";
import { getCategoryArticles } from "@/api/articles";


export default async function CategoryPage({ params }) {
  const headersList = headers();
  const domain = headersList.get('host');
  let categoryData = await getCategoryArticles(params.slug, domain);
  categoryData = categoryData?.length && categoryData.filter((article) => article.attributes.sites.data.some((site) => site.attributes.domain === domain)) || [];
  const category = await allCategories.find(
    (category) => category.slug === params.slug,
  )
  const articles = await allArticles
    .filter((article) => article.category.slug === category?.slug)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const popularArticles = Array.from(articles).sort((a, b) => b.views - a.views)
  return (
      <section className="relative mx-auto max-w-xl px-4 py-12 sm:px-12 sm:py-16 md:max-w-3xl lg:max-w-screen-xl lg:px-8 lg:py-24">
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          <div className="col-span-2">
            <SingleColFeed articles={categoryData} />
          </div>
        </div>
      </section>
  )
}

export const dynamicParams = false
