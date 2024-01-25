import { allArticles } from 'contentlayer/generated'
import Article from '@/components/articles/Article'
import { getArticleData } from "@/api/articles";

export default async function ArticlePage({ params }) {
  const articleData = await getArticleData(params.slug);
  const articleAttributes = articleData?.attributes;

  return (
    <>
      <Article article={articleAttributes} />
    </>
  )
}

function getNextArticleFor(article) {
  const articlesInSameCategory = allArticles.filter(
    (a) => a.category.slug === article.category.slug && a.slug !== article.slug,
  )
  if (articlesInSameCategory.length === 0) {
    return allArticles.filter((a) => a.slug !== article.slug)[
      Math.floor(Math.random() * allArticles.length - 1)
    ]
  } else {
    return articlesInSameCategory[
      Math.floor(Math.random() * articlesInSameCategory.length)
    ]
  }
}

export const dynamicParams = false
