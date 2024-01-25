import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function BannerArticle({ article }) {
  return (
    <section className="relative mb-52 w-full lg:mb-40">
      {/* Image */}
      <Link href={article.url}>
        <div className="aspect-h-2 aspect-w-5 bg-gray-50">
          <Image
            className="object-cover object-center"
            src={article.image}
            alt={article.title}
            fill
            sizes="100vw"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-3xl translate-y-4/5 px-4 sm:translate-y-3/4 sm:px-6 lg:translate-y-1/2">
        <div className="flex items-center justify-center rounded-2xl bg-white/90 px-5 py-8 shadow-md backdrop-blur-md sm:p-10 sm:shadow-lg md:p-12 lg:p-14 ">
          <div className="flex flex-col items-center text-center">
            <Link
              href={article.category.url}
              className="relative text-sm font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
            >
              {article.category.name}
            </Link>
            <Link href={article.url} className="group mt-3 block">
              <h2 className="text-2xl font-medium tracking-normal text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out group-hover:underline sm:text-3xl sm:decoration-3 md:tracking-tight lg:text-4xl lg:leading-tight">
                {article.title}
              </h2>
            </Link>

            {/* Article Footer Info */}
            <footer className="mt-5 flex items-center justify-between sm:mt-7">
              <div className="flex items-center justify-center">
                <Link
                  href={article.author.url}
                  className="relative mr-3 h-7 w-7 rounded-lg bg-gray-50 lg:h-8 lg:w-8"
                >
                  <Image
                    className="flex-shrink-0 rounded-lg object-cover object-center"
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    sizes="2rem"
                  />
                </Link>

                <div className="flex items-center text-sm lg:text-[15px]">
                  <span className="hidden text-gray-500 sm:inline-block">
                    By&nbsp;
                  </span>
                  <Link
                    href={article.author.url}
                    className="font-medium text-gray-700 hover:underline"
                  >
                    {article.author.name}
                  </Link>

                  <CalendarIcon className="ml-2.5 h-[18px] w-[18px] text-gray-400" />
                  <time dateTime={article.date} className="ml-1 text-gray-500">
                    {format(parseISO(article.date), 'LLL d, yyyy')}
                  </time>
                  <span className="hidden items-center sm:flex">
                    <ClockIcon className="ml-2.5 h-[18px] w-[18px] text-gray-400" />
                    <span className="ml-1 text-gray-500">
                      {article.time_to_read_in_minutes} min read
                    </span>
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}
