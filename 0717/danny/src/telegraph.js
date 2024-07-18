const cheerio = require("cheerio");
const api = require("telegraph-node");
const ph = new api();
const config = require("./config.js");

const htmlToNode = (html) => {
  const $ = cheerio.load(html);
  const content = [];

  // Helper function to convert an element to Telegraph content
  function convertElement(element) {
    const tag = element.tagName;
    const children = $(element)
      .contents()
      .map((_, el) => convertElement(el))
      .get();
    const text = $(element).text();

    switch (tag) {
      case "p":
        return { tag: "p", children: children.length ? children : [text] };
      case "h3":
        return { tag: "h3", children: children.length ? children : [text] };
      case "img":
        return { tag: "img", attrs: { src: $(element).attr("src") } };
      case "figcaption":
        return {
          tag: "figcaption",
          children: children.length ? children : [text],
        };
      case "a":
        return {
          tag: "a",
          attrs: { href: $(element).attr("href") },
          children: children.length ? children : [text],
        };
      case "b":
        return { tag: "b", children: children.length ? children : [text] };
      case "i":
        return { tag: "i", children: children.length ? children : [text] };
      case "u":
        return { tag: "u", children: children.length ? children : [text] };
      case "s":
        return { tag: "s", children: children.length ? children : [text] };
      case "blockquote":
        return {
          tag: "blockquote",
          children: children.length ? children : [text],
        };
      default:
        return text;
    }
  }

  // Convert each top-level element in the body
  $("body")
    .contents()
    .each((_, element) => {
      const convertedElement = convertElement(element);
      if (convertedElement) {
        content.push(convertedElement);
      }
    });

  return content;
};

const createPage = async (title, content) => {
  const formattedContent = Array.isArray(content)
    ? content
    : [{ tag: "p", children: [content] }];

  const result = await ph.createPage(
    config.telegraphAccessToken,
    title,
    formattedContent,
    {
      author_name: config.authorName,
      author_url: config.authorUrl,
    }
  );
  return result.url;
};

module.exports = { createPage, htmlToNode };
