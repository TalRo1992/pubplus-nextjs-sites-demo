import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { format, parseISO } from 'date-fns'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function SingleColFeed({ articles }) {
  return (
    <>
      {articles.map((article, index) => (
        <article className="md:grid md:grid-cols-4 md:gap-8 py-4" key={article.attributes?.slug}>
          {/* Image */} 
          <div className="md:col-span-1">
            <Link
              href={`/articles/${article?.attributes?.slug}`}
              className="group aspect-h-9 aspect-w-16 relative z-10 block overflow-hidden rounded-2xl bg-gray-50 md:aspect-h-1 md:aspect-w-1"
            >
              { article.attributes?.Item[0]?.image?.data && <Image
                className="rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.Item[0]?.image?.data?.attributes.formats.medium.url}`}
                alt={article.attributes.Item[0].title}
                fill
                sizes="(min-width: 1280px) 11rem, (min-width: 1024px) 16vw, (min-width: 768px) 9rem, (min-width: 640px) 30rem, calc(100vw - 2rem)"
              />}
            </Link>
          </div>

          {/* Content */}
          <div className="relative mt-6 flex flex-col flex-wrap md:col-span-3 md:mt-0">
            <div
              className={clsx(
                'box-border flex w-full flex-1 flex-col justify-between px-6 md:px-0',
                {
                  'mb-8 border-b-2 border-gray-100 pb-8':
                    index != articles.length - 1,
                },
              )}
            >
              <div>
                <Link
                  href={`/categories/${article.attributes?.category.data.attributes.slug}`}
                  className="relative text-tiny font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
                >
                  {article.attributes?.category.data.attributes.category}
                </Link>

                <h3 className="mt-2.5 text-xl font-medium leading-tight text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline sm:text-2xl lg:text-xl xl:text-2xl">
                  {article.attributes?.Item[0].image?.data.attributes && <Link href={`/articles/${article?.attributes?.slug}`}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {article.attributes?.Item[0].title}
                  </Link>}
                </h3>
                <p className='article-author'>By {article?.attributes?.Author?.data?.attributes?.pseudonym} - {format(parseISO(article?.attributes.publishedAt), 'LLL d, yyyy')}</p>
                <p className="mt-3.5 block text-base leading-relaxed text-gray-500">
                  {article.attributes?.Item[0].caption_description}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  )
}
