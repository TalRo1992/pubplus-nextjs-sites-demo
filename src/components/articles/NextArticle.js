import Link from 'next/link'

export default function NextArticle({ article }) {
  return (
    <section
      className="relative h-96 w-full bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${article.image})` }}
    >
      <div className="absolute inset-0 bg-gray-900/50" />

      {/* Content */}
      <div className="absolute inset-0">
        <div className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center">
          <span className="relative text-sm font-medium uppercase tracking-widest text-red-100">
            Next article
          </span>
          <h2 className="mt-3 text-center text-3xl font-medium tracking-normal text-white sm:text-4xl md:tracking-tight lg:text-5xl lg:leading-tight">
            {article.title}
          </h2>
        </div>
      </div>

      <Link href={article.url} className="absolute inset-0"></Link>
    </section>
  )
}
