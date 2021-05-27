import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Row, Column, ArticleCard, ImageCard } from "gatsby-theme-carbon";
import './ArticleCardGroup.scss';
const images = require.context('../../../images', true);

export default function ArticleCardGroup({ limit, featured }) {
  const data = useStaticQuery(graphql`
    query ArticlesQuery {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { slug: { regex: "/(20)/" } }
      ) {
        nodes {
          frontmatter {
            author
            date(formatString: "MMMM DD, YYYY")
            description
            readTime
            title
          }
          slug
        }
      }
    }
  `);
return (
  <>
  <Row>
    {data.allMdx.nodes.slice(0, 1).map((node, index) => {
      const article = node.frontmatter;
      //let featuredImgsrc = images(`./getting-better-network-performance-for-your-zcx-containers-featured.jpg`);
      let imgtitle = article.title.replace(/\s+/g, '-').replace(/\//g, '').toLowerCase();
      let featuredImgsrc = images(`./`+ imgtitle +`-featured.jpg`);

      return (
        <Column colMd={12} colLg={12} noGutterMdLeft>
          <ArticleCard
            title={article.title}
            author={article.author}
            date={article.date}
            readTime={article.readTime}
            href={node.slug}
            key={index}
            subTitle={article.description}
            className="featuredArticleCard"
          >
           <ImageCard href={node.slug}>
           <img key={index} src={featuredImgsrc} alt={article.title}
            /></ImageCard>
          </ArticleCard>
        </Column>
      );
      })}
  </Row>
  <Row>
  {data.allMdx.nodes.slice(1, 10).map((node, index) => {
    const article = node.frontmatter;
    //let imgsrc = images(`./gallery.jpg`);
    const defaultImg = images(`./gallery.jpg`);
       let imgtitle = article.title.replace(/\s+/g, '-').replace(/\/|\?|'|\(|\)/g, '').toLowerCase();
       let imgsrc = images(`./`+ imgtitle +`.jpg`);
    return (
      <Column colMd={4} colLg={4} noGutterMdLeft>
        <ArticleCard
          title={article.title}
          author={article.author}
          date={article.date}
          readTime={article.readTime}
          href={node.slug}
          key={index}
        >
          <img
            src={imgsrc}
            alt={article.title}
            onError={(e)=>{e.target.onerror = null; e.target.src=defaultImg}}
          />
        </ArticleCard>
      </Column>
    );
  })}
</Row>
</>
);
}
