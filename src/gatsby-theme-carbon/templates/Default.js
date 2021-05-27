import React from "react";
import slugify from "slugify";
import { useStaticQuery, graphql } from "gatsby";

import Utils from "gatsby-theme-carbon/src/components/Utils";
import Layout from "./../components/Layout";
import Aside from "gatsby-theme-carbon/src/components/Aside";
import PageHeader from "../components/PageHeader";
import { Row, Column } from "gatsby-theme-carbon/src/components/Grid";
import NextPrevious from "../components/NextPrevious";
import PageTabs from "gatsby-theme-carbon/src/components/PageTabs";
import Main from "gatsby-theme-carbon/src/components/Main";
import Byline from "../components/Byline";
import MiniCard from "../components/MiniCard";

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

  const images = require.context('../../images', true);
  let imgtitle = title.replace(/\s+/g, '-').replace(/\/|\?|'|\(|\)/g, '').toLowerCase();
  let imgsrc = images(`./`+ imgtitle +`.jpg`);

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
            <Column colMd={8} colLg={8}>
              <Byline author={author} readTime={readTime} date={date} />
              {children}
            </Column>
            <Column colMd={2} colLg={3} offsetMd={1} offsetLg={1}>
              <Aside aria-label="subscribe">
                <img src="/images/hottopics.svg" alt="Hot Topics logo" />
                <p>
                  <strong>Follow Hot Topics</strong>
                  <br />
                  Be the first to hear about new articles and updates.
                </p>
                <p>
                  <a>Subscribe</a>
                </p>
              </Aside>
              <MiniCard
                  title="Download this article"
                  actionIcon="pdf"
                  href="javascript:window.print()"
                  className="download-article"
                >
                </MiniCard>
            </Column>
          </Row>

        </Main>
      </div>
        <NextPrevious
          pageContext={pageContext}
          location={location}
          slug={slug}
        />
      <Utils />
    </Layout>
  );
};

export default Default;
