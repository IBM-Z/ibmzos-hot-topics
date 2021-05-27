require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://hottopics.gtsb.io/",
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
    {
      resolve: `gatsby-plugin-feed`,
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
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { fields: [frontmatter___date], order: DESC }
                  filter: { slug: { regex: "/(20)/" } }
                ) {
                  edges {
                    node {
                      frontmatter {
                        description
                        date
                        author
                        title
                      }
                      slug
                      html
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Hot Topics RSS Feed",
          },
        ],
      },
    },
  ],
};
