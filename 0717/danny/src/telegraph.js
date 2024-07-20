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
      case "figure":
        return {
          tag: "figure",
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

// // Test the function
// console.log(htmlToNode(html));
