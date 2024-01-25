import Link from 'next/link'
import { headers } from "next/headers";
import { format, parseISO } from 'date-fns'
import { notFound } from "next/navigation";

export default function Article({ article }) {
  console.log(article, 'article')
  const headersList = headers();
  const domain = headersList.get('host');
  const available_site = article?.sites?.data.some((site) => site.attributes.domain === domain);
  if(!available_site){
    return notFound();
  }
  const primarySite = article?.primary_site?.data?.attributes?.domain;
  const isPrimarySite = primarySite === domain;
  const author = article?.Author?.data?.attributes?.pseudonym;
  return (
    <article className="bg-gray-50 pb-12 sm:pb-16 lg:pb-24">
      <header>
        <div className="px-5 lg:px-0">
          <div className="mx-auto mb-8 max-w-prose border-b border-gray-300/70 pb-8 pt-10 text-lg sm:pt-16">
            <Link
              href={`/categories/${article?.category?.data.attributes.slug}`}
              className="relative text-sm font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
            >
              {article?.category?.data?.attributes?.category}
            </Link>
            <h2 className="mt-3.5 text-4xl font-medium tracking-normal text-gray-900 decoration-red-300 decoration-3 transition duration-300 ease-in-out group-hover:underline sm:mt-5 sm:text-5xl sm:leading-tight md:tracking-tight lg:text-6xl">
              {article?.Title}
            </h2>
            {author && <p className='article-author'>By {author} - {format(parseISO(article?.publishedAt), 'LLL d, yyyy')}</p>}
            {!isPrimarySite && (<p className='syndication-article'>This article appeared in <a href={primarySite} target='_blank'>{primarySite}</a> and has been published here with permission.</p>)}
            <div>
              {
                article?.Item.length > 0 && article.Item.map(item => {
                  return (
                    <section>  
                      <h2>{item.title}</h2>
                      <div className="mt-4 text-base leading-loose text-gray-600">
                        {item.pre_image_text}
                        <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item?.image?.data?.attributes.formats.medium?.url}`} alt="item Image" />
                        <small><Link href={item?.caption_url} target='_blank'>{item.caption_description}</Link></small>
                        <br></br>
                        {item.post_image_text}
                      </div>
                    </section>
                  )
                })}
            </div>
          </div>
        </div>
      </header>
    </article>
  )
}
