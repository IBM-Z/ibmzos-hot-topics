require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "z/OS Hot Topics",
    description:
      "Hot Topics content connects you with System z technical leaders and experts who design, code, test, document, teach, and support z/OS and its products.",
    keywords: "gatsby,theme,carbon",
    author: "default",
    date: "defaultDate",
    readTime: "defaultReadTime",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "z/OS Hot Topics",
        icon: "src/images/favicon.svg",
        short_name: "z/OS Hot Topics",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#0062ff",
        display: "browser",
      },
    },
    {
      resolve: "gatsby-theme-carbon",
      options: {
        theme: {
          homepage: "g10",
          interior: "g10",
        },
      },
    },
  ],
};
