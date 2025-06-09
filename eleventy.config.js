import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import fontAwesomePlugin from "@11ty/font-awesome";
import markdownit from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import { full as emoji } from "markdown-it-emoji";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";
import { dateFormat } from "./src/_scripts/filters/dateFormat.js";
import { filterTagList } from "./src/_scripts/filters/filterTagList.js";
import { wordCount } from "./src/_scripts/wordCount.js";
import { sortAlphabetically } from "./src/_scripts/filters/sortAlphabetically.js";
import { getKeys } from "./src/_scripts/getKeys.js";

export default async function(eleventyConfig) {
  // markdown-it options
  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  // Anchor plugin options
  const anchorOptions = {
    level: 2,
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: "#",
      placement: "after"
    }),
    slugify: (s) => s.trim().toLowerCase().replace(/\s+/g, "-")
  };
  // Configure markdown library with plugins
  const markdownLibrary = markdownit(mdOptions)
    .use(markdownItAnchor, anchorOptions)
    .use(emoji)
    .use(MarkdownItGitHubAlerts);

  // RSS feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "posts", // iterate over `collections.posts`
      limit: 10,     // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Kit France",
      subtitle: "Product",
      base: "https://kitfrance.com/",
      author: {
        name: "Kit France",
        email: "kit@kitfrance.com", // Optional
      }
    }
  });

  // Image transforms
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // output image formats
    formats: ["webp", "jpeg"],

    // output image widths
    widths: ["auto"],

    // optional, attributes assigned on <img> nodes override these values
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {}
    }
  });

  // Drafts
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // Bundle
  eleventyConfig.addBundle("css");

  // Font Awesome
  eleventyConfig.addPlugin(fontAwesomePlugin, {
    transform: "i[class]",
    	shortcode: "icon",
    	failOnError: true,
    	defaultAttributes: {
      	  class: "icon-svg"
    	}
  });

  // Configure eleventy
  eleventyConfig.setLibrary("md", markdownLibrary);
  eleventyConfig.addWatchTarget("./src/_sass/");
  eleventyConfig.addPassthroughCopy("./css/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addFilter("dateFormat", dateFormat);
  eleventyConfig.addFilter("filterTagList", filterTagList);
  eleventyConfig.addFilter("wordCount", wordCount);
  eleventyConfig.addFilter("sortAlphabetically", sortAlphabetically);
  eleventyConfig.addFilter("getKeys", getKeys);
};

export const config = {
  // Control which files Eleventy will process
  // e.g.: *.md, *.njk, *.html, *.liquid
  templateFormats: [
    "md",
    "njk",
    "html",
    "liquid",
    "11ty.js",
  ],

  // Pre-process *.md files with: (default: `liquid`)
  markdownTemplateEngine: "njk",

  // Pre-process *.html files with: (default: `liquid`)
  htmlTemplateEngine: "njk",

  // These are all optional:
  dir: {
    input: "src",          // default: "."
    includes: "_includes",  // default: "_includes" (`input` relative)
    layouts: "_layouts",    // default: "_layouts" (`input` relative)
    data: "_data",          // default: "_data" (`input` relative)
    output: "dist",        // default: "_site"
  },
};
