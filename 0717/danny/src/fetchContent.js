const axios = require("axios");
const cheerio = require("cheerio");

const fetchContent = async (url) => {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const title = $("h1.headlines.titleModule .title.titleModule__main").text();
  const summary = $(
    "div.articleBody .lead.textModule.textModule--type-lead"
  ).text();
  const content = $(
    "p.paragraph.textModule.textModule--type-paragraph,img.photoModule__visual,figcaption.caption"
  )
    .map((_, element) => $.html(element))
    .get()
    .join("");
  return { title, summary, content };
};

module.exports = { fetchContent };
