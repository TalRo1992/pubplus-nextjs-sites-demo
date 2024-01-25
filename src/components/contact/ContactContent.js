import { getHostName, getModifiedContent } from "../../helper";
import { headers } from "next/headers";
import { getContactUs } from "../../api/sites";

export default async function ContactContent() {
  const headersList = headers();
  const url = headersList.get('referer');
  const hostName = getHostName(url);
  const placeholderMap = {
    hostName: hostName || ''
    // Add more placeholders as needed
  };
  const modifiedDmcaPolicy = await getModifiedContent(getContactUs,placeholderMap, 'contactUs')

  return (
    <section className="py-12 sm:py-20 lg:pt-24">
      <div className="prose prose-lg mx-auto px-5 prose-a:transition prose-a:duration-300 prose-a:ease-in-out hover:prose-a:text-red-700 prose-img:rounded-xl sm:px-6 lg:max-w-screen-xl lg:columns-2 lg:gap-x-10 lg:px-8">
        <div dangerouslySetInnerHTML={{ __html: modifiedDmcaPolicy }} />  
      </div>
    </section>
  )
}
