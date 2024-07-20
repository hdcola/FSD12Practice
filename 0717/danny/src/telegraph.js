const cheerio = require("cheerio");
const api = require("telegraph-node");
const ph = new api();
const config = require("./config.js");

const htmlToNode = (html) => {
  const $ = cheerio.load(html, { decodeEntities: false });
  const content = [];

  function convertElement(element) {
    const tag = element.tagName;
    let children = $(element)
      .contents()
      .map((_, el) => convertElement(el))
      .get()
      .filter((child) => child !== ""); // 过滤掉空字符串

    const text = $(element).text().trim();

    if (!tag) {
      return text || "";
    }

    switch (tag) {
      case "p":
      case "h3":
      case "figcaption":
      case "figure":
      case "b":
      case "i":
      case "u":
      case "s":
      case "blockquote":
        return {
          tag,
          children: children.length ? children : text ? [text] : [],
        };
      case "img":
        return { tag: "img", attrs: { src: $(element).attr("src") } };
      case "a":
        return {
          tag: "a",
          attrs: { href: $(element).attr("href") },
          children: children.length ? children : text ? [text] : [],
        };
      default:
        return text || "";
    }
  }

  $("body")
    .contents()
    .each((_, element) => {
      const convertedElement = convertElement(element);
      if (convertedElement && convertedElement !== "") {
        content.push(convertedElement);
      }
    });

  return content.filter((item) => item !== ""); // 最后再次过滤掉任何空字符串
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

// const html = `
// <body>
// <figure itemscope="" itemprop="associatedMedia" itemtype="https://schema.org/ImageObject">
//     <img src="https://mobile-img.lpcdn.ca/v2/924x/e7ea013a218e3c84b96679ac54b8708b.jpg" alt="" class="photoModule__visual" itemprop="contentUrl url">
//     <figcaption itemprop="caption">
//         <p class="credit photoModule__caption photoModule__caption--credit" style="">
//             PHOTO OLIVIER JEAN, LA PRESSE
//         </p>
//         <p class="description photoModule__caption photoModule__caption--description" style="">
//             Les élèves ont appris à passer les vitesses, à freiner à deux mains ou à maîtriser un vélo à une seule main tout en signalant de l’autre.
//         </p>
//     </figcaption>
// </figure>
// </body>
// `;

// const { printArray } = require("./util");
// printArray(htmlToNode(html));
