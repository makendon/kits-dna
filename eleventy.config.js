import markdownit from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor';
import { full as emoji } from 'markdown-it-emoji'
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { dateFormat } from './src/_scripts/dateFormat.js';
import { filterTagList } from './src/_scripts/filterTagList.js';
import { wordCount } from './src/_scripts/wordCount.js';

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
            placement: "before"
        }),
        slugify: (s) => s.trim().toLowerCase().replace(/\s+/g, "-")
    };
	// Configure markdown library with plugins
    const markdownLibrary = markdownit(mdOptions)
        .use(markdownItAnchor, anchorOptions)
        .use(emoji);
    // RSS feed
    eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "post", // iterate over `collections.post`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "kits-dna",
			subtitle: "Product",
			base: "https://kitfrance.com/",
			author: {
				name: "Kit France",
				email: "kit@kitfrance.com", // Optional
			}
		}
    });
    // Configure eleventy
	eleventyConfig.setLibrary("md", markdownLibrary);
    eleventyConfig.addWatchTarget("./src/_sass/");
    eleventyConfig.addPassthroughCopy("./css/");
    eleventyConfig.addPassthroughCopy("./src/assets/");
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addFilter("dateFormat", dateFormat);
    eleventyConfig.addFilter("filterTagList", filterTagList);
    eleventyConfig.addFilter("wordCount", wordCount);
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
