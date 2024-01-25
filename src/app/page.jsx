import ArticlesAboveTheFold from '@/components/home/ArticlesAboveTheFold'
import TwoColFeed from '@/components/home/TwoColFeed'

import { allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export const metadata = {
  description:
    'Banter is a modern, stylish Tailwind CSS template for any blog, magazine, or news site.',
}

export default function HomePage() {
  const articles = allArticles
    .filter(
      (article) => !article.featured && !article.cover_story && !article.banner,
    )
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const popularArticles = Array.from(articles).sort((a, b) => b.views - a.views)

  return (
    <>
      <ArticlesAboveTheFold />
      <section className="relative mx-auto max-w-screen-xl py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-8">
          <TwoColFeed articles={articles.slice(6, 12)} />
        </div>
      </section>

    </>
  )
}
