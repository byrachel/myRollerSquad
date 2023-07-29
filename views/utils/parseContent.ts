import ReactHtmlParser from "react-html-parser";

const decoded = (content: string) => {
  const decodedContent = content
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/")
    .replace(/&quot;/g, '"');
  return decodedContent;
};

export const parseContent = (content: string) => {
  if (content) {
    const decodedContent = decoded(content);
    return ReactHtmlParser(decodedContent);
  }
};

export const parsePhrase = (phrase: string) => {
  if (phrase) {
    const decodedPhrase = decoded(phrase);
    return ReactHtmlParser(decodedPhrase);
  }
};
