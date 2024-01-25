export const getHostName = (url:string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (error:any) {
      console.error("Invalid URL:", error.message);
      return null;
    }
};

export const getModifiedContent = async (  getContentRequest: () => Promise<string>, placeholderMap: {[key: string]: string}, responseKey:string) => { 
    const contentData:any = await getContentRequest();
    const placeholderRegex = /~~(.*?)~~/g;
    const replacedString = contentData[responseKey].replace(placeholderRegex, (match:any, placeholder:any) => {
        return placeholderMap.hasOwnProperty(placeholder) ? placeholderMap[placeholder] : match;
    });
    return replacedString;  
}