require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://ibm-z-hot-topics.com/",
    title: "IBM Z Hot Topics",
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
        name: "IBM Z Hot Topics",
        icon: "src/images/favicon.svg",
        short_name: "IBM Z Hot Topics",
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
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            site_url: siteUrl
          }
        }
      }
    `,
    feeds: [
      {
        serialize: ({ query: { site, allMdx } }) => {
          return allMdx.edges.map(edge => {
            return Object.assign({}, edge.node.frontmatter, {
              description: edge.node.frontmatter.description,
              date: edge.node.frontmatter.date,
              url: site.siteMetadata.siteUrl + "" + edge.node.slug,
              guid: site.siteMetadata.siteUrl + "" + edge.node.slug,
            });
          });
        },
        query: `
          {
            allMdx(
              sort: { order: DESC, fields: [frontmatter___date] },
            ) {
              edges {
                node {
                  slug
                  frontmatter {
                    title
                    date
                    description
                    author
                  }
                }
              }
            }
          }
        `,
        output: "/rss.xml",
        title: "Hot Topics RSS Feed",
        // optional configuration to insert feed reference in pages:
        // if `string` is used, it will be used to create RegExp and then test if pathname of
        // current page satisfied this regular expression;
        // if not provided or `undefined`, all pages will have feed reference inserted
      }
    ]
      }
    },
  ],
};
