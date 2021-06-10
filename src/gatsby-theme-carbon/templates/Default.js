import React from "react";
import slugify from "slugify";
import { useStaticQuery, graphql } from "gatsby";
import Moment from "moment";
import Utils from "gatsby-theme-carbon/src/components/Utils";
import Layout from "./../components/Layout";
import Aside from "gatsby-theme-carbon/src/components/Aside";
import PageHeader from "../components/PageHeader";
import { Row, Column } from "gatsby-theme-carbon";
import NextPrevious from "../components/NextPrevious";
import PageTabs from "gatsby-theme-carbon/src/components/PageTabs";
import Main from "gatsby-theme-carbon/src/components/Main";
import { MiniCard } from "gatsby-theme-carbon/src/components/MiniCard";
import Byline from "../components/Byline";
import { Rss16, GeneratePdf20 } from "@carbon/icons-react";

const Default = ({
  pageContext,
  children,
  location,
  Title,
  hideBanner,
  preFooter,
}) => {
  const {
    site: { pathPrefix },
  } = useStaticQuery(graphql`
    query PATH_PREFIX_QUERY2 {
      site {
        pathPrefix
      }
    }
  `);

  if (!pageContext) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  const { frontmatter = {}, titleType } = pageContext;
  const {
    tabs,
    title,
    theme,
    description,
    keywords,
    nav,
    author,
    readTime,
    date,
  } = frontmatter;

  if (frontmatter.redirect) {
    setTimeout(() => {
      if (typeof document !== "undefined") {
        document.location.href = frontmatter.redirect;
      }
    }, 1);
    return <React.Fragment></React.Fragment>;
  }

  // let gatsby handle prefixing
  const slug = pathPrefix
    ? location.pathname.replace(pathPrefix, "")
    : location.pathname;

  const getCurrentTab = () => {
    if (!tabs) return "";
    return slug.split("/").slice(-1)[0] || slugify(tabs[0], { lower: true });
  };

  const currentTab = getCurrentTab();

  const images = require.context("../../images", true);
  let imgtitle = title
    .replace(/\s+/g, "-")
    .replace(/\/|\?|'|\(|\)/g, "")
    .toLowerCase();
  let imgsrc = images(`./` + imgtitle + `.jpg`);

  return (
    <Layout
      homepage={false}
      theme={theme}
      pageTitle={title}
      pageDescription={description}
      pageKeywords={keywords}
      titleType={titleType}
      nav={nav}
      preFooter={preFooter}
      topNav={true}
      location={location}
    >
      <div className="printLogo">
        <img src="/images/hottopics.svg" alt="Hot Topics logo" />
      </div>
      {!hideBanner && (
        <PageHeader
          title={Title ? <Title /> : title}
          label="label"
          tabs={tabs}
          description={description}
          bgImg={imgsrc}
        />
      )}
      {tabs && <PageTabs slug={slug} tabs={tabs} currentTab={currentTab} />}
      <div style={{ maxWidth: "99rem" }}>
        <Main padded>
          <Row>
            <Column colMd={8} colLg={8} className="articleContent">
              <div className="printImage">
                <img src={imgsrc} alt={title} />
              </div>
              <Byline
                author={author}
                readTime={readTime}
                date={Moment.utc(date)}
              />
              {children}
            </Column>
            <Column colMd={2} colLg={3} offsetLg={1} className="articleAside">
              <Row>
              <Aside aria-label="subscribe">
                <img src="/images/hottopics.svg" alt="Hot Topics logo" />
                <p>
                  <strong>Follow Hot Topics</strong>
                  <br />
                  Be the first to hear about new articles and updates.
                </p>
                <p>
                  <a href="/about/#how-to-subscribe">
                    Subscribe to our RSS Feed <Rss16 />
                  </a>
                </p>
              </Aside>
              </Row>
              <Row>
              <MiniCard
                title="Download this article"
                href="javascript:window.print()"
                className="download-article"
              >
                <GeneratePdf20 />
              </MiniCard>
              </Row>
            </Column>
          </Row>
        </Main>
      </div>
      <NextPrevious pageContext={pageContext} location={location} slug={slug} />
      <Utils />
    </Layout>
  );
};

export default Default;
