import Link from 'next/link'
import Image from 'next/image'

function SidebarArticle({ article }) {
  return (
    <article className="flex space-x-4 sm:space-x-6 lg:space-x-4">
      {/* Image */}
      <Link
        href={article.url}
        className="group relative z-10 h-24 w-24 overflow-hidden rounded-2xl bg-gray-100 sm:h-28 sm:w-28 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
      >
        <Image
          className="h-full w-full rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
          src={article.image}
          alt={article.title}
          fill
          sizes="16rem"
        />
      </Link>

      {/* Content */}
      <div className="w-2/3">
        <div className="flex h-full w-full flex-1 flex-col justify-center">
          <div>
            <Link
              href={article.url}
              className="text-md font-medium leading-snug tracking-normal text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline"
            >
              {article.title}
            </Link>
          </div>

          {/* Author */}
          <div className="mt-2 flex items-center justify-between">
            {/* Author meta */}
            <div className="flex items-center justify-center">
              <div className="text-sm">
                <span className="text-gray-500">By </span>
                <Link
                  href={article.author.url}
                  className="font-medium text-gray-700 hover:underline"
                >
                  {article.author.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function SidebarArticles({ heading, articles }) {
  return (
    <div className="w-full rounded-2xl bg-gray-50 p-5 sm:p-8">
      <h3 className="relative border-b border-gray-300/70 pb-2.5 text-2xl font-medium text-gray-900 before:absolute before:-bottom-px before:left-0 before:h-px before:w-24 before:bg-red-600 before:content-['']">
        {heading}
      </h3>

      {/* Articles */}
      <div className="space-y-6 pt-6 sm:space-y-5 lg:space-y-6 xl:space-y-5">
        {articles.map((article, index) => (
          <SidebarArticle key={`featured-article-${index}`} article={article} />
        ))}
      </div>
    </div>
  )
}
