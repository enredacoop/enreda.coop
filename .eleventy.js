const lunr = require("lunr");
const markdownit = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addCollection("searchable", function (collectionApi) {
    const data = [];
    const searchableCollection = collectionApi.getFilteredByTag("proyecto");
    searchableCollection.forEach((el) => {
      data.push({
        id: el.fileSlug,
        url: el.url,
        title: el.data.title,
        subtitle: el.data.subtitle,
        image: el.data.image,
        client: el.data.client,
        ods: el.data.ods,
        tags: el.data.tags,
        content: el.template._frontMatter.content,
      });
    });
    console.log(data);
    const idx = lunr(function () {
      this.ref("id");
      this.field("url");
      this.field("title");
      this.field("subtitle");
      this.field("image");
      this.field("client");
      this.field("ods");
      this.field("tags");
      this.field("content");

      data.forEach((el) => {
        this.add({ ...el });
      });
    });
    let dataMap = {};
    data.forEach((el) => {
      dataMap[el.id] = el;
    });
    // write idx to JSON file
    require("fs").writeFileSync(
      "dist/js/search_index.json",
      JSON.stringify({ index: idx, elements: dataMap })
    );
    return data;
  });

  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary("md", markdownit(options));

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "layouts", // relative to dir.input
    },
    passthroughFileCopy: true,
  };
};
