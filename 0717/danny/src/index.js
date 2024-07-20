const { fetchContent } = require("./fetchContent");
const { htmlToNode, createPage } = require("./telegraph");
const cheerio = require("cheerio");

const main = async () => {
  const url =
    "https://www.lapresse.ca/actualites/2024-07-16/programme-cycliste-averti/quand-l-ecole-fait-pedaler-les-jeunes.php";
  const { title, summary, content } = await fetchContent(url);
  console.log(content);
  const formattedContent = htmlToNode("<body>" + content + "</body>");
  const telegraphUrl = await createPage(title, formattedContent);
  console.log(telegraphUrl);
};

main();
