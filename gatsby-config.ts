import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Eufemia Design System`,
    description: `DNB's design system for Web, iOS, Android, and Design`,
    siteUrl: `https://eufemia.dnb.no`,
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "sy4b7kpu",
        dataset: "production",
        // Set to true to use the real-time preview
        watchMode: process.env.NODE_ENV === "development",
        // Token is only needed for private datasets or drafts
        // token: process.env.SANITY_READ_TOKEN,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs",
        path: `${__dirname}/src/docs/`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Eufemia Design System",
        short_name: "Eufemia",
        start_url: "/",
        background_color: "#007272",
        theme_color: "#007272",
        display: "minimal-ui",
        icon: "src/images/icon.svg",
        // We inject our own light/dark <link rel="icon"> tags in gatsby-ssr.js,
        // so let the manifest plugin skip its single auto-generated favicon link.
        include_favicon: false,
      },
    },
  ],
};

export default config;
