module.exports = function(eleventyConfig) {
  // These lines MUST match your folder names exactly.
  eleventyConfig.addPassthroughCopy("CSS");
  eleventyConfig.addPassthroughCopy("JS");
  eleventyConfig.addPassthroughCopy("Images");

  return {
    htmlTemplateEngine: "liquid",
    dir: {
      input: "HTML",
      includes: "../_includes",
      output: "_site"
    }
  };
};


