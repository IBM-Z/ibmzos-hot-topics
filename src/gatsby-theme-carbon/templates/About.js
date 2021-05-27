import React from 'react';
import slugify from 'slugify';
import { useStaticQuery, graphql } from "gatsby";

import Utils from "gatsby-theme-carbon/src/components/Utils";
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import NextPrevious from '../components/NextPrevious';
import PageTabs from 'gatsby-theme-carbon/src/components/PageTabs';
import Main from 'gatsby-theme-carbon/src/components/Main';

const About = ({
  pageContext,
  children,
  location,
  Title,
}) => {
  const {
    site: { pathPrefix },
  } = useStaticQuery(graphql`
    query PATH_PREFIX_QUERY3 {
      site {
        pathPrefix
      }
    }
  `);

  if (!pageContext) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  const { frontmatter = {}, relativePagePath, titleType } = pageContext;
  const {
    tabs,
    title,
    theme,
    description,
    keywords,
    nav,
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
  let imgsrc = images(`./about.jpg`);

  return (
    <Layout
      tabs={tabs}
      homepage={false}
      theme={theme}
      pageTitle={title}
      pageDescription={description}
      pageKeywords={keywords}
      titleType={titleType}>
      <PageHeader
        title={Title ? <Title /> : title}
        label="label"
        tabs={tabs}
        theme={theme}
        bgImg={imgsrc}
      />
      {tabs && (
        <PageTabs
          title={title}
          slug={slug}
          tabs={tabs}
          currentTab={currentTab}
        />
      )}
      <Main padded>
        {children}
      </Main>
      <NextPrevious
        pageContext={pageContext}
        location={location}
        slug={slug}
        tabs={tabs}
        currentTab={currentTab}
      />
            <Utils />
    </Layout>
  );
};

export default About;