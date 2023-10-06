const lunr = require("lunr");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addCollection("searchable", function (collectionApi) {
    const data = [];
    const searchableCollection = collectionApi.getFilteredByTag("proyecto");
    searchableCollection.forEach((el) => {
      const id = el.fileSlug;
      const url = el.url;
      const title = el.data.title;
      const subtitle = el.data.subtitle;
      data.push({ id, url, title, subtitle });
    });
    const idx = lunr(function () {
      this.ref("id");
      this.field("url");
      this.field("title");
      this.field("subtitle");

      data.forEach((el) => {
        this.add({ id: el.id, url: el.url, title: el.title, subtitle: el.subtitle });
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

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "layouts", // relative to dir.input
    },
    passthroughFileCopy: true,
  };
};
