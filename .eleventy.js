const lunr = require("lunr");
const markdownit = require("markdown-it");
const CleanCSS = require("clean-css");

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
        categories: el.data.categories,
        content: el.template._frontMatter.content,
      });
    });

    const idx = lunr(function () {
      this.ref("id");
      this.field("url");
      this.field("title");
      this.field("subtitle");
      this.field("image");
      this.field("client");
      this.field("ods");
      this.field("categories");
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

  eleventyConfig.addFilter("categoryFilter", function (collection, category) {
    if (!category) return collection;
    const filtered = collection.filter((item) =>
      item.data.categories.includes(category)
    );
    return filtered;
  });

  eleventyConfig.addFilter(
    "excludeServiceFilter",
    function (collection, service) {
      if (!service) return collection;
      const filtered = collection.filter(
        (item) => !item.data.title.includes(service)
      );
      return filtered;
    }
  );

  eleventyConfig.addFilter("formattedDate", function (value) {
    const date = new Date(value);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  eleventyConfig.setLibrary("md", markdownit(options));

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
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
