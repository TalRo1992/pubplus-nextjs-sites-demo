import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { allArticles } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import { getRecentArticles } from "@/api/articles";

function CoverStory({ article }) {
  const { attributes } = article;
  const articleItem = attributes?.Item[0];
  const coverImage = articleItem?.image?.data?.attributes?.formats?.medium?.url;
  return (
    <article className="relative lg:sticky lg:top-8 lg:w-1/2">
      {/* Image */}
      <Link
        href={`/articles/${attributes.slug}`}
        className="group aspect-h-9 aspect-w-16 relative block overflow-hidden rounded-2xl bg-gray-100"
      >
        <Image
          className="rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage}`}
          alt={attributes.Title}
          fill
          sizes="(min-width: 1536px) 44rem, (min-width: 1024px) calc(50vw - 2rem), (min-width: 640px) 39rem, calc(100vw - 2rem)"
        />
      </Link>

      {/* Content */}
      <div className="mt-6 md:align-middle">
        <Link
          href={`/articles/${attributes.slug}`}
          className="relative text-sm font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
        >
          {attributes?.category?.data.attributes.category}
        </Link>
        <Link href={`/articles/${attributes.slug}`} className="group mt-3 block">
          <h2 className="text-3xl font-medium tracking-normal text-gray-900 decoration-gray-800 decoration-3 transition duration-300 ease-in-out group-hover:underline md:tracking-tight lg:text-4xl lg:leading-tight">
            {attributes.Title}
          </h2>
          <div>
            <p className="mt-4 text-base leading-loose text-gray-600">
              {articleItem?.post_image_text}
            </p>
          </div>
        </Link>
      </div>
    </article>
  )
}

function RecentArticle({ article, index }) {
  const { slug, category, Item, publishedAt } = article.attributes;
  const categorySlug = category?.data?.attributes?.slug;
  const firstItem = Item[0];
  const siteLogo = firstItem?.image?.data?.attributes.formats.medium.url;
  const itemImg = siteLogo && `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${siteLogo}`;

  return (
    <article
      className={clsx('py-8 sm:flex lg:flex-col xl:flex-row xl:items-center', {
        'border-t border-gray-300/70 lg:border-t-0 xl:border-t': index > 0,
      })}
    >
      {/* Image */}
      <Link
        href={`articles/${slug}`}
        className="order-2 w-full sm:w-2/5 lg:order-1 lg:w-full xl:w-2/5"
      >
        <div className="group aspect-h-9 aspect-w-16 overflow-hidden rounded-2xl bg-gray-100">
          <Image
            className="rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={itemImg}
            alt={firstItem.title}
            fill
            sizes="(min-width: 1536px) 17.6rem, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 15rem, calc(100vw - 2rem)"
          />
        </div>
      </Link>
      <div className="order-1 mt-5 w-full px-2 sm:mt-0 sm:max-w-sm sm:pl-0 sm:pr-5 lg:order-2 lg:mt-4 xl:ml-5 xl:mt-0 xl:flex-1">
        <Link
          href={`/categories/${categorySlug}`}
          className="text-xs font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
        >
          {category.data.attributes.category}
        </Link>

        <Link href={`${categorySlug}/${slug}`}>
          <h3 className="mt-2 text-xl font-medium leading-normal tracking-normal text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline">
            {firstItem.title}
          </h3>
        </Link>
        <div className="text-sm text-gray-500">
          <span className="mx-1">
              {format(parseISO(publishedAt), 'LLL d, yyyy')}
          </span>
        </div>
      </div>
    </article>
  )
}

export default async function ArticlesAboveTheFold() {
  const recentArticles = await getRecentArticles(); 
  const coverStory = recentArticles[recentArticles.length - 1];
  return (
    <section className="bg-gray-50 pt-12 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:flex lg:max-w-screen-2xl lg:items-start lg:px-8">
        <CoverStory article={coverStory} />

        {/* Recent Articles */}
        <div className="mt-12 sm:mt-16 lg:ml-12 lg:mt-0 lg:w-1/2 xl:ml-16">
          <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
            Recent stories
          </h3>

          {/* Articles Container */}
          <div className="grid lg:grid-cols-2 lg:gap-x-5 xl:grid-cols-1">
            {recentArticles.map((article, index) => (
              <RecentArticle
                article={article}
                index={index}
                key={`recent-article-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
