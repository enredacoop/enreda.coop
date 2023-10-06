module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("assets");
  return {
    dir: {
      input: "src",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
